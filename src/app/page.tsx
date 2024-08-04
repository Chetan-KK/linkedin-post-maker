"use client";

import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { anOldHope } from "react-syntax-highlighter/dist/esm/styles/hljs";

export default function Home() {
  const [expanded, setExpanded] = useState(false);

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
      <div
        className="relative mt-10 w-[50rem] m-auto rounded-[10px] overflow-hidden"
        style={{
          height: expanded ? "auto" : "24rem",
          overflow: expanded ? "unset" : "hidden",
        }}
      >
        <h1 className="text-2xl font-bold mb-3">Example Object:</h1>
        <div>
          <SyntaxHighlighter
            language={"json"}
            style={anOldHope}
            showLineNumbers
            customStyle={{
              backgroundColor: "#101010",
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
    </main>
  );
}
