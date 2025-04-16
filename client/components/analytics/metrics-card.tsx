import { ArrowDown, ArrowUp } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface MetricsCardProps {
  title: string
  value: string | number
  change: {
    value: number
    isPositive: boolean
  }
  description?: string
}

export function MetricsCard({ title, value, change, description }: MetricsCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-ezy-light-text">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-ezy-text">{value}</div>
        <div className="mt-1 flex items-center text-xs">
          <div className={`flex items-center ${change.isPositive ? "text-green-600" : "text-red-600"} font-medium`}>
            {change.isPositive ? <ArrowUp className="mr-1 h-3 w-3" /> : <ArrowDown className="mr-1 h-3 w-3" />}
            {Math.abs(change.value)}%
          </div>
          <span className="ml-1 text-muted-foreground">from previous period</span>
        </div>
        {description && <p className="mt-2 text-xs text-muted-foreground">{description}</p>}
      </CardContent>
    </Card>
  )
}
