"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Home } from "lucide-react";
import { Textarea } from "./ui/textarea";
import usePost from "@/lib/usePost";
import UserDescription from "./user-description";
import { ModeToggle } from "./ui/mode-toggle";
import UserSettings from "./user-settings";
import useJsonData from "@/lib/useJsonData";

type Props = {};

const Sidebar = (props: Props) => {
  const { contentObject, setContentObject } = usePost();
  const { jsonData, setJsonData, isGenerating } = useJsonData();

  const handleInputChange = (e: any) => {
    setJsonData(e.target.value);
  };

  const handleCreatePost = () => {
    try {
      const parsedInput = JSON.parse(jsonData);
      setContentObject(parsedInput);
      document.title = parsedInput.title;
    } catch (e) {
      alert("Invalid JSON format");
    }
  };



  return (
    <aside className="flex flex-col p-4">
      <div className="mb-3 flex gap-2 items-center justify-between">
        <div className="flex gap-2 items-center">
          <Link href={"/"}>
            <Button variant="secondary" size="icon">
              <Home className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Post Maker</h1>
        </div>
        <div className="flex gap-2">
          <UserSettings />
          <ModeToggle />
        </div>
      </div>

      <Textarea
        disabled={isGenerating}
        className="p-2 min-h-32"
        value={jsonData}
        onChange={handleInputChange}
        placeholder={`Input Json Data`}
      />
      <div className="mt-3 gap-1">
        <Button className="" onClick={handleCreatePost}>
          Create Post
        </Button>
      </div>
      <UserDescription contentObject={contentObject} />
    </aside>
  );
};

export default Sidebar;
