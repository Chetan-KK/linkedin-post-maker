"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Sparkles } from "lucide-react";
import usePost from "@/lib/usePost";
import useJsonData from "@/lib/useJsonData";

type Props = {};

const CentralInput = (props: Props) => {
  const { setContentObject } = usePost();
  const { jsonData, setJsonData, isGenerating, setIsGenerating } = useJsonData();
  const [topic, setTopic] = useState<string>("");

  function handleTopicInput(e: any) {
    setTopic(e.target.value);
  }

  const fetchStory = async () => {
    try {
      setIsGenerating(true);
      setJsonData(""); // Clear previous data

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
      let fullContent = "";

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          fullContent += chunk;
          setJsonData(fullContent); // Update shared state with streaming data
        }
      }

      setIsGenerating(false);

      // Auto-create post after generation completes
      try {
        const parsedInput = JSON.parse(fullContent);
        setContentObject(parsedInput);
        document.title = parsedInput.title;
        setTopic(""); // Clear input after successful generation
      } catch (e) {
        console.error("Generated content is not valid JSON:", e);
        alert("Generated content needs manual review. Please check the JSON format.");
      }
    } catch (error) {
      console.error("Error fetching the story:", error);
      setIsGenerating(false);
      alert("Failed to generate content. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-4 bg-background">
      <div className="flex gap-3 items-center">
        <div className="flex-1">
          <Input
            disabled={isGenerating}
            type="text"
            value={topic}
            placeholder="Enter your topic or idea..."
            onChange={handleTopicInput}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !isGenerating && topic.length > 0) {
                fetchStory();
              }
            }}
            className="text-base py-3 px-4 border-2 focus:border-primary transition-colors"
          />
        </div>
        <Button
          onClick={fetchStory}
          disabled={isGenerating || topic.length === 0}
          size="lg"
          className="px-6 shadow-sm"
        >
          <Sparkles strokeWidth={1} className="mr-2" height={18} width={18} />
          {isGenerating ? "Generating..." : "Generate Post"}
        </Button>
      </div>
      {isGenerating && (
        <div className="mt-3 text-center text-sm text-muted-foreground animate-pulse">
          <div className="inline-flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
            <span>AI is creating your LinkedIn post...</span>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CentralInput;