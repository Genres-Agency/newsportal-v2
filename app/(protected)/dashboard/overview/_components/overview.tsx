"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Line,
  LineChart,
  CartesianGrid,
  Tooltip,
  Area,
  AreaChart,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const data = [
  {
    name: "Jan",
    total: Math.floor(Math.random() * 5000) + 1000,
    visitors: Math.floor(Math.random() * 2000) + 500,
    articles: Math.floor(Math.random() * 100) + 20,
  },
  {
    name: "Feb",
    total: Math.floor(Math.random() * 5000) + 1000,
    visitors: Math.floor(Math.random() * 2000) + 500,
    articles: Math.floor(Math.random() * 100) + 20,
  },
  {
    name: "Mar",
    total: Math.floor(Math.random() * 5000) + 1000,
    visitors: Math.floor(Math.random() * 2000) + 500,
    articles: Math.floor(Math.random() * 100) + 20,
  },
  {
    name: "Apr",
    total: Math.floor(Math.random() * 5000) + 1000,
    visitors: Math.floor(Math.random() * 2000) + 500,
    articles: Math.floor(Math.random() * 100) + 20,
  },
  {
    name: "May",
    total: Math.floor(Math.random() * 5000) + 1000,
    visitors: Math.floor(Math.random() * 2000) + 500,
    articles: Math.floor(Math.random() * 100) + 20,
  },
  {
    name: "Jun",
    total: Math.floor(Math.random() * 5000) + 1000,
    visitors: Math.floor(Math.random() * 2000) + 500,
    articles: Math.floor(Math.random() * 100) + 20,
  },
  {
    name: "Jul",
    total: Math.floor(Math.random() * 5000) + 1000,
    visitors: Math.floor(Math.random() * 2000) + 500,
    articles: Math.floor(Math.random() * 100) + 20,
  },
];

export function Overview() {
  return (
    <Tabs defaultValue="bar" className="space-y-4">
      <TabsList>
        <TabsTrigger value="bar">Bar Chart</TabsTrigger>
        <TabsTrigger value="line">Line Chart</TabsTrigger>
        <TabsTrigger value="area">Area Chart</TabsTrigger>
      </TabsList>
      <TabsContent value="bar" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={data}>
                <XAxis
                  dataKey="name"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                />
                <Bar
                  dataKey="total"
                  fill="hsl(var(--chart-1))"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="visitors"
                  fill="hsl(var(--chart-2))"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="line" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Visitor Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="name"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="visitors"
                  stroke="hsl(var(--chart-3))"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="articles"
                  stroke="hsl(var(--chart-4))"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="area" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Growth Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="name"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="total"
                  stackId="1"
                  stroke="hsl(var(--chart-1))"
                  fill="hsl(var(--chart-1))"
                  fillOpacity={0.2}
                />
                <Area
                  type="monotone"
                  dataKey="visitors"
                  stackId="1"
                  stroke="hsl(var(--chart-2))"
                  fill="hsl(var(--chart-2))"
                  fillOpacity={0.2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
