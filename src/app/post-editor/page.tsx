import OutputPost from "@/components/output-post";
import Sidebar from "@/components/sidebar";
import ThemesSection from "@/components/themes-section";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import React from "react";

type Props = {};

const PostEditor = (props: Props) => {
  return (
    <div className="bg-background print:h-auto h-screen">
      <ResizablePanelGroup direction="horizontal" className="h-screen">
        <ResizablePanel
          className="hideOnPrint"
          defaultSize={25}
          minSize={25}
          maxSize={45}
        >
          <div className="h-screen overflow-y-auto">
            <Sidebar />
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle className="hideOnPrint" />
        <ResizablePanel defaultSize={75}>
          <div className="print:h-auto h-screen print:overflow-visible relative">
            <OutputPost />
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle className="hideOnPrint" />
        <ResizablePanel
          defaultSize={15}
          minSize={10}
          maxSize={20}
          className="hideOnPrint"
        >
          <div className="h-screen overflow-y-auto">
            <ThemesSection />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default PostEditor;
