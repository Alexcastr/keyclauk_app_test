"use client"
import { useSession,  signOut } from "next-auth/react";
import { useEffect } from "react";

async function keycloakSessionLogOut() {
    try {
      await fetch(`/api/auth/logout`, { method: "GET" });
    } catch (err) {
      console.error(err);
    }
  }
export default function Logout() {

  const { data: session, status } = useSession(); 

  useEffect(() => {
    
    if (
      status != "loading" &&
      session &&
      session?.error === "RefreshAccessTokenError"
    ) {
      signOut({ callbackUrl: "/" });
    }
  }, [session, status]);
  return <button 
  className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
  onClick={() => {
    keycloakSessionLogOut().then(() => signOut({ callbackUrl: "/" }));
  }}>
    Signout
  </button>
}
