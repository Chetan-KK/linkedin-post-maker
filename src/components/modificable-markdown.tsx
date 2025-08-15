"use client";
import React, { useState } from "react";
import { Input } from "./ui/input";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const ModificableMarkdown = ({
  children,
  className,
  defaultFont,
  theme = "light",
}: {
  children: string;
  className: string;
  defaultFont: string | number;
  theme?: "light" | "dark";
}) => {
  const [customFontSize, setCustomFontSize] = useState("inherit");
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

  const isLightTheme = theme === "light";

  return (
    <div className={`relative ${className}`}>
      <div
        style={{
          boxShadow: active ? "0 0 0 2px hsl(var(--border))" : "",
          fontSize:
            customFontSize == "inherit" ? "inherit" : `${customFontSize}px`,
        }}
        onMouseOver={handleActive}
        onMouseLeave={handleNoActive}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            // Customize how different markdown elements are rendered
            p: ({ children }) => <p className="mb-2">{children}</p>,
            strong: ({ children }) => (
              <strong className="font-bold">{children}</strong>
            ),
            em: ({ children }) => <em className="italic">{children}</em>,
            code: ({ children }) => (
              <code
                className={`px-1 py-0.5 rounded text-sm font-mono ${
                  isLightTheme
                    ? "bg-black/10 text-black/90"
                    : "bg-white/20 text-white/90"
                }`}
              >
                {children}
              </code>
            ),
            ul: ({ children }) => (
              <ul className="list-disc ml-4 mb-2">{children}</ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal ml-4 mb-2">{children}</ol>
            ),
            li: ({ children }) => <li className="mb-1">{children}</li>,
            h1: ({ children }) => (
              <h1 className="text-xl font-bold mb-2">{children}</h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-lg font-bold mb-2">{children}</h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-base font-bold mb-1">{children}</h3>
            ),
            blockquote: ({ children }) => (
              <blockquote
                className={`border-l-4 pl-4 italic mb-2 ${
                  isLightTheme
                    ? "border-gray-400 text-black/70"
                    : "border-gray-500 text-white/70"
                }`}
              >
                {children}
              </blockquote>
            ),
            a: ({ children, href }) => (
              <a
                href={href}
                className={`underline ${
                  isLightTheme
                    ? "text-blue-600 hover:text-blue-800"
                    : "text-blue-400 hover:text-blue-300"
                }`}
              >
                {children}
              </a>
            ),
            // Table components
            table: ({ children }) => (
              <div className="overflow-x-auto mb-4">
                <table
                  className={`min-w-full border-collapse ${
                    isLightTheme ? "border-gray-300" : "border-gray-600"
                  }`}
                >
                  {children}
                </table>
              </div>
            ),
            thead: ({ children }) => (
              <thead
                className={`${isLightTheme ? "bg-gray-50" : "bg-gray-800"}`}
              >
                {children}
              </thead>
            ),
            tbody: ({ children }) => <tbody>{children}</tbody>,
            tr: ({ children }) => (
              <tr
                className={`border-b ${
                  isLightTheme
                    ? "border-gray-200 hover:bg-gray-50"
                    : "border-gray-700 hover:bg-gray-800"
                }`}
              >
                {children}
              </tr>
            ),
            th: ({ children }) => (
              <th
                className={`px-4 py-2 text-left font-semibold ${
                  isLightTheme
                    ? "text-gray-900 border-gray-300"
                    : "text-gray-100 border-gray-600"
                } border`}
              >
                {children}
              </th>
            ),
            td: ({ children }) => (
              <td
                className={`px-4 py-2 ${
                  isLightTheme
                    ? "text-gray-700 border-gray-300"
                    : "text-gray-300 border-gray-600"
                } border`}
              >
                {children}
              </td>
            ),
          }}
        >
          {children}
        </ReactMarkdown>
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
            value={customFontSize == "inherit" ? defaultFont : customFontSize}
          />
        </div>
      )}
    </div>
  );
};

export default ModificableMarkdown;
