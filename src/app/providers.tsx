"use client";

import NoProfileError from "@/components/no-profile-error";
import { ThemeProvider } from "@/lib/theme-provider";
import { useUser } from "@/lib/useUser";
import { SessionProvider } from "next-auth/react";
import React, { useEffect, useState } from "react";

type Props = {
  children?: React.ReactNode;
};

const Providers = ({ children }: Props) => {
  const { name, username, profilePic, hasHydrated } = useUser();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Don't render user-dependent content until hydration is complete
  if (!isClient || !hasHydrated) {
    return (
      <SessionProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </SessionProvider>
    );
  }

  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {/* {(!name || !username || !profilePic) && <NoProfileError />} */}
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
};

export default Providers;
