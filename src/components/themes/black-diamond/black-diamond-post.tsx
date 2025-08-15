import React from "react";
import PostFirstPage from "./post-first-page";
import ModificableText from "@/components/modificable-text";
import ModificableMarkdown from "@/components/modificable-markdown";
import ModificableCodeBlock from "@/components/modificable-code-block";
import PostLastPage from "./post-last-page";
import usePost from "@/lib/usePost";
import { anOldHope } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useUser } from "@/lib/useUser";
import Image from "next/image";

type Props = {};

const BlackDiamondPost = (props: Props) => {
  const { contentObject } = usePost();

  const { name, username, profilePic } = useUser();

  return (
    <div>
      <PostFirstPage
        title={contentObject?.title || "Title will be here for this post"}
      />
      {contentObject &&
        contentObject.content.map((content, index: number) => (
          <section
            key={index}
            className="relative text-white shadow-sm p-10 px-12 overflow-hidden printSection"
            style={{
              backgroundImage: "url(/backgrounds/black-diamond.png)",
              backgroundSize: "100%",
            }}
          >
            <h1 className="text-3xl font-bold z-10">
              {index + 1}. {content.name}
            </h1>

            <ModificableMarkdown
              defaultFont={18}
              className="text-lg text-white/50 my-7"
              theme="dark"
            >
              {content.description}
            </ModificableMarkdown>
            {content.code && (
              <ModificableCodeBlock
                style={anOldHope}
                backgroundColor="#101010"
                boxShadow="0 0 30px -7px black"
                defaultFont={16}
                codeLang={content.codeLang}
              >
                {content.code}
              </ModificableCodeBlock>
            )}
            <div className="absolute bottom-2 right-5 flex items-center gap-3 text-white/70">
              {profilePic && (
                <Image
                  src={profilePic as string}
                  className="h-8 w-8 rounded-full object-cover"
                  height={512}
                  width={512}
                  alt=""
                />
              )}
              <div className="text-right mb-[1px]">
                <h3 className="text-sm text-white">@{username}</h3>
                <p className="text-[9px] mt-0.5">for more content like this</p>
              </div>
            </div>
          </section>
        ))}
      <PostLastPage />
    </div>
  );
};

export default BlackDiamondPost;
