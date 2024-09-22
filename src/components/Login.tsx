'use client';
import { cn } from '@/app/utils/utils';
import { signIn, useSession } from 'next-auth/react';
import { Loader } from '@/components/ui/Loader';

export default function Login({ className }: { className?: string }) {
  const { status } = useSession();

  return (
    <button
      className={cn(
        'block px-4 w-full py-2 text-sm text-gray-700 group-hover:text-gray-100',
        status === 'loading' && 'cursor-not-allowed ',
        className
      )}
      onClick={() => signIn('keycloak')}
      disabled={status === 'loading'}
    >
      {status === 'loading' ? <Loader /> : 'Iniciar'}
    </button>
  );
}
