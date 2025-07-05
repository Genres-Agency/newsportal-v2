import { createTRPCRouter, protectedProcedure } from "../trpc";

export const dashboardRouter = createTRPCRouter({
  getDashboardData: protectedProcedure.query(async ({ ctx }) => {
    const totalArticles = await ctx.db.news.count();
    const totalUsers = await ctx.db.user.count();
    const totalCategories = await ctx.db.category.count();
    const activeUsers = await ctx.db.user.count({
      where: {
        createdAt: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
        },
      },
    });
    return { totalArticles, totalUsers, totalCategories, activeUsers };
  }),
});