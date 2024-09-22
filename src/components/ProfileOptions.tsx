'use client';
import { useSession, } from 'next-auth/react';
import { authToggleOptions } from '@/app/constants/constants';
import Logout from '@/components/Logout';
import Login from './Login';

export const ProfileOptions = ({
  
  type
}: {
  name: string;
  type: string;
}) => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div className="block px-3 py-2 text-sm bg-gray-200 animate-pulse"></div>
  }

  if (session && type === authToggleOptions.LOGIN) {
    return null;
  }

  if(!session && type === authToggleOptions.LOGOUT) {
    return null;
  }

  return session ? <Logout /> : <Login />;
};
