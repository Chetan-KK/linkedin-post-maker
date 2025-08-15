"use client";

import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useState } from "react";
// Use regular import to avoid dynamic import type issues
// @ts-ignore - Ignore type conflicts with react-syntax-highlighter
import SyntaxHighlighter from "react-syntax-highlighter";
// @ts-ignore - Ignore type conflicts with styles
import {
  anOldHope,
  atomOneLight,
} from "react-syntax-highlighter/dist/esm/styles/hljs";

export default function Home() {
  const [expanded, setExpanded] = useState(false);

  const { resolvedTheme } = useTheme();

  const exampleObject = {
    title: "Building Interactive Forms with Formik in React",
    description:
      "📋 Formik is a powerful library for handling forms in React. It simplifies form validation, submission, and state management, making it easy to build interactive and user-friendly forms.",
    hashtags: [
      "JavaScript",
      "React",
      "Formik",
      "Forms",
      "webdev",
      "frontend",
      "development",
      "developer",
      "web",
      "tech",
      "tips",
      "guide",
      "learn",
      "tutorial",
      "webdevelopment",
    ],
    content: [
      {
        name: "Introduction to Formik",
        description:
          "📋 Formik is a popular library for managing form state in React applications. It helps you handle form validation, submission, and state management efficiently.",
        codeLang: "none",
        code: "",
      },
      {
        name: "Installing Formik",
        description:
          "📥 Start by installing Formik in your React project using npm or yarn.",
        codeLang: "bash",
        code: "npm install formik\n# or\nyarn add formik",
      },
      {
        name: "Creating a Basic Form with Formik",
        description:
          "🛠 Create a basic form using Formik. Define your form structure and handle form state using the `useFormik` hook.",
        codeLang: "javascript",
        code: 'import React from \'react\';\nimport { useFormik } from \'formik\';\n\nconst BasicForm = () => {\n  const formik = useFormik({\n    initialValues: {\n      name: \'\',\n      email: \'\'\n    },\n    onSubmit: values => {\n      alert(JSON.stringify(values, null, 2));\n    }\n  });\n  return (\n    <form onSubmit={formik.handleSubmit}>\n      <label htmlFor="name">Name</label>\n      <input\n        id="name"\n        name="name"\n        type="text"\n        onChange={formik.handleChange}\n        value={formik.values.name}\n      />\n      <label htmlFor="email">Email</label>\n      <input\n        id="email"\n        name="email"\n        type="email"\n        onChange={formik.handleChange}\n        value={formik.values.email}\n      />\n      <button type="submit">Submit</button>\n    </form>\n  );\n};\n\nexport default BasicForm;',
      },
      {
        name: "Adding Validation with Yup",
        description:
          "✅ Integrate Yup for schema-based form validation. Define a validation schema and pass it to Formik to validate form fields.",
        codeLang: "javascript",
        code: "import React from 'react';\nimport { useFormik } from 'formik';\nimport * as Yup from 'yup';\n\nconst validationSchema = Yup.object({\n  name: Yup.string()\n    .min(2, 'Must be at least 2 characters')\n    .required('Required'),\n  email: Yup.string()\n    .email('Invalid email address')\n    .required('Required')\n});\n\nconst ValidationForm = () => {\n  const formik = useFormik({\n    initialValues: {\n      name: '',\n      email: ''\n    },\n    validationSchema,\n    onSubmit: values => {\n      alert(JSON.stringify(values, null, 2));\n    }\n  });\n  return (\n    <form onSubmit={formik.handleSubmit}>\n      <label htmlFor=\"name\">Name</label>\n      <input\n        id=\"name\"\n        name=\"name\"\n        type=\"text\"\n        onChange={formik.handleChange}\n        value={formik.values.name}\n      />\n      {formik.errors.name ? <div>{formik.errors.name}</div> : null}\n      <label htmlFor=\"email\">Email</label>\n      <input\n        id=\"email\"\n        name=\"email\"\n        type=\"email\"\n        onChange={formik.handleChange}\n        value={formik.values.email}\n      />\n      {formik.errors.email ? <div>{formik.errors.email}</div> : null}\n      <button type=\"submit\">Submit</button>\n    </form>\n  );\n};\n\nexport default ValidationForm;",
      },
      {
        name: "Handling Form Submission",
        description:
          "🔄 Handle form submission using Formik's `onSubmit` handler. Process form data and perform necessary actions upon form submission.",
        codeLang: "javascript",
        code: 'import React from \'react\';\nimport { useFormik } from \'formik\';\n\nconst SubmitForm = () => {\n  const formik = useFormik({\n    initialValues: {\n      name: \'\',\n      email: \'\'\n    },\n    onSubmit: values => {\n      console.log(\'Form data\', values);\n      // Perform additional actions such as sending data to an API\n    }\n  });\n  return (\n    <form onSubmit={formik.handleSubmit}>\n      <label htmlFor="name">Name</label>\n      <input\n        id="name"\n        name="name"\n        type="text"\n        onChange={formik.handleChange}\n        value={formik.values.name}\n      />\n      <label htmlFor="email">Email</label>\n      <input\n        id="email"\n        name="email"\n        type="email"\n        onChange={formik.handleChange}\n        value={formik.values.email}\n      />\n      <button type="submit">Submit</button>\n    </form>\n  );\n};\n\nexport default SubmitForm;',
      },
    ],
  };

  return (
    <main className="">
      <Header />

      <div className="flex justify-center items-center mt-10 gap-5">
        <Link href={"/explore"}>
          <Button variant="outline">Explore Posts</Button>
        </Link>
        <Link href={"/post-editor"}>
          <Button>Create New Post</Button>
        </Link>
      </div>
      <div className="max-w-7xl m-auto my-10 space-y-10">
        <div>
          <h1 className="text-xl font-bold mb-3">Getting Started:</h1>
          <ol className="list-disc list-inside">
            <li>Enter your name and LinkedIn username.</li>
            <li>
              Upload your profile picture (small size recommended for faster
              loading).
            </li>
            <li>
              Click &quot;Save&quot; to complete your profile setup. You only
              need to do this once.
            </li>
          </ol>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div className="bg-accent p-4 rounded-md">
            <h1 className="text-xl font-bold mb-3">Manual Post Generation:</h1>
            <ol className="list-disc list-outside ml-5 mb-3">
              <li>Copy the provided JSON format text below.</li>
              <li>
                Use an AI tool to generate a LinkedIn post from this JSON.
              </li>
              <li>
                Once the post is generated, go to &quot;Create New Post&quot;
                and paste the JSON text into the text field.
              </li>
              <li>Click &quot;Create Post&quot; to publish your content.</li>
            </ol>
          </div>

          <div className="bg-accent p-4 rounded-md">
            <h1 className="text-xl font-bold mb-3">
              Automatic AI Post Generation:
            </h1>
            <ol className="list-disc list-outside ml-5 mb-3">
              <li>Click &quot;Create Post&quot;.</li>
              <li>Enter your topic or idea in the input field.</li>
              <li>
                Click &quot;Generate&quot; and let the AI create the post for
                you.
              </li>
              <li>
                Review the generated post and click &quot;Create Post&quot; to
                publish it.
              </li>
            </ol>
          </div>
        </div>

        <div>
          <h1 className="text-xl font-bold mb-3">After Post Creation:</h1>
          <ol className="list-disc list-inside">
            <li>Select a design theme from the options on the right side.</li>
            <li>
              If the text is too long or doesn&apos;t fit properly, you can
              resize the font by hovering over the text.
            </li>
            <li>
              Once you&apos;re happy with the design, click &quot;Download
              Post&quot; to save the post.
            </li>
            <li>Upload the document post to LinkedIn.</li>
            <li>
              Click the &quot;Copy Description&quot; button to copy the text
              description, then paste it into your LinkedIn post and publish.
            </li>
          </ol>
        </div>
      </div>

      <div
        className="relative mt-10 w-[50rem] m-auto rounded-[10px] overflow-hidden"
        style={{
          height: expanded ? "auto" : "24rem",
          overflow: expanded ? "unset" : "hidden",
        }}
      >
        <h1 className="text-2xl font-bold mb-3">Example Object:</h1>
        <div>
          {/* @ts-ignore - Type assertion to bypass React type conflicts */}
          <SyntaxHighlighter
            language={"json"}
            style={resolvedTheme === "dark" ? anOldHope : atomOneLight}
            showLineNumbers
            customStyle={{
              backgroundColor:
                resolvedTheme === "dark"
                  ? "hsl(240 3.7% 15.9%)"
                  : "hsl(240 4.8% 95.9%)",
              borderRadius: "10px",
              paddingTop: "20px",
              fontSize: 12 + "px",
              paddingBottom: "20px",
            }}
            wrapLines={false}
            lineProps={{
              style: { wordBreak: "break-all", whiteSpace: "pre-wrap" },
            }}
            className="p-4"
          >
            {JSON.stringify(exampleObject, null, 2)}
          </SyntaxHighlighter>
          {!expanded && (
            <div className="absolute p-2 h-44 flex justify-center items-end bottom-0 left-0 w-full bg-gradient-to-b from-transparent to-background ">
              <Button
                className="h-7 pr-2 pl-3 text-xs"
                variant={"secondary"}
                onClick={() => {
                  setExpanded(true);
                }}
              >
                Expand <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className="p-10 text-center">
        Made with 💖 by{" "}
        <a
          href="https://github.com/Chetan-KK"
          className="hover:underline underline-offset-4 font-bold"
        >
          C
        </a>
        {" & "}
        <a
          href="https://github.com/DIVYA-PAWAR-03/DIVYA-PAWAR-03"
          className="hover:underline underline-offset-4 font-bold"
        >
          D
        </a>
      </div>
    </main>
  );
}
