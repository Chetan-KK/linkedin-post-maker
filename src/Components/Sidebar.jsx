import React, { useState } from "react";
import useStore from "../lib/useStore";

const Sidebar = () => {
  const { contentObject, setContentObject } = useStore();

  const [jsonInput, setJsonInput] = useState("");

  const handleInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleCreatePost = () => {
    try {
      const parsedInput = JSON.parse(jsonInput);
      setContentObject(parsedInput);
      document.title = parsedInput.title;
    } catch (e) {
      alert("Invalid JSON format");
    }
  };

  const [copySuccess, setCopySuccess] = useState(false);

  const copyToClipboard = () => {
    const contentEditableDiv = document.getElementById("editableDiv");

    if (contentEditableDiv) {
      const range = document.createRange();
      range.selectNodeContents(contentEditableDiv);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);

      try {
        document.execCommand("copy");
        setCopySuccess(true);
      } catch (err) {
        console.error("Copy failed: ", err);
        setCopySuccess(false);
      }

      // Clear the selection
      selection.removeAllRanges();
    }
  };

  return (
    <aside className="hideOnPrint lg:border-r lg:h-screen lg:max-w-[30rem] min-w-72 overflow-y-scroll top-0 lg:sticky bg-black text-white border-gray-800 p-5">
      <h1 className="text-2xl mb-3 font-bold">Create post</h1>
      <textarea
        className="w-full p-2 resize-none text-white bg-black border border-gray-700"
        rows="10"
        value={jsonInput}
        onChange={handleInputChange}
      />
      <div className="flex justify-end items-center mt-3 gap-1">
        <button className="bg-blue-700 p-2" onClick={handleCreatePost}>
          Create Post
        </button>
      </div>
      {contentObject && (
        <pre
          id="editableDiv"
          className="text-wrap mt-3 border border-gray-800 p-2"
        >
          {contentObject.description}
          <br />
          <br />
          follow @Chetan Khulage for more content like this!!
          <br />
          <br />
          {contentObject.hashtags.map(
            (hashtag, index) =>
              `#${hashtag} ${
                index !== contentObject.hashtags.length - 1 ? " " : ""
              }`
          )}
        </pre>
      )}
      <button
        className="bg-blue-700 p-2 mt-3 float-right"
        onClick={copyToClipboard}
      >
        {copySuccess ? "Copied!" : "Copy text"}
      </button>
    </aside>
  );
};

export default Sidebar;
