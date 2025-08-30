import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const usersRouter = createTRPCRouter({
  getUsers: protectedProcedure.input(z.object({
    take: z.number().optional(),
    skip: z.number().optional(),
    search: z.string().optional(),
    page: z.number().optional(),
    limit: z.number().optional(),
  })).query(async ({ ctx, input }) => {
    const users = await ctx.db.user.findMany({
      take: input.take,
      skip: input.page,
      where: {
        name: { contains: input.search },
        email: { contains: input.search },
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        image: true,
        createdAt: true,
      }
    });
    return {
      items: users,
      total: users.length,
    };
  }),
});