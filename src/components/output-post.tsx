"use client";

import { Button } from "./ui/button";
import { FileDownIcon } from "lucide-react";
import { useSelectedTheme } from "@/lib/useSelectedTheme";
import AllPostThemes from "@/lib/all-post-themes";
import { useEffect, useState } from "react";
import LinkedInPostDialog from "./linkedin-post-dialog";

type Props = {};

const OutputPost = (props: Props) => {
  const { selectedTheme, setSelectedTheme } = useSelectedTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <main className="print:py-0 py-10">
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
      {AllPostThemes.map((theme, _) => (
        <div key={_}>{selectedTheme === theme.name && <theme.component />}</div>
      ))}
    </main>
  );
};

export default OutputPost;
