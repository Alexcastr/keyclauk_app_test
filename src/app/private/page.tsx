import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { roles } from "../constants/constants";
import { redirect } from 'next/navigation';

const PrivatePage = async () => {

  const session = await getServerSession(authOptions);

  if(session?.roles?.includes(roles.EMPLOYEE)) {
    // toast.error("You are not authorized to view this page")
    redirect("/");
  }
  return (
    <div>
      <h1> PrivatePage</h1>
      <p> This is a private page only the admin can enter here </p>
    </div>
    
  )
}

export default PrivatePage
