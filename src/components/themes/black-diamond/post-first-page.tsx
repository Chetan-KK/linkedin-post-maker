"use client";
import { useUser } from "@/lib/useUser";
import { MessageCircle, Repeat2, Send, ThumbsUp } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const PostFirstPage = ({ title }: { title: string }) => {
  const { name, username, profilePic } = useUser();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      {isMounted && (
        <section
          style={{
            backgroundImage: "url(/backgrounds/black-diamond.png)",
            backgroundSize: "100%",
          }}
          className="relative flex items-center justify-around text-center flex-col text-white bg-background p-10 px-12 overflow-hidden printSection"
        >
          <div className="font-bold text-4xl leading-normal">{title}</div>
          <div className="text-center flex flex-col justify-center items-center gap-2">
            <h6 className="mb-1 text-white/70">Follow</h6>
            {profilePic && (
              <Image
                src={profilePic as string}
                className="h-16 w-16 rounded-full"
                height={16}
                width={16}
                alt=""
              />
            )}
            <h4 className="text-center font-bold text-xl">
              {name ? name : "Name"}
            </h4>
            <h6 className="-mt-1 text-white/70">for more content like this</h6>
          </div>
          <div className="absolute bottom-2 left-3 flex gap-4 text-white/70">
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
      )}
    </>
  );
};

export default PostFirstPage;
