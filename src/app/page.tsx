import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
// import Login from '@/components/Login';
import Logout from '@/components/Logout';
import Welcome from '@/components/Welcome';
export default async function Home() {
  const session = await getServerSession(authOptions);

  // console.log("session in page", session?.roles?.includes("admin_realm_role"));
  if (session) {
    return (
      <div>
        <div>Your name is {session.user?.name}</div>
        <div>
          <Logout />{' '}
        </div>
      </div>
    );
  }
  return (
     <Welcome/>
  );
}
