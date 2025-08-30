import { startOfMonth, subMonths } from "date-fns";
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

    // last 6 month data
    const sixMonthsAgo = subMonths(startOfMonth(new Date()), 5);

    const monthlyData = await ctx.db.news.groupBy({
      by: ["createdAt"],
      _count: {
        id: true,
      },
      where: {
        createdAt: {
          gte: sixMonthsAgo,
        },
      },
    });

    const lastMonthArticles = await ctx.db.news.count({
      where: {
        createdAt: {
          gte: subMonths(new Date(), 1),
        },
      },
    });


    const previousMonthArticles = await ctx.db.news.count({
      where: {
        createdAt: {
          gte: subMonths(new Date(), 2),
          lt: subMonths(new Date(), 1),
        },
      },
    });

    const articleGrowth =
      previousMonthArticles > 0
        ? ((lastMonthArticles - previousMonthArticles) / previousMonthArticles) *
        100
        : 0;

    const lastMonthUsers = await ctx.db.user.count({
      where: {
        createdAt: {
          gte: subMonths(new Date(), 1),
        },
      },
    });

    const lastMonthCategories = await ctx.db.category.count({
      where: {
        createdAt: {
          gte: subMonths(new Date(), 1),
        },
      },
    });

    return {
      totalArticles,
      totalUsers,
      totalCategories,
      activeUsers,
      monthlyData,
      stats: {
        articleGrowth: articleGrowth.toFixed(1),
        userGrowth: ((lastMonthUsers / totalUsers) * 100).toFixed(1),
        categoryGrowth: ((lastMonthCategories / totalCategories) * 100).toFixed(1),
      },
    };
  }),

  getDashboardRecentNews: protectedProcedure.query(async ({ ctx }) => {
    const recentNews = (await ctx.db.news.findMany({
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        title: true,
        categories: {
          select: {
            category: {
              select: {
                name: true,
              },
            },
          },
        },
        createdAt: true,
        media: {
          select: {
            url: true,
          },
        },
      },
    })).map((news) => ({
      ...news,
      category: news.categories[0]?.category?.name || "Uncategorized",
    }));
    return recentNews;
  }),
});