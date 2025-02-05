// * Comnfiguration for authentication
import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { db } from "./lib/database.connection";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { getUserById, getUserByEmail } from "./lib/actions/user.action";
import { UserRole } from "@prisma/client";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },

  callbacks: {
    // * (70)
    async signIn({ user, account, profile }) {
      if (account?.provider !== "credentials") {
        if (!user.email) return false;

        const existingUser = await getUserByEmail(user.email);

        if (existingUser) {
          // If user exists but signed up with a different provider, allow linking
          return true;
        }

        // Create new user if doesn't exist
        await db.user.create({
          data: {
            email: user.email,
            name: user.name,
            image: user.image,
            role: UserRole.USER,
          },
        });
        return true;
      }

      if (!user.id) return false;
      const existingUser = await getUserById(user.id);
      if (!existingUser) return false;
      return true;
    },

    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture as string;
      }

      return session;
    },

    async jwt({ token, user, account, profile }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;

      token.role = existingUser.role;
      token.name = existingUser.name;
      token.email = existingUser.email;

      // Add picture from Google
      if (account?.provider === "google") {
        token.picture = profile?.picture;
      }

      return token;
    },
  },
  adapter: PrismaAdapter(db), // prisma adapter is supported on non edge
  session: { strategy: "jwt" },
  ...authConfig,
});
