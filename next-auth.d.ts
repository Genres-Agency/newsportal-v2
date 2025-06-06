import { UserRole } from "@prisma/client";
import NextAuth from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole;
  isTwoFacorEnabled: boolean;
  isOAuth: boolean;
};

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: UserRole;
      image?: string;
    };
  }

  interface JWT {
    role?: UserRole;
  }
}
