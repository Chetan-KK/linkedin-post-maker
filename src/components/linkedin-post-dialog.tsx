"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Share2Icon, ImageIcon, CheckCircle, XCircle } from "lucide-react";
import { useLinkedInPost } from "@/lib/useLinkedInPost";
import usePost from "@/lib/usePost";
import { toast } from "sonner";
import { PostData } from "@/lib/types";

interface LinkedInPostDialogProps {
  disabled?: boolean;
}

export default function LinkedInPostDialog({
  disabled,
}: LinkedInPostDialogProps) {
  const [open, setOpen] = useState(false);
  const [customDescription, setCustomDescription] = useState("");
  const [includeImages, setIncludeImages] = useState(true); // Default to include images
  const { contentObject } = usePost();

  const { postToLinkedIn, isPosting, isAuthenticated, progress, currentStage } =
    useLinkedInPost({
      onSuccess: (postId, mediaCount) => {
        const message =
          mediaCount && mediaCount > 0
            ? `Your post with ${mediaCount} images has been shared to LinkedIn successfully! 🎉`
            : "Your post has been shared to LinkedIn successfully! 🎉";

        toast.success("Post Published!", {
          description: message,
          icon: <CheckCircle className="h-4 w-4" />,
          duration: 5000,
          action: {
            label: "View on LinkedIn",
            onClick: () =>
              window.open(
                `https://www.linkedin.com/feed/update/${postId}`,
                "_blank"
              ),
          },
        });
        setOpen(false);
        setCustomDescription("");
      },
      onError: (error) => {
        // Show detailed error message
        const errorMessage = error.includes("too large")
          ? "Images are too large. Try with fewer images or reduce quality."
          : error.includes("Unauthorized")
          ? "Please reconnect your LinkedIn account and try again."
          : error.includes("Network")
          ? "Network error. Please check your connection and try again."
          : error;

        toast.error("Failed to Post", {
          description: errorMessage,
          icon: <XCircle className="h-4 w-4" />,
          duration: 8000,
          action: {
            label: "Retry",
            onClick: () => {
              // Retry the post
              handlePost();
            },
          },
        });
      },
    });

  const generatePreview = (postData: PostData, customDesc?: string): string => {
    if (customDesc) return customDesc;

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

    return postText.length > 3000
      ? postText.substring(0, 2950) + "..."
      : postText;
  };

  const handlePost = async () => {
    if (!isAuthenticated) {
      toast.error("Authentication Required", {
        description: "Please connect your LinkedIn account first.",
        icon: <XCircle className="h-4 w-4" />,
        duration: 5000,
      });
      return;
    }

    try {
      await postToLinkedIn(
        contentObject,
        customDescription || undefined,
        includeImages
      );
    } catch (error) {
      // Additional error handling for unexpected errors
      console.error("Unexpected error during post:", error);
      toast.error("Unexpected Error", {
        description: "Something went wrong. Please try again.",
        icon: <XCircle className="h-4 w-4" />,
        duration: 5000,
      });
    }
  };

  const previewText = generatePreview(contentObject, customDescription);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button disabled={disabled || !isAuthenticated} variant="outline">
          <Share2Icon className="w-4 h-4 mr-2" />
          Post to LinkedIn
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Share to LinkedIn</DialogTitle>
          <DialogDescription>
            Customize your post description and choose whether to include the
            post images.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="description">Post Description</Label>
            <Textarea
              id="description"
              placeholder="Enter custom description or leave empty to use auto-generated..."
              value={customDescription}
              onChange={(e) => setCustomDescription(e.target.value)}
              className="min-h-[120px]"
            />
            <div className="text-sm text-muted-foreground">
              {customDescription.length > 0
                ? customDescription.length
                : previewText.length}{" "}
              / 3000 characters
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-base font-medium">Post Options</Label>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="includeImages"
                checked={includeImages}
                onChange={(e) => setIncludeImages(e.target.checked)}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label
                htmlFor="includeImages"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center"
              >
                <ImageIcon className="w-4 h-4 mr-1" />
                Include post images (recommended)
              </label>
            </div>
            <p className="text-xs text-muted-foreground">
              {includeImages
                ? "Your square post images will be captured and uploaded with the text."
                : "Only the text description will be posted to LinkedIn."}
            </p>
          </div>

          <div className="space-y-2">
            <Label>Preview</Label>
            <div className="border rounded-md p-3 bg-muted/50 text-sm max-h-[200px] overflow-y-auto whitespace-pre-wrap">
              {previewText}
            </div>
            {includeImages && (
              <p className="text-xs text-muted-foreground">
                📸 Post images will be automatically captured from your current
                design and included.
              </p>
            )}
          </div>
        </div>

        {/* Progress Section */}
        {isPosting && (
          <div className="space-y-3 py-4 border-t">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Upload Progress</span>
              <span className="text-muted-foreground">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
            {currentStage && (
              <p className="text-sm text-muted-foreground">{currentStage}</p>
            )}
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handlePost} disabled={isPosting}>
            {isPosting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                {includeImages ? "Capturing & Posting..." : "Posting..."}
              </>
            ) : (
              <>
                <Share2Icon className="w-4 h-4 mr-2" />
                Post to LinkedIn
                {includeImages && <ImageIcon className="w-4 h-4 ml-1" />}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
