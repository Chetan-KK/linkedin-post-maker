"use client";
import { useUser } from "@/lib/useUser";
import { MessageCircle, Repeat2, Send, ThumbsUp } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const PostLastPage = () => {
  const { name, username, profilePic } = useUser();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <section
      style={{
        backgroundImage: "url(/backgrounds/colourful-bubbles.png)",
        backgroundSize: "100%",
      }}
      className="relative flex items-center text-center flex-col text-black bg-background p-10 px-12 overflow-hidden printSection"
    >
      <div className="text-center flex flex-col justify-center mt-20 items-center gap-2">
        <h6 className="mb-1 text-2xl text-black/80">Follow</h6>
        {profilePic && (
          <Image
            src={profilePic as string}
            className="h-20 w-20 rounded-full object-cover"
            height={20}
            width={20}
            alt=""
          />
        )}
        <h4 className="text-center font-bold text-3xl">
          {name ? name : "Name"}
        </h4>
        <h6 className="-mt-1 text-black/80 text-2xl">
          for more content like this
        </h6>
      </div>
      <div className="absolute bottom-5 left-6 flex flex-col gap-2 text-black/80">
        <div className="flex items-center gap-2">
          <ThumbsUp className="h-4 w-4" /> <span>Like</span>
        </div>
        <div className="flex items-center gap-2">
          <MessageCircle className="h-4 w-4" /> <span>Comment</span>
        </div>
        <div className="flex items-center gap-2">
          <Repeat2 className="h-4 w-4" /> <span>Repost</span>
        </div>
        <div className="flex items-center gap-2">
          <Send className="h-4 w-4" /> <span>Share</span>
        </div>
      </div>
    </section>
  );
};

export default PostLastPage;
