import type { LucideIcon } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface StatCardProps {
  title: string
  value: string | number
  description?: string
  icon: LucideIcon
  trend?: {
    value: number
    isPositive: boolean
  }
}

export function StatCard({ title, value, description, icon: Icon, trend }: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-ezy-light-text">{title}</CardTitle>
        <Icon className="h-4 w-4 text-ezy-main" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-ezy-text">{value}</div>
        {description && <p className="text-xs text-muted-foreground">{description}</p>}
        {trend && (
          <div className={`mt-1 flex items-center text-xs ${trend.isPositive ? "text-green-600" : "text-red-600"}`}>
            {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
            <span className="ml-1 text-muted-foreground">from last month</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
