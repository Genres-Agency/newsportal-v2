import type { User, Account } from "next-auth";
import type { JWT } from "next-auth/jwt";
import { db } from "../db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { getUserById, getUserByEmail } from "../../lib/actions/user.action";
import { UserRole } from "@prisma/client";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { Session } from "next-auth";

declare module "next-auth/jwt" {
  interface JWT {
    role: UserRole;
  }
}
export const authConfig = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await db.user.findUnique({
          where: { email: credentials.email as string },
          select: { id: true, email: true, name: true, password: true },
        });

        if (!user?.password) return null;

        const isValid = await compare(
          credentials.password as string,
          user.password
        );
        if (!isValid) return null;

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  trustHost: true,
  callbacks: {
    async signIn({ user, account }: { user: User; account: Account | null }) {
      if (account?.provider !== "credentials") {
        if (!user.email) return false;

        const existingUser = await getUserByEmail(user.email);

        if (existingUser) {
          return true;
        }

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

    async session({ token, session }: { token: JWT; session: Session }) {
      if (token.sub && session.user) {
        await getUserById(token.sub);
        session.user.id = token.sub;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.role = token.role as UserRole;
        session.user.image = token.picture as string | undefined;
      }
      return session;
    },

    async jwt({ token }: { token: JWT }) {
      if (!token.sub) return token;

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

      return {
        ...token,
        id: existingUser.id,
        name: existingUser.name,
        email: existingUser.email,
        role: existingUser.role,
        picture: existingUser.image,
      };
    },

    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt" as const,
  },
};
