"use client";

import { useState } from "react";
import { PostData } from "@/lib/types";
import { useSession } from "next-auth/react";
import { capturePostImages } from "./capturePostImages";

interface UseLinkedInPostOptions {
  onSuccess?: (postId: string, mediaCount?: number) => void;
  onError?: (error: string) => void;
}

export function useLinkedInPost(options: UseLinkedInPostOptions = {}) {
  const [isPosting, setIsPosting] = useState(false);
  const { data: session } = useSession();

  const postToLinkedIn = async (
    postData: PostData,
    customDescription?: string,
    includeImages = false
  ) => {
    if (!session) {
      throw new Error("Please sign in to LinkedIn first");
    }

    setIsPosting(true);

    try {
      let images: File[] = [];

      if (includeImages) {
        try {
          images = await capturePostImages();
        } catch (imageError) {
          console.error("Failed to capture images:", imageError);
          // Continue without images if capture fails
        }
      }

      // Prepare the request
      let response: Response;

      if (images.length > 0) {
        // Send as FormData with images
        const formData = new FormData();
        formData.append("postData", JSON.stringify(postData));
        if (customDescription) {
          formData.append("description", customDescription);
        }

        images.forEach((image) => {
          formData.append("images", image);
        });

        response = await fetch("/api/linkedin/post", {
          method: "POST",
          body: formData,
        });
      } else {
        // Send as JSON without images
        response = await fetch("/api/linkedin/post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            postData,
            description: customDescription,
          }),
        });
      }

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to post to LinkedIn");
      }

      options.onSuccess?.(result.postId, result.mediaCount);
      return result;
    } catch (error) {
      console.error("LinkedIn post error:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      options.onError?.(errorMessage);
      throw error;
    } finally {
      setIsPosting(false);
    }
  };

  return {
    postToLinkedIn,
    isPosting,
    isAuthenticated: !!session,
  };
}
