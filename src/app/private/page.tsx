import type { Metadata } from 'next';
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { roles } from "../constants/constants";
import { redirect } from 'next/navigation';
import Exclusive from "@/components/Exclusive";

export const metadata: Metadata = {
  title: 'Private page',
  description: 'Only for admins'
};


const PrivatePage = async () => {

  const session = await getServerSession(authOptions);
  
  if (session?.roles?.includes(roles.ADMIN)) {
   return <Exclusive />;
  }
  return redirect('/');


}

export default PrivatePage
