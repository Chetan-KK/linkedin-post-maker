import React from "react";
import PostFirstPage from "./post-first-page";
import ModificableText from "@/components/modificable-text";
import ModificableCodeBlock from "@/components/modificable-code-block";
import PostLastPage from "./post-last-page";
import usePost from "@/lib/usePost";
import { atelierForestLight } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useUser } from "@/lib/useUser";
import Image from "next/image";

type Props = {};

const MidnightSkyPost = (props: Props) => {
  const { contentObject } = usePost();
  const { name, username, profilePic } = useUser();

  return (
    <div>
      <PostFirstPage title={contentObject?.title || "Title"} />
      {contentObject &&
        contentObject.content.map((content, index: number) => (
          <section
            key={index}
            className="relative text-white shadow-lg p-10 px-12 overflow-hidden printSection"
            style={{
              backgroundImage: "url(/backgrounds/midnight-sky.png)", 
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundColor: "#0b0c1d", 
            }}
          >
            <h1 className="text-3xl font-semibold z-10 text-[#b39ddb]">
              {index + 1}. {content.name}
            </h1>

            <ModificableText
              defaultFont={18}
              className="text-lg text-white/70 my-6"
            >
              {content.description}
            </ModificableText>

            {content.code && (
              <ModificableCodeBlock
                backgroundColor="#151526"
                boxShadow="0 0 20px -5px #2a2a4a"
                style={atelierForestLight}
                defaultFont={16}
                codeLang={content.codeLang}
              >
                {content.code}
              </ModificableCodeBlock>
            )}

            <div className="absolute bottom-2 left-3 flex items-center gap-3 text-white/60">
              {profilePic && (
                <Image
                  src={profilePic as string}
                  className="h-8 w-8 rounded-full object-cover"
                  height={8}
                  width={8}
                  alt=""
                />
              )}
              <div className="mb-[1px]">
                <h3 className="text-sm text-white font-bold">@{username}</h3>
                <p className="text-[10px]">for more content like this</p>
              </div>
            </div>
          </section>
        ))}
      <PostLastPage />
    </div>
  );
};

export default MidnightSkyPost;
