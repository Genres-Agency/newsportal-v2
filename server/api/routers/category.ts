import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

const categoryFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  slug: z.string().min(2, {
    message: "Slug must be at least 2 characters.",
  }),
});

export const categoryRouter = createTRPCRouter({
  createCategory: protectedProcedure
    .input(categoryFormSchema)
    .mutation(async ({ ctx, input }) => {
      const category = await ctx.db.category.create({
        data: {
          name: input.name,
          description: input.description,
          slug: input.slug,
          status: "PUBLISHED",
        },
      });
      return category;
    }),

  getCategories: protectedProcedure
    .input(
      z.object({
        take: z.number().optional(),
        skip: z.number().optional(),
        status: z.enum(["PUBLISHED", "PRIVATE", "SCHEDULED"]).optional(),
        search: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const where = {
        status: input.status,
        ...(input.search
          ? {
              OR: [
                { name: { contains: input.search } },
                { description: { contains: input.search } },
              ],
            }
          : {}),
      };

      const [categories, total] = await Promise.all([
        ctx.db.category.findMany({
          orderBy: {
            createdAt: "desc",
          },
          take: input.take,
          skip: input.skip,
          where,
        }),
        ctx.db.category.count({ where }),
      ]);

      return {
        items: categories,
        total,
      };
    }),
});
