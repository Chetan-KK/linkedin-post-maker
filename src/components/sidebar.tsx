"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Home, Sparkle, Sparkles } from "lucide-react";
import { Textarea } from "./ui/textarea";
import usePost from "@/lib/usePost";
import UserDescription from "./user-description";
import { ModeToggle } from "./ui/mode-toggle";
import UserSettings from "./user-settings";
import { Input } from "./ui/input";

type Props = {};

const Sidebar = (props: Props) => {
  const { contentObject, setContentObject } = usePost();

  const [jsonInput, setJsonInput] = useState<string>("");
  const [topic, setTopic] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const handleInputChange = (e: any) => {
    setJsonInput(e.target.value);
  };

  const handleCreatePost = () => {
    try {
      const parsedInput = JSON.parse(jsonInput);
      setContentObject(parsedInput);
      document.title = parsedInput.title;
    } catch (e) {
      alert("Invalid JSON format");
    }
  };

  function handleTopicInput(e: any) {
    setTopic(e.target.value);
    console.log();
  }

  const fetchStory = async () => {
    try {
      setIsGenerating(true);
      setJsonInput("");

      const response = await fetch("/api/get-post-object", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate content");
      }

      // Handle streaming response
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          setJsonInput((prevStory) => prevStory + chunk);
        }
      }

      setIsGenerating(false);
    } catch (error) {
      console.error("Error fetching the story:", error);
      setIsGenerating(false);
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
      <div className="flex gap-2 mb-3">
        <Input
          disabled={isGenerating}
          type="text"
          value={topic}
          placeholder="Enter you topic..."
          onChange={handleTopicInput}
          onKeyDown={(e) => {
             if (e.key === "Enter" && !isGenerating && topic.length > 0) {
              fetchStory();
  }
}}
        />
        <Button
          onClick={fetchStory}
          disabled={isGenerating || topic.length === 0}
        >
          <Sparkles strokeWidth={1} className="mr-1" height={17} width={17} />
          {isGenerating ? "Generating..." : "Generate"}{" "}
        </Button>
      </div>
      <Textarea
        disabled={isGenerating}
        className="p-2 min-h-32"
        value={jsonInput}
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
