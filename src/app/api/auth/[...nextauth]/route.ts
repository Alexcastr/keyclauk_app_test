
import NextAuth from "next-auth";
import { AuthOptions } from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";

import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    idToken?: string;
    refreshToken?: string;
    expiresAt?: number;
    error?: string; // Agregar la propiedad 'error'
  }
}
  declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
    idToken?: string;
    refreshToken?: string;
    expiresAt?: number;
    error?: string; // Agregar la propiedad 'error'
  }
}


function requestRefreshOfAccessToken(token: JWT) {
  return fetch(`${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/token`, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.KEYCLOAK_CLIENT_ID as string,
      client_secret: process.env.KEYCLOAK_CLIENT_SECRET as string,
      grant_type: "refresh_token",
      refresh_token: token.refreshToken!,
    }),
    method: "POST",
    cache: "no-store"
  });
}

export const authOptions: AuthOptions = {
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
  },
  session: {
    strategy: "jwt", // Usamos JWT para manejar las sesiones
    // 2 min
    maxAge:   120, // Tiempo de expiración de la sesión
  },
  jwt: {
    maxAge: 120, // Tiempo de expiración del JWT
  },
  providers: [
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_CLIENT_ID as string,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET as string,
      issuer: process.env.KEYCLOAK_ISSUER
    })
  ], 
  callbacks: {
    // Callback para manejar el JWT cuando el usuario inicia sesión
    async jwt({ token, account }) {
      if (account) {
        token.idToken = account.id_token
        token.accessToken = account.access_token
        token.refreshToken = account.refresh_token
        token.expiresAt = account.expires_at
        return token
      }
      // we take a buffer of one minute(60 * 1000 ms)
      if (Date.now() < (token.expiresAt! * 1000 - 60 * 1000)) {
        return token
      } else {
        try {
          const response = await requestRefreshOfAccessToken(token)

          const tokens = await response.json()

          if (!response.ok) throw tokens

          const updatedToken: JWT = {
            ...token, // Keep the previous token properties
            idToken: tokens.id_token,
            accessToken: tokens.access_token,
            expiresAt: Math.floor(Date.now() / 1000 + (tokens.expires_in as number)),
            refreshToken: tokens.refresh_token ?? token.refreshToken,
          }
          return updatedToken
        } catch (error) {
          console.error("Error refreshing access token", error)
          return { ...token, error: "RefreshAccessTokenError" }
        }
      }
    },
    // Callback para manejar la sesión. Aquí incluimos el accessToken
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.idToken = token.idToken;
      session.refreshToken = token.refreshToken;
      session.expiresAt = token.expiresAt;
      return session;
    }
  }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
