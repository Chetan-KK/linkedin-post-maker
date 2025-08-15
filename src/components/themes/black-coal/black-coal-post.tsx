import React from "react";
import PostFirstPage from "./post-first-page";
import ModificableText from "@/components/modificable-text";
import ModificableMarkdown from "@/components/modificable-markdown";
import ModificableCodeBlock from "@/components/modificable-code-block";
import PostLastPage from "./post-last-page";
import usePost from "@/lib/usePost";
import { atelierForestLight } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { useUser } from "@/lib/useUser";
import Image from "next/image";

type Props = {};

const BlackCoalPost = (props: Props) => {
  const { contentObject } = usePost();

  const { name, username, profilePic } = useUser();

  return (
    <div>
      <PostFirstPage title={contentObject?.title || "Title"} />
      {contentObject &&
        contentObject.content.map((content, index: number) => (
          <section
            key={index}
            className="relative text-white shadow-sm p-10 px-12 overflow-hidden printSection"
            style={{
              backgroundImage: "url(/backgrounds/black-coal.png)",
              backgroundSize: "100%",
            }}
          >
            <h1 className="text-3xl font-bold z-10">
              {index + 1}. {content.name}
            </h1>

            <ModificableMarkdown
              defaultFont={18}
              className="text-lg text-white/60 my-7"
              theme="dark"
            >
              {content.description}
            </ModificableMarkdown>
            {content.code && (
              <ModificableCodeBlock
                backgroundColor="#101010"
                boxShadow="0 0 30px -7px #101010"
                style={atelierForestLight}
                defaultFont={16}
                codeLang={content.codeLang}
              >
                {content.code}
              </ModificableCodeBlock>
            )}
            <div className="absolute bottom-2 left-3 flex items-center gap-3 text-white/50">
              {profilePic && (
                <Image
                  src={profilePic as string}
                  className="h-8 w-8 rounded-full object-cover"
                  height={512}
                  width={512}
                  alt=""
                />
              )}
              <div className="mb-[1px]">
                <h3 className="text-sm text-white font-bold">@{username}</h3>
                <p className="text-[10px] ">for more content like this</p>
              </div>
            </div>
          </section>
        ))}
      <PostLastPage />
    </div>
  );
};

export default BlackCoalPost;
