import NextAuth from "next-auth";
import { AuthOptions } from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";
import { encrypt } from "@/app/utils/encryption";
import { JWT } from "next-auth/jwt";
import { jwtDecode } from "jwt-decode";


// Declaración para extender las interfaces de NextAuth
declare module "next-auth" {
  interface Session {
    access_token?: string;
    id_token?: string;
    refresh_token?: string;
    expires_at?: number;
    roles?: string[];
    error?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    access_token?: string;
    id_token?: string;
    refresh_token?: string;
    expires_at?: number;
    decoded?: any; // Si deseas tipar los decodificados, define la estructura del token
    error?: string;
  }
}

// Función para refrescar el token de acceso, con tipado añadido
async function refreshAccessToken(token: JWT): Promise<JWT> {
  const response = await fetch(`${process.env.REFRESH_TOKEN_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      client_id: process.env.KEYCLOAK_CLIENT_ID as string,
      client_secret: process.env.KEYCLOAK_CLIENT_SECRET as string,
      grant_type: 'refresh_token',
      refresh_token: token.refresh_token as string,
    })
  });

  const refreshToken = await response.json();
  if (!response.ok) throw refreshToken;

  return {
    ...token,
    access_token: refreshToken.access_token,
    decoded: jwtDecode(refreshToken.access_token), // Agregamos la decodificación
    id_token: refreshToken.id_token,
    expires_at: Math.floor(Date.now() / 1000) + refreshToken.expires_in,
    refresh_token: refreshToken.refresh_token,
  };
}

// Opciones de autenticación para NextAuth
export const authOptions: AuthOptions = {
  session: {
    maxAge: 60 * 30
  },
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_CLIENT_ID as string,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET as string,
      issuer: process.env.KEYCLOAK_ISSUER
    })
  ], 
  callbacks: {
    async jwt({ token, account }) {
      const nowTimeStamp = Math.floor(Date.now() / 1000);
      
      if (account) {
        // Inicialización del token cuando se crea la sesión por primera vez
        token.decoded = jwtDecode(account.access_token as string);
        token.access_token = account.access_token as string;
        token.id_token = account.id_token as string;
        token.expires_at = account.expires_at;
        token.refresh_token = account.refresh_token as string;
        return token;
      } else if (nowTimeStamp < (token.expires_at ?? 0)) {
        // El token no ha expirado aún
        return token;
      } else {
        // El token ha expirado, intentar refrescarlo
        console.log("Token has expired. Will refresh...");
        try {
          const refreshedToken = await refreshAccessToken(token);
          console.log("Token is refreshed.");
          return refreshedToken;
        } catch (error) {
          console.error("Error refreshing access token", error);
          return { ...token, error: "RefreshAccessTokenError" };
        }
      }
    },

    // Callback para manejar la sesión, incluyendo el accessToken encriptado
    async session({ session, token }) {
      session.access_token = encrypt(token.access_token as string);
      session.id_token = encrypt(token.id_token as string);
      session.roles = token.decoded?.realm_access?.roles;
      session.error = token.error;
    // console.log("session has been created", session);
      return session;
    }
  }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
