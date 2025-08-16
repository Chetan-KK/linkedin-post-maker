"use client";

import { useState } from "react";
import { PostData } from "@/lib/types";
import { useSession } from "next-auth/react";
import { capturePostImages } from "./capturePostImages";
import { toast } from "sonner";

interface UseLinkedInPostOptions {
  onSuccess?: (postId: string, mediaCount?: number) => void;
  onError?: (error: string) => void;
  onProgress?: (progress: number, stage: string) => void;
}

export function useLinkedInPost(options: UseLinkedInPostOptions = {}) {
  const [isPosting, setIsPosting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState("");
  const { data: session } = useSession();

  const updateProgress = (progress: number, stage: string) => {
    setProgress(progress);
    setCurrentStage(stage);
    options.onProgress?.(progress, stage);
  };

  const postToLinkedIn = async (
    postData: PostData,
    customDescription?: string,
    includeImages = false
  ) => {
    if (!session) {
      throw new Error("Please sign in to LinkedIn first");
    }

    setIsPosting(true);
    updateProgress(5, "Starting...");

    try {
      let images: File[] = [];

      if (includeImages) {
        updateProgress(10, "Capturing post images...");
        toast.loading("Capturing images...", {
          description: "Taking screenshots of your post design",
          id: "capture-images",
        });

        try {
          images = await capturePostImages((captureProgress, stage) => {
            // Map capture progress to our overall progress (10-30%)
            const mappedProgress = 10 + (captureProgress / 100) * 20;
            updateProgress(mappedProgress, stage);
          });
          updateProgress(30, "Images captured successfully");

          toast.success("Images captured!", {
            description: `Successfully captured ${images.length} image(s)`,
            id: "capture-images",
            duration: 2000,
          });

          // Check total size of images
          const totalSize = images.reduce((sum, img) => sum + img.size, 0);
          const maxSize = 4 * 1024 * 1024; // 4MB total limit for all images

          if (totalSize > maxSize) {
            updateProgress(35, "Optimizing image sizes...");
            console.warn(
              `Total image size (${(totalSize / 1024 / 1024).toFixed(
                2
              )}MB) exceeds limit. Reducing image count.`
            );
            // If too large, only send first few images that fit within limit
            let currentSize = 0;
            images = images.filter((img) => {
              if (currentSize + img.size <= maxSize) {
                currentSize += img.size;
                return true;
              }
              return false;
            });
          }
        } catch (imageError) {
          console.error("Failed to capture images:", imageError);
          updateProgress(
            35,
            "Failed to capture images, continuing without them..."
          );
          toast.error("Image capture failed", {
            description: "Continuing with text-only post",
            duration: 3000,
          });
          // Continue without images if capture fails
        }
      } else {
        updateProgress(30, "Preparing text post...");
      }

      updateProgress(40, "Preparing post data...");
      toast.loading("Uploading to LinkedIn...", {
        description: "Publishing your post",
        id: "upload-post",
      });

      // Prepare the request
      let response: Response;

      if (images.length > 0) {
        updateProgress(50, `Uploading ${images.length} images to LinkedIn...`);
        // Send as FormData with images
        const formData = new FormData();
        formData.append("postData", JSON.stringify(postData));
        if (customDescription) {
          formData.append("description", customDescription);
        }

        images.forEach((image) => {
          formData.append("images", image);
        });

        updateProgress(60, "Sending post with images...");
        response = await fetch("/api/linkedin/post", {
          method: "POST",
          body: formData,
        });
      } else {
        updateProgress(50, "Sending text post to LinkedIn...");
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

      updateProgress(80, "Processing LinkedIn response...");
      const result = await response.json();

      if (!response.ok) {
        toast.dismiss("upload-post");
        throw new Error(result.error || "Failed to post to LinkedIn");
      }

      updateProgress(100, "Post published successfully!");
      toast.dismiss("upload-post");
      options.onSuccess?.(result.postId, result.mediaCount);
      return result;
    } catch (error) {
      console.error("LinkedIn post error:", error);
      updateProgress(0, "");

      // Dismiss any loading toasts
      toast.dismiss("capture-images");
      toast.dismiss("upload-post");

      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      options.onError?.(errorMessage);
      throw error;
    } finally {
      setIsPosting(false);
      // Reset progress after a delay
      setTimeout(() => {
        setProgress(0);
        setCurrentStage("");
      }, 2000);
    }
  };

  return {
    postToLinkedIn,
    isPosting,
    isAuthenticated: !!session,
    progress,
    currentStage,
  };
}
