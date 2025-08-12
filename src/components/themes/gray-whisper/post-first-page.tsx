"use client";
import { useUser } from "@/lib/useUser";
import { MessageCircle, Repeat, Repeat2, Send, ThumbsUp } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const PostFirstPage = ({ title }: { title: string }) => {
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
        backgroundImage: "url(/backgrounds/Gray-Whisper.jpg)",
        backgroundSize: "100%",
      }}
      className="relative flex items-start justify-around flex-col text-black bg-background p-10 px-12 overflow-hidden printSection"
    >
      <div className="font-bold text-4xl leading-normal w-[80%] uppercase">
        {title}
      </div>
      <div className="flex flex-col justify-center gap-2">
        <h6 className="mb-1 text-black/70">Follow</h6>
        {profilePic && (
          <Image
            src={profilePic as string}
            className="h-16 w-16 rounded-full object-cover"
            height={16}
            width={16}
            alt=""
          />
        )}
        <h4 className=" font-bold text-xl">{name ? name : "Name"}</h4>
        <h6 className="-mt-1 text-black/70">for more content like this</h6>
      </div>
      <div className="absolute bottom-2 left-3 font-bold flex gap-4 text-black/60">
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

export default PostFirstPage;
