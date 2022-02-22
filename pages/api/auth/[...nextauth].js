import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../lib/prisma/prismClient";

const DEV_ENVIRONMENT = !process.env.VERCEL_ENV ? true : false;
console.log(GitHub.name);

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      scope: "read:user",
      profile(profile) {
        return {
          id: profile.id.toString(),
          name: profile.name,
          username: profile.login,
          email: profile.email,
          image: profile.avatar_url,
        };
      },
    }),
  ],
  logger: DEV_ENVIRONMENT
    ? {}
    : {
        error(code, ...message) {},
        warn(code, ...message) {},
        debug(code, ...message) {},
      },
  pages: {
    signIn: "/auth/signin",
    error: "/",
  },
  secret: process.env.SECRET,
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      return "/";
    },
    async session(session, token) {
      if (session) {
        delete session.user.id;
      }
      return session;
    },
  },
});
