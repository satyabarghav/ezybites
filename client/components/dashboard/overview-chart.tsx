"use client"

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface OverviewChartProps {
  data: {
    name: string
    total: number
  }[]
  title: string
  description?: string
}

export function OverviewChart({ data, title, description }: OverviewChartProps) {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle className="text-ezy-text">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip
              cursor={{ fill: "rgba(255, 167, 38, 0.1)" }}
              contentStyle={{
                backgroundColor: "#FFF3E0",
                border: "1px solid #FFA726",
                borderRadius: "4px",
              }}
            />
            <Bar dataKey="total" fill="#FFA726" radius={[4, 4, 0, 0]} className="fill-ezy-main" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
