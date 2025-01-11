import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import { Session, SessionOptions } from 'next-auth';

import NextAuth from "next-auth";

import {
  NEXT_GOOGLE_CLIENT_ID,
  NEXT_GOOGLE_CLIENT_SECRET,
  API,
  SECRET_KEY,
} from "../../config/config";

export const AuthOptions: any = {
  // pages: {
  // signIn: '/login'
  // },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { email, password, type, token } = credentials as {
          email: string;
          password: string;
          type: string;
          token: string;
        };
        try {
          if (type == "google") {
            const res = await fetch(`${API}/auth/login-google`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: email,
                googleToken: token,
              }),
            });

            const user = await res.json();
            // If no error and we have user data, return it
            if (res.ok && user.token) {
              return user;
            }
            throw new Error(user.message || "Login failed");
          }
          const res = await fetch(`${API}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: email,
              password: password,
            }),
          });

          const user = await res.json();
          // If no error and we have user data, return it
          if (res.ok && user.token) {
            return user;
          }
          throw new Error(user.message || "Login failed");
        } catch (error: any) {
          // console.log(error);
          // console.log(error.message)
          // console.log(error.response);
          throw new Error(error?.message || "Login failed");
        }
      },
    }),
    GoogleProvider({
      clientId: NEXT_GOOGLE_CLIENT_ID,
      clientSecret: NEXT_GOOGLE_CLIENT_SECRET,
      // authorization: {
      //   params: {
      //     redirect_uri: "https://universe.jamverse.in/api/auth/callback/google",
      //   },
      // }
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 3 * 24 * 60 * 60 // 3 days
  },
  callbacks: {
    async jwt({ token, user, ...rest }: { token: any, user: any, rest: any }) {
      if (user) {
        token = { ...token, ...user, ...rest };
      }
      return token;
    },
    async session({ session, token, ...rest }: { session: Session, token: any, rest: any }) {
      session.user = token;
      session = { ...session, ...rest };
      return session;
    }
  },
  secret: SECRET_KEY,
};
export default NextAuth(AuthOptions);
