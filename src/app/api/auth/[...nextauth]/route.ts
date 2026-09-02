import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { env } from "@/env";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: env.AUTH_GOOGLE_ID,
      clientSecret: env.AUTH_GOOGLE_SECRET,
    }),
  ],
  secret: env.NEXTAUTH_SECRET,
  callbacks: {
    async redirect({ baseUrl }) {
      return baseUrl + "/portal";
    },
  },
});

export { handler as GET, handler as POST };