import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { env } from "@/env";
import { ensureUserRecord } from "@/lib/auth/authorization";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: env.AUTH_GOOGLE_ID,
      clientSecret: env.AUTH_GOOGLE_SECRET,
    }),
  ],
  secret: env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false;

      await ensureUserRecord({
        email: user.email,
        name: user.name,
        image: user.image,
      });

      return true;
    },
    async session({ session }) {
      if (session.user?.email) {
        const user = await ensureUserRecord({
          email: session.user.email,
          name: session.user.name,
          image: session.user.image,
        });
        session.user.role = user.role;
      }

      return session;
    },
    async redirect({ baseUrl }) {
      return baseUrl + "/portal";
    },
  },
});

export { handler as GET, handler as POST };