"use client";

import { useLinkedInAuth } from "@/lib/useLinkedInAuth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function LinkedInProfile() {
  const { user, isAuthenticated, isLoading, login, logout } = useLinkedInAuth();

  if (isLoading) {
    return (
      <div className="flex items-center space-x-2">
        <div className="animate-pulse">
          <div className="h-8 w-8 bg-muted rounded-full"></div>
        </div>
        <div className="animate-pulse">
          <div className="h-4 w-24 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Button
        onClick={login}
        variant="outline"
        className="bg-[#0a66c2] hover:bg-[#0a66c2]/80 text-white hover:text-white"
      >
        <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
        </svg>
        Connect LinkedIn
      </Button>
    );
  }

  return (
    <div className="flex items-center space-x-3">
      <Avatar className="h-8 w-8">
        <AvatarImage
          src={user?.image || undefined}
          alt={user?.name || "User"}
        />
        <AvatarFallback>
          {user?.name?.charAt(0)?.toUpperCase() || "U"}
        </AvatarFallback>
      </Avatar>

      <div className="flex flex-col">
        <span className="text-sm font-medium text-foreground">
          {user?.name || "LinkedIn User"}
        </span>
        <span className="text-xs text-muted-foreground">Connected</span>
      </div>

      <Button onClick={logout} variant="ghost" size="sm">
        Disconnect
      </Button>
    </div>
  );
}
