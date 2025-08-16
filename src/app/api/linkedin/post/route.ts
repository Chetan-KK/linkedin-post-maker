import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { PostData } from "@/lib/types";
import { authOptions } from "@/lib/auth";

// Force dynamic rendering since we're using session data
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    // Get the session to ensure user is authenticated
    const session = (await getServerSession(authOptions)) as any;

    if (!session || !session.accessToken) {
      return NextResponse.json(
        { error: "Unauthorized - LinkedIn access token required" },
        { status: 401 }
      );
    }

    // Check if this is a FormData request (with images) or JSON (text only)
    const contentType = request.headers.get("content-type");
    let postData: PostData;
    let description: string | undefined;
    let images: File[] = [];

    if (contentType?.includes("multipart/form-data")) {
      // Handle FormData (with images)
      try {
        const formData = await request.formData();
        const postDataString = formData.get("postData") as string;
        postData = JSON.parse(postDataString);
        description = (formData.get("description") as string) || undefined;

        // Get all image files
        const imageFiles = formData.getAll("images") as File[];
        images = imageFiles.filter(
          (file) => file instanceof File && file.size > 0
        );

        const totalSize = images.reduce((sum, img) => sum + img.size, 0);

        // Additional safety check - if total size is too large, reduce images
        const maxTotalSize = 8 * 1024 * 1024; // 8MB limit
        if (totalSize > maxTotalSize) {
          console.warn("Payload too large, reducing images");
          let currentSize = 0;
          images = images.filter((img) => {
            if (currentSize + img.size <= maxTotalSize) {
              currentSize += img.size;
              return true;
            }
            return false;
          });
        }
      } catch (error) {
        console.error("Error parsing FormData:", error);
        return NextResponse.json(
          { error: "Invalid form data or payload too large" },
          { status: 413 }
        );
      }
    } else {
      // Handle JSON (text only)
      const body = await request.json();
      ({ postData, description } = body as {
        postData: PostData;
        description?: string;
      });
    }

    if (!postData) {
      return NextResponse.json(
        { error: "Post data is required" },
        { status: 400 }
      );
    }

    // Get user's LinkedIn ID using the new userinfo endpoint
    const profileResponse = await fetch(
      "https://api.linkedin.com/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!profileResponse.ok) {
      const errorText = await profileResponse.text();
      throw new Error(
        `Failed to get LinkedIn profile: ${profileResponse.status} - ${errorText}`
      );
    }

    const profile = await profileResponse.json();
    const authorUrn = `urn:li:person:${profile.sub}`;

    let mediaUrns: string[] = [];

    // Upload images if provided
    if (images.length > 0) {
      for (let index = 0; index < images.length; index++) {
        const image = images[index];

        // Step 1: Register upload
        const registerUploadResponse = await fetch(
          "https://api.linkedin.com/v2/assets?action=registerUpload",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              registerUploadRequest: {
                recipes: ["urn:li:digitalmediaRecipe:feedshare-image"],
                owner: authorUrn,
                serviceRelationships: [
                  {
                    relationshipType: "OWNER",
                    identifier: "urn:li:userGeneratedContent",
                  },
                ],
              },
            }),
          }
        );

        if (!registerUploadResponse.ok) {
          const errorText = await registerUploadResponse.text();

          throw new Error(
            `Failed to register upload for image ${index + 1}: ${
              registerUploadResponse.status
            }`
          );
        }

        const uploadData = await registerUploadResponse.json();

        // Step 2: Upload the actual image
        const uploadUrl =
          uploadData.value.uploadMechanism[
            "com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest"
          ].uploadUrl;
        const assetUrn = uploadData.value.asset;

        const imageBuffer = await image.arrayBuffer();

        const uploadImageResponse = await fetch(uploadUrl, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
          body: imageBuffer,
        });

        if (!uploadImageResponse.ok) {
          const errorText = await uploadImageResponse.text();
          throw new Error(
            `Failed to upload image ${index + 1}: ${uploadImageResponse.status}`
          );
        }

        mediaUrns.push(assetUrn);
      }
    }

    // Generate post description from the data
    const postDescription = description || generatePostDescription(postData);

    // Create the post content
    const ugcPostData: any = {
      author: authorUrn,
      lifecycleState: "PUBLISHED",
      specificContent: {
        "com.linkedin.ugc.ShareContent": {
          shareCommentary: {
            text: postDescription,
          },
          shareMediaCategory: images.length > 0 ? "IMAGE" : "NONE",
        },
      },
      visibility: {
        "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC",
      },
    };

    // Add media if images were uploaded
    if (mediaUrns.length > 0) {
      ugcPostData.specificContent["com.linkedin.ugc.ShareContent"].media =
        mediaUrns.map((urn) => ({
          status: "READY",
          description: {
            text: "Post image",
          },
          media: urn,
          title: {
            text: "Post image",
          },
        }));
    }

    const postResponse = await fetch("https://api.linkedin.com/v2/ugcPosts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        "Content-Type": "application/json",
        "X-Restli-Protocol-Version": "2.0.0",
      },
      body: JSON.stringify(ugcPostData),
    });

    if (!postResponse.ok) {
      const errorData = await postResponse.text();
      console.error("LinkedIn API Error:", errorData);
      throw new Error(`Failed to post to LinkedIn: ${postResponse.status}`);
    }

    const result = await postResponse.json();

    return NextResponse.json({
      success: true,
      postId: result.id,
      mediaCount: mediaUrns.length,
      message: `Successfully posted to LinkedIn${
        mediaUrns.length > 0 ? ` with ${mediaUrns.length} images` : ""
      }!`,
    });
  } catch (error) {
    console.error("Error posting to LinkedIn:", error);

    // Check if it's a payload size error
    if (
      error instanceof Error &&
      (error.message.includes("too large") ||
        error.message.includes("FUNCTION_PAYLOAD_TOO_LARGE") ||
        error.message.includes("Request Entity Too Large"))
    ) {
      return NextResponse.json(
        {
          error:
            "Images are too large. Please try with fewer images or reduce image quality.",
        },
        { status: 413 }
      );
    }

    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to post to LinkedIn",
      },
      { status: 500 }
    );
  }
}

function generatePostDescription(postData: PostData): string {
  const { title, description, hashtags, content } = postData;

  let postText = `📝 ${title}\n\n`;

  if (description) {
    postText += `${description}\n\n`;
  }

  if (content && content.length > 0) {
    postText += `💡 Key topics covered:\n`;
    content.forEach((item, index) => {
      postText += `${index + 1}. ${item.name}\n`;
    });
    postText += `\n`;
  }

  if (hashtags && hashtags.length > 0) {
    postText += hashtags.map((tag) => `#${tag.replace(/^#/, "")}`).join(" ");
  }

  postText += `\n\n🔗 Created with https://linkedin-post-maker.vercel.app/`;

  // LinkedIn has a 3000 character limit
  return postText.length > 3000
    ? postText.substring(0, 2950) + "..."
    : postText;
}
