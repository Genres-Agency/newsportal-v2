"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/database.connection";
import { RegisterSchema } from "@/schema";
import { getUserByEmail } from "@/lib/actions/user.action";
import { UserRole } from "@prisma/client";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  try {
    const validatedFields = RegisterSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid fields!" };
    }

    const { email, password, name } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return { error: "Email already in use!" };
    }

    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: UserRole.USER,
        image: null,
      },
    });

    if (!user) {
      return { error: "Failed to create user" };
    }

    return { success: "Account created successfully!" };
  } catch (error) {
    console.error("Registration error:", error);
    // More detailed error message for debugging
    return {
      error:
        "Something went wrong during registration! " +
        (error instanceof Error ? error.message : String(error)),
    };
  }
};
