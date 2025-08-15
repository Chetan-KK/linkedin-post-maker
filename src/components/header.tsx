import React from "react";
import { ModeToggle } from "./ui/mode-toggle";
import Link from "next/link";
import { Button } from "./ui/button";
import UserSettings from "./user-settings";
import LinkedInProfile from "./linkedin-profile";

const Header = () => {
  return (
    <div className="flex justify-between items-center p-5">
      <div className="flex items-center gap-2">
        <h1 className="font-bold">Linkedin Post Maker</h1> <div></div>
      </div>
      <div className="flex justify-center items-center gap-5">
        <LinkedInProfile />
        {/* <UserSettings /> */}
        <ModeToggle />
      </div>
    </div>
  );
};

export default Header;
