import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';

import Welcome from '@/components/Welcome';
import SummerStyles from '@/components/SummerStyles';
export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) {
    return <SummerStyles />;
  }
  return <Welcome />;
}
