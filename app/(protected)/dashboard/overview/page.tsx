import { Metadata } from "next";
import { Overview } from "./_components/overview";
import { RecentNews } from "./_components/recent-news";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DateRangePicker } from "./_components/date-range-picker";
import { Newspaper, Users2, Eye, ArrowUpRight } from "lucide-react";
import { api } from "@/trpc/server";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app built using the components.",
};

export default async function DashboardPage() {
  const {
    totalArticles,
    totalUsers,
    totalCategories,
    activeUsers,
    monthlyData,
    stats,
  } = await api.dashboard.getDashboardData();

  return (
    <div className="flex-1 space-y-4 p-4 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <DateRangePicker />
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">
              Total Articles
            </CardTitle>
            <Newspaper className="h-4 w-4 text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{totalArticles}</div>
            <p className="text-xs text-blue-100">
              +{stats.articleGrowth}% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-500 to-purple-600">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">
              Total Users
            </CardTitle>
            <Users2 className="h-4 w-4 text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{totalUsers}</div>
            <p className="text-xs text-purple-100">
              +{stats.userGrowth}% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-amber-500 to-amber-600">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">
              Total Categories
            </CardTitle>
            <Eye className="h-4 w-4 text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {totalCategories}
            </div>
            <p className="text-xs text-amber-100">
              +{stats.categoryGrowth}% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-500 to-green-600">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">
              Active Now
            </CardTitle>
            <ArrowUpRight className="h-4 w-4 text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{activeUsers}</div>
            <p className="text-xs text-green-100">Active in last 24h</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview monthlyData={monthlyData} />
          </CardContent>
        </Card>
        <Suspense
          fallback={
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent News</CardTitle>
              </CardHeader>
              <CardContent>Loading...</CardContent>
            </Card>
          }
        >
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Recent News</CardTitle>
            </CardHeader>
            <CardContent>
              <RecentNews />
            </CardContent>
          </Card>
        </Suspense>
      </div>
    </div>
  );
}
