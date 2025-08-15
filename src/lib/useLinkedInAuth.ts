import { useSession, signIn, signOut } from "next-auth/react";
import { useCallback } from "react";

export const useLinkedInAuth = () => {
  const { data: session, status } = useSession();

  const login = useCallback(async () => {
    try {
      await signIn("linkedin", {
        callbackUrl: "/",
        redirect: true,
      });
    } catch (error) {
      console.error("LinkedIn login error:", error);
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await signOut({
        callbackUrl: "/auth/signin",
        redirect: true,
      });
    } catch (error) {
      console.error("LinkedIn logout error:", error);
      throw error;
    }
  }, []);

  const isAuthenticated = status === "authenticated" && !!session;
  const isLoading = status === "loading";
  const user = session?.user || null;
  const accessToken = session?.accessToken || null;

  return {
    user,
    accessToken,
    isAuthenticated,
    isLoading,
    login,
    logout,
  };
};
