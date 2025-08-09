import React from "react";
import PostFirstPage from "./post-first-page";
import ModificableText from "@/components/modificable-text";
import ModificableCodeBlock from "@/components/modificable-code-block";
import PostLastPage from "./post-last-page";
import usePost from "@/lib/usePost";
import { atelierForestLight } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useUser } from "@/lib/useUser";
import Image from "next/image";

const CornerstonePost: React.FC = () => {
  const { contentObject } = usePost();
  const { username, profilePic } = useUser();

  return (
    <div>
      <PostFirstPage title={contentObject?.title || "Title"} />
      {contentObject &&
        contentObject.content.map((content, index: number) => (
          <section
            key={index}
            className="relative text-white shadow-lg p-10 px-12 overflow-hidden printSection"
            style={{
              backgroundImage: "url(/backgrounds/Cornerstone.jpg)", // your cornerstone image path
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundColor: "#1f2024", // dark charcoal tone
            }}
          >
            <h1 className="text-3xl font-semibold z-10 text-gray-200">
              {index + 1}. {content.name}
            </h1>

            <ModificableText
              defaultFont={18}
              className="text-lg text-gray-300 my-6"
            >
              {content.description}
            </ModificableText>

            {content.code && (
              <ModificableCodeBlock
                backgroundColor="#2a2b31"
                boxShadow="0 0 20px -5px #00000066"
                style={atelierForestLight}
                defaultFont={16}
                codeLang={content.codeLang}
              >
                {content.code}
              </ModificableCodeBlock>
            )}

            <div className="absolute bottom-2 left-3 flex items-center gap-3 text-gray-400">
              {profilePic && (
                <Image
                  src={profilePic as string}
                  className="h-8 w-8 rounded-full object-cover"
                  height={32}
                  width={32}
                  alt="profile picture"
                />
              )}
              <div>
                <h3 className="text-sm text-gray-200 font-bold">@{username}</h3>
                <p className="text-[10px]">for more content like this</p>
              </div>
            </div>
          </section>
        ))}
      <PostLastPage />
    </div>
  );
};

export default CornerstonePost;
