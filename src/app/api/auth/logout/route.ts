import { authOptions } from "../[...nextauth]/route";
import { getServerSession } from "next-auth";
import { getIdToken } from "@/app/utils/sessionTokenAccessor";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (session) {
    const idToken = await getIdToken();

    if (!idToken) {
      console.error("Id token not found");
      return new Response("Id token not found", { status: 401 }); // Error si no hay idToken
    }

    // Proveer un valor por defecto si `process.env.NEXTAUTH_URL` o `idToken` son undefined
    const url = `${process.env.END_SESSION_URL}?id_token_hint=${idToken}&post_logout_redirect_uri=${encodeURIComponent(process.env.NEXTAUTH_URL ?? '')}`;
    // console.log("Logging out from Keycloak url:", url);
    try {
      const resp = await fetch(url, { method: "GET" });

      // console.log("Keycloak logout response:", resp);

      if (!resp.ok) {
        console.error("Failed to log out on Keycloak side");
        return new Response("Failed to log out on Keycloak", { status: 500 });
      }

    } catch (err) {
      console.error("Error during Keycloak logout:", err);
      return new Response("Internal server error", { status: 500 });
    }
  } else {
    return new Response("Session not found", { status: 401 }); // No session found
  }

  return new Response(null, { status: 200 });
}
