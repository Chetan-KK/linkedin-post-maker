"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { Input } from "./ui/input";

// Use regular import to avoid dynamic import type issues
// @ts-ignore - Ignore type conflicts with react-syntax-highlighter
import SyntaxHighlighter from "react-syntax-highlighter";

const ModificableCodeBlock = ({
  children,
  style,
  backgroundColor,
  boxShadow,
  codeLang,
  defaultFont,
  showLineNumbers = true,
  customStyle,
  wrapLines = true,
}: {
  children: string;
  style: any;
  backgroundColor: string;
  boxShadow: string;
  codeLang: string;
  defaultFont: string | number;
  showLineNumbers?: boolean;
  customStyle?: Object;
  wrapLines?: boolean;
}) => {
  const [CustomFontSize, setCustomFontSize] = useState("inherit");
  const [active, setActive] = useState(false);

  let timeout: NodeJS.Timeout | null = null;

  const handleActive = () => {
    if (timeout) {
      clearTimeout(timeout);
    }
    setActive(true);
  };

  const handleNoActive = () => {
    timeout = setTimeout(() => {
      setActive(false);
    }, 100);
  };

  useEffect(() => {}, []);

  return (
    <div className="relative">
      <div
        style={{ boxShadow: active ? "0 0 0 2px hsl(var(--border))" : "" }}
        className="rounded-[10px]"
        onMouseOver={handleActive}
        onMouseLeave={handleNoActive}
      >
        {/* @ts-ignore - Type assertion to bypass React type conflicts */}
        <SyntaxHighlighter
          language={codeLang}
          style={style}
          showLineNumbers={showLineNumbers}
          customStyle={{
            backgroundColor: backgroundColor,
            borderRadius: "10px",
            boxShadow: boxShadow,
            paddingTop: "20px",
            fontSize: CustomFontSize + "px",
            paddingBottom: "20px",
            ...customStyle,
          }}
          wrapLines={wrapLines}
          lineProps={{
            style: { wordBreak: "break-all", whiteSpace: "pre-wrap" },
          }}
          className="p-4"
        >
          {children}
        </SyntaxHighlighter>
      </div>
      {active && (
        <div className="absolute top-2 right-2">
          <Input
            type="number"
            className="text-primary"
            placeholder="fontSize"
            onFocus={handleActive}
            onMouseOver={handleActive}
            onMouseLeave={handleNoActive}
            onBlur={handleNoActive}
            onChange={(e) => {
              setCustomFontSize(e.target.value);
            }}
            value={CustomFontSize == "inherit" ? defaultFont : CustomFontSize}
          />{" "}
        </div>
      )}
    </div>
  );
};

export default ModificableCodeBlock;
