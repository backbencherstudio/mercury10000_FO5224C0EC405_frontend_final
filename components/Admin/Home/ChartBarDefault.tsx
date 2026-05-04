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
import FilterIcon from "@/components/icons/admin/FilterIcon"
import { useState } from "react"
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select"
import { useGetLeadsSubmitionQuery } from "@/redux/features/dashboardOverview/dashboardOverView"

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
const [selectedYear, setSelectedYear] = useState("");
 const { data, refetch, isLoading: leadsSubmitionLoading } =
  useGetLeadsSubmitionQuery({
    year: selectedYear,
    month: "",
  });
    console.log(data,'leadsSubmition')
  
  return (
    <Card className="border border-[#E9E9EA] shadow-none py-3 sm:py-6">
      <CardContent>
        <div className="mb-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h3 className="text-base text-[#161721] font-medium">Lead Submission Activity</h3>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full sm:w-auto">
            <button className="flex items-center gap-2 p-2.5 text-sm text-[#344054] font-medium w-full sm:w-auto justify-center hover:bg-gray-100 rounded-lg">
              <FilterIcon />
              <span className="hidden sm:inline">Filter</span>
            </button>
            <div className="w-full sm:w-auto" style={{ minWidth: 120 }}>
            <Select value={selectedYear} onValueChange={setSelectedYear}>
  <SelectTrigger className="w-full sm:w-[127px]" style={{ backgroundColor: '#eceff3' }}>
    <SelectValue placeholder="Select Year" />
  </SelectTrigger>

  <SelectContent>
    <SelectItem value="2026">2026</SelectItem>
    <SelectItem value="2025">2025</SelectItem>
    <SelectItem value="2024">2024</SelectItem>
  </SelectContent>
</Select>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <ChartContainer config={chartConfig} className="h-[300px] sm:h-[408px] w-[600px] sm:w-full -ml-7">
            <BarChart accessibilityLayer data={data?.data as any} barCategoryGap={-5}>
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
              <Bar dataKey="submitted" fill="#00bba7" radius={8} barSize={28} />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
}