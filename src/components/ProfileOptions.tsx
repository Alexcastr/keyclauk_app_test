'use client';
import { useSession, signOut } from 'next-auth/react';
import { authOptions } from '@/app/constants/constants';
import Logout from '@/components/Logout';
import Login from './Login';

export const ProfileOptions = ({
  name,
  type
}: {
  name: string;
  type: string;
}) => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (session && type === authOptions.LOGIN) {
    return null;
  }

  if(!session && type === authOptions.LOGOUT) {
    return null;
  }

  return session ? <Logout /> : <Login />;
};
