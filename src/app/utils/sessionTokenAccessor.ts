import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { decrypt } from "@/app/utils/encryption";

export async function getAccessToken() {
  const session = await getServerSession(authOptions);
  if (session && session.access_token) {
    const accessTokenDecrypted = decrypt(session.access_token); // Solo se llama si existe
    return accessTokenDecrypted;
  }
  return null;
}

export async function getIdToken() {
  const session = await getServerSession(authOptions);
  if (session && session.id_token) {
    const idTokenDecrypted = decrypt(session.id_token); // Solo se llama si existe
    return idTokenDecrypted;
  }
  return null;
}
