"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

export const description = "A bar chart"

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "July", desktop: 315 },
  { month: "August", desktop: 190 },
  { month: "September", desktop: 250 },
  { month: "October", desktop: 120 },
  { month: "November", desktop: 280 },
  { month: "December", desktop: 310 },
]

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export function ChartBarDefault() {
  return (
    <Card className="border-none shadow-none p-0">
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[350px] w-full">
          <BarChart accessibilityLayer data={chartData} barCategoryGap={-5}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              domain={[0, 350]}
              ticks={[0, 50, 100, 150, 200, 250, 300, 350]}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="desktop" fill="#00bba7" radius={8} barSize={28} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}