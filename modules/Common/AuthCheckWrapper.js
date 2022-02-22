import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import Router from "next/router";

export default function AuthCheckWrapper({ children }) {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status !== "loading" && !session) {
      Router.push("/auth/signin");
    }
  }, [session, status]);

  if (status === "loading") return <></>;
  if (session) return <>{children(session)}</>;
  return null;
}
