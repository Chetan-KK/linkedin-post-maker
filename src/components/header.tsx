import React from "react";
import { ModeToggle } from "./ui/mode-toggle";
import Link from "next/link";
import { Button } from "./ui/button";
import UserSettings from "./user-settings";

const Header = () => {
  return (
    <div className="flex justify-between items-center p-5">
      <div className="flex items-center gap-2">
        <h1 className="font-bold">Linkedin Post Maker</h1>{" "}
        <div>
          <UserSettings />
        </div>
      </div>
      <div className="flex justify-center items-center gap-5">
        <Link href={"/explore"}>
          <Button variant="outline">Explore Posts</Button>
        </Link>
        <Link href={"/post-editor"}>
          <Button>Create New Post</Button>
        </Link>
        <ModeToggle />
      </div>
    </div>
  );
};

export default Header;
