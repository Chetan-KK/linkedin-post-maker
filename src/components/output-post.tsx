"use client";

import { Button } from "./ui/button";
import { FileDownIcon } from "lucide-react";
import { useSelectedTheme } from "@/lib/useSelectedTheme";
import AllPostThemes from "@/lib/all-post-themes";
import { useEffect, useState } from "react";
import usePost from "@/lib/usePost";
import CentralInput from "./central-input";
import LinkedInPostDialog from "./linkedin-post-dialog";

type Props = {};

const OutputPost = (props: Props) => {
  const { selectedTheme, setSelectedTheme } = useSelectedTheme();
  const { contentObject } = usePost();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  // Check if there's content to show
  const hasContent = contentObject && contentObject.title && contentObject.title.trim() !== "";

  return (
    <main className="print:py-0 flex flex-col h-full relative overflow-hidden">
      {/* Fixed input at top of center panel only */}
      <div className="hideOnPrint sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b shadow-sm">
        <CentralInput />
      </div>

      {/* Post content area with proper overflow */}
      <div className="flex-1 py-10 overflow-y-auto">
        {hasContent && (
          <>
            <div className="hideOnPrint flex gap-2 fixed bottom-7 right-7 z-10">
              <Button
                onClick={() => {
                  window.print();
                }}
              >
                <FileDownIcon className="w-5 h-5 mr-1" /> Download as PDF
              </Button>

              <LinkedInPostDialog />
            </div>
            <div className="flex justify-center">
              {AllPostThemes.map((theme, _) => (
                <div key={_}>{selectedTheme === theme.name && <theme.component />}</div>
              ))}
            </div>
          </>
        )}

        {/* Show placeholder when no content */}
        {!hasContent && (
          <div className="flex-1 flex items-center justify-center h-full">
            <div className="text-center text-muted-foreground">
              <h3 className="text-xl font-semibold mb-2">Ready to create?</h3>
              <p>Enter a topic above to generate your LinkedIn post</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default OutputPost;
