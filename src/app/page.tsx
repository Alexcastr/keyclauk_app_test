import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
// import Login from '@/components/Login';
// import Logout from '@/components/Logout';
import Welcome from '@/components/Welcome';
import SummerStyles from '@/components/SummerStyles';
export default async function Home() {
  const session = await getServerSession(authOptions);



  console.log("session in page", session?.roles);
  if (session) {
    return <SummerStyles />;
  }
  return <Welcome />;
}
