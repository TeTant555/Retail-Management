import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { ListOrdered, CalendarCheck  } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useAppSelector } from "@/store";
import api from "@/api";
import React from "react";

// Chunk
const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const chartConfig = {
  orders: {
    label: "Orders",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const Chart = () => {

  // State and API
  const userId = useAppSelector((state) => state.auth.userId)
  const { data: history = [] } = api.history.getById.useQuery(userId)

  // Determine 6-month window based on current month
  const now = new Date();
  const currentMonth = now.getMonth(); // 0-based
  const startIdx = currentMonth < 6 ? 0 : 6;
  const endIdx = startIdx + 6;
  const visibleMonths = months.slice(startIdx, endIdx);

  // Transform API data: count orders per month (for all months)
  const ordersPerMonth = React.useMemo(() => {
    const counts: Record<string, number> = {};
    months.forEach((m) => (counts[m] = 0));
    history.forEach((item) => {
      const date = new Date(item.saleDate);
      const monthName = months[date.getMonth()];
      counts[monthName] = (counts[monthName] || 0) + 1;
    });
    // Only return data for the visible 6 months
    return visibleMonths.map((month) => ({
      month,
      orders: counts[month],
    }));
  }, [history, visibleMonths]);

  // Orders per day for current month, last 5 days
  const ordersPerDay = React.useMemo(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const lastDay = today.getDate();
    const firstDay = Math.max(1, lastDay - 4); // 5 days window

    // Count orders per day
    const dayCounts: Record<string, number> = {};
    history.forEach((item) => {
      const date = new Date(item.saleDate);
      if (
        date.getFullYear() === year &&
        date.getMonth() === month &&
        date.getDate() >= firstDay &&
        date.getDate() <= lastDay
      ) {
        const dayKey = date.getDate();
        dayCounts[dayKey] = (dayCounts[dayKey] || 0) + 1;
      }
    });

    // Prepare chart data for last 5 days
    const result: { day: string; orders: number }[] = [];
    for (let d = firstDay; d <= lastDay; d++) {
      result.push({
        day: `${d}/${months[month].slice(0, 3)}`,
        orders: dayCounts[d] || 0,
      });
    }
    return result;
  }, [history, now, months]);

  return (
    <div className="flex md:flex-nowrap flex-wrap gap-6 items-stretch">
      <Card className="w-full md:w-1/2 h-full bg-bgu border-0">
        <CardHeader>
          <CardTitle className="montserrat text-lg flex items-center gap-2">
            Total Order
            <ListOrdered className="text-pri w-5 h-5" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <AreaChart
              accessibilityLayer
              data={ordersPerMonth}
              margin={{ left: 12, right: 12, bottom: 15 }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Area
                dataKey="orders"
                type="natural"
                fill="var(--color-orders)"
                fillOpacity={0.4}
                stroke="var(--color-orders)"
                className="!text-txt"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="w-full md:w-1/2 bg-bgu border-0">
        <CardHeader>
          <CardTitle className="montserrat text-lg flex items-center gap-2">
            Order Items Per Day
            <CalendarCheck className="text-pri w-5 h-5" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <AreaChart
              accessibilityLayer
              data={ordersPerDay}
              margin={{ left: 12, right: 12 }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="day"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                interval={0}       
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Area
                dataKey="orders"
                type="natural"
                fill="var(--color-orders)"
                fillOpacity={0.4}
                stroke="var(--color-orders)"
                className="!text-txt"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Chart;
