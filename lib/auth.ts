import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

// Array of allowed email addresses
const allowedEmails = [
  "abhins.0554@gmail.com",
  "user2@example.com",
  // Add more allowed email addresses here
]

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      // Check if the user's email is in the allowed list
      return allowedEmails.includes(user.email!)
    },
  },
  pages: {
    signIn: '/login',
    error: '/login', // Error code passed in query string as ?error=
  },
}

