"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useUser } from "@/lib/useUser";
import { useLinkedInAuth } from "@/lib/useLinkedInAuth";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { UserCog } from "lucide-react";
// import { useToast } from "./ui/use-toast";

type Props = {};

const UserSettings = (props: Props) => {
  // const { toast } = useToast();

  // Access LinkedIn session data
  const { user: sessionUser, isAuthenticated } = useLinkedInAuth();

  // Access Zustand store
  const {
    name,
    username,
    profilePic,
    setName,
    setUsername,
    setProfilePic,
    hasHydrated,
  } = useUser();

  // Local state for form inputs
  const [tempName, setTempName] = useState(name);
  const [tempUsername, setTempUsername] = useState(username);
  const [tempProfilePic, setTempProfilePic] = useState(profilePic);

  // Auto-populate from session if user data is empty and session is available
  useEffect(() => {
    if (hasHydrated && isAuthenticated && sessionUser) {
      // Set name from session if it's empty or null
      if (!name || name.trim() === "") {
        setName(sessionUser.name || "");
        setTempName(sessionUser.name || "");
      }

      // Set profile picture from session if it's empty or null
      if (!profilePic || profilePic.trim() === "") {
        setProfilePic(sessionUser.image || "");
        setTempProfilePic(sessionUser.image || "");
      }
    }
  }, [
    hasHydrated,
    isAuthenticated,
    sessionUser,
    name,
    profilePic,
    setName,
    setProfilePic,
  ]);

  useEffect(() => {
    setTempName(name);
    setTempUsername(username);
    setTempProfilePic(profilePic);
  }, [name, username, profilePic]);

  // Handle form submission
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Update Zustand store
    setName(tempName);
    setUsername(tempUsername);
    setProfilePic(tempProfilePic);

    // Save name, username, and profilePic to localStorage
    localStorage.setItem("name", tempName as string);
    localStorage.setItem("username", tempUsername as string);
    if (tempProfilePic) {
      localStorage.setItem("profilePic", tempProfilePic);
    }

    // toast({
    //   title: "Scheduled: Catch up",
    //   description: "Friday, February 10, 2023 at 5:57 PM",
    // });
  };

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempProfilePic(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="">
          <UserCog className="h-5 w-5" /> Update Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[725px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. (data is going to save in local
            storage for quick performance)
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={tempName as string}
                onChange={(e) => setTempName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                LinkedIn Username
              </Label>
              <Input
                id="username"
                value={tempUsername as string}
                onChange={(e) => setTempUsername(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="profilePic" className="text-right">
                Profile Picture
              </Label>
              <Input
                id="profilePic"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="profilePicPreview" className="text-right">
                Preview
              </Label>
              <Avatar className="col-span-3">
                <AvatarImage src={profilePic || ""} alt="Profile Picture" />
                <AvatarFallback>?</AvatarFallback>
              </Avatar>
            </div>

            <DialogDescription>
              Use low size image for lower size posts.
            </DialogDescription>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit">Save changes</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UserSettings;
