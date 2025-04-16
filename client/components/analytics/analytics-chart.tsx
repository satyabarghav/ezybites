"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface AnalyticsChartProps {
  data: any[]
  title: string
  description?: string
  dataKey: string
  xAxisKey?: string
  yAxisLabel?: string
  height?: number
}

export function AnalyticsChart({
  data,
  title,
  description,
  dataKey,
  xAxisKey = "name",
  yAxisLabel,
  height = 350,
}: AnalyticsChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-ezy-text">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={height}>
          <LineChart data={data}>
            <XAxis
              dataKey={xAxisKey}
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              padding={{ left: 10, right: 10 }}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}${yAxisLabel || ""}`}
            />
            <Tooltip
              cursor={{ stroke: "#FFA726", strokeWidth: 1 }}
              contentStyle={{
                backgroundColor: "#FFF3E0",
                border: "1px solid #FFA726",
                borderRadius: "4px",
              }}
            />
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke="#FFA726"
              strokeWidth={2}
              dot={{ r: 4, fill: "#FFA726", strokeWidth: 0 }}
              activeDot={{ r: 6, fill: "#FB8C00", strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
