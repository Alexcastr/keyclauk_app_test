"use client"
import { useSession,  signOut } from "next-auth/react";
import { useEffect } from "react";
import { cn } from '@/app/utils/utils';
import { toast } from "sonner";


async function keycloakSessionLogOut() {
    try {
      await fetch(`/api/auth/logout`, { method: "GET" });
      toast.success("Sesión cerrada");
    } catch (err) {
      console.error(err);
      toast.error("Error al cerrar sesión");
    }
  }
export default function Logout({className}: {className?: string}) {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (
      status != 'loading' &&
      session &&
      session?.error === 'RefreshAccessTokenError'
    ) {
      signOut({ callbackUrl: '/' });
    }
  }, [session, status]);
  return (
    <button
      className={cn(
        'block px-4 py-2 w-full text-sm text-gray-700 group-hover:text-gray-100',
        className
      )}
      onClick={() => {
        keycloakSessionLogOut().then(() => signOut({ callbackUrl: '/' }));
      }}
      disabled={status === 'loading'}
    >
      Cerrar sesión
    </button>
  );
}
