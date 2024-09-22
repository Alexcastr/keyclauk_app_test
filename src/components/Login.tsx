'use client';
import { signIn } from 'next-auth/react';
// import { useSession } from "next-auth/react";
export default function Login() {
  // const { data: session } = useSession();

  // console.log("session", session);
  return (
    <button
    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
      onClick={() => signIn('keycloak')}
    >
      Iniciar
    </button>
  );
}
