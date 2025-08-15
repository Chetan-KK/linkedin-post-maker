"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { PostData } from "@/lib/types";
import { useUser } from "@/lib/useUser";
import { useLinkedInAuth } from "@/lib/useLinkedInAuth";

type Props = {
  contentObject: PostData;
};

const UserDescription = ({ contentObject }: Props) => {
  const { name, username, profilePic } = useUser();
  const { user: sessionUser, isAuthenticated } = useLinkedInAuth();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Get display username - use stored username, fallback to session name, then fallback text
  const displayUsername =
    username || (isAuthenticated ? sessionUser?.name : "") || "your name";

  const [copySuccess, setCopySuccess] = useState<boolean>(false);

  const copyToClipboard = () => {
    const contentEditableDiv = document.getElementById("editableDiv");

    if (contentEditableDiv) {
      const range = document.createRange();
      range.selectNodeContents(contentEditableDiv);
      const selection = window.getSelection();

      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);

        try {
          document.execCommand("copy");
          setCopySuccess(true);
        } catch (err) {
          console.error("Copy failed: ", err);
          setCopySuccess(false);
        }

        // Clear the selection

        selection.removeAllRanges();
      }
    }
  };

  return (
    <div>
      {isMounted && (
        <div>
          {contentObject ? (
            <pre
              id="editableDiv"
              className="text-wrap mt-3 max-h-52 overflow-y-auto border-border border rounded-lg p-2"
            >
              {contentObject.description}
              <br />
              <br />
              follow @{displayUsername} for more content like this!!
              <br />
              <br />
              {contentObject.hashtags.map(
                (hashtag: string, index: number) =>
                  `#${hashtag} ${
                    index !== contentObject.hashtags.length - 1 ? " " : ""
                  }`
              )}
            </pre>
          ) : (
            <pre
              id="editableDiv"
              className="text-wrap mt-3 border-border border rounded-lg p-2"
            >
              description for this post will be here...!
            </pre>
          )}
          <Button className="mt-3" onClick={copyToClipboard}>
            {copySuccess ? "Copied!" : "Copy description"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserDescription;
