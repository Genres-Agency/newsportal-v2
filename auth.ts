// * Comnfiguration for authentication
import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { db } from "./lib/database.connection";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { getUserById, getUserByEmail } from "./lib/actions/user.action";
import { UserRole, User } from "@prisma/client";
import Google from "next-auth/providers/google";

export const authOptions = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // Add other providers as needed
  ],
  // Add any additional NextAuth options here
};

export default NextAuth(authOptions);

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

        const existingUser: User | null = await getUserByEmail(user.email);

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
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.role = token.role as UserRole;
        session.user.image = token.picture as string | null;
      }

      // Force a session refresh
      session.user = {
        ...session.user,
        name: token.name,
        email: token.email,
      };

      return session;
    },

    async jwt({ token, trigger, session }) {
      if (!token.sub) return token;

      // If update was triggered, update the token with new data
      if (trigger === "update" && session) {
        token.name = session.user.name;
        token.email = session.user.email;
        return token;
      }

      const existingUser = await db.user.findUnique({
        where: { id: token.sub },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          image: true,
        },
      });

      if (!existingUser) return token;

      token.name = existingUser.name;
      token.email = existingUser.email;
      token.role = existingUser.role;
      token.picture = existingUser.image;

      return token;
    },
  },
  adapter: PrismaAdapter(db), // prisma adapter is supported on non edge
  session: { strategy: "jwt" },
  ...authConfig,
});
