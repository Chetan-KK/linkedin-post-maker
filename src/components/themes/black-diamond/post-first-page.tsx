"use client";
import { useUser } from "@/lib/useUser";
import { useLinkedInAuth } from "@/lib/useLinkedInAuth";
import { MessageCircle, Repeat2, Send, ThumbsUp } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const PostFirstPage = ({ title }: { title: string }) => {
  const { name, username, profilePic } = useUser();
  const { user: sessionUser, isAuthenticated } = useLinkedInAuth();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Get display values with session fallback
  const displayName =
    name || (isAuthenticated ? sessionUser?.name : "") || "Name";
  const displayProfilePic =
    profilePic || (isAuthenticated ? sessionUser?.image : "") || "";

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
            {displayProfilePic && (
              <Image
                src={displayProfilePic as string}
                className="h-16 w-16 rounded-full object-cover"
                height={512}
                width={512}
                alt=""
              />
            )}
            <h4 className="text-center font-bold text-xl">{displayName}</h4>
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
