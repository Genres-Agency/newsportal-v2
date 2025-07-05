import { db } from "@/server/db";
import { startOfMonth, subMonths } from "date-fns";

export async function fetchDashboardData() {
  // Basic counts
  const totalArticles = await db.news.count();
  const totalUsers = await db.user.count();
  const totalCategories = await db.category.count();

  // Active users (created in last 24 hours)
  const activeUsers = await db.user.count({
    where: {
      createdAt: {
        gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
      },
    },
  });

  // Monthly data for the last 6 months
  const sixMonthsAgo = subMonths(startOfMonth(new Date()), 5);

  const monthlyData = await db.news.groupBy({
    by: ["createdAt"],
    _count: {
      id: true,
    },
    where: {
      createdAt: {
        gte: sixMonthsAgo,
      },
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  // Recent news
  const recentNews = (await db.news.findMany({
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
              name: true
            }
          }
        }
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
    category: news.categories[0]?.category?.name || 'Uncategorized'
  }));


  // Growth calculations
  const lastMonthArticles = await db.news.count({
    where: {
      createdAt: {
        gte: subMonths(new Date(), 1),
      },
    },
  });

  const previousMonthArticles = await db.news.count({
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

  const lastMonthUsers = await db.user.count({
    where: {
      createdAt: {
        gte: subMonths(new Date(), 1),
      },
    },
  });

  const lastMonthCategories = await db.category.count({
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
    recentNews,
    stats: {
      articleGrowth: articleGrowth.toFixed(1),
      userGrowth: ((lastMonthUsers / totalUsers) * 100).toFixed(1),
      categoryGrowth: ((lastMonthCategories / totalCategories) * 100).toFixed(
        1
      ),
    },
  };
}
