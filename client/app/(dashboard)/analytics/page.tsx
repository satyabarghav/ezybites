"use client"

import { useState } from "react"

import { MetricsCard } from "@/components/analytics/metrics-card"
import { AnalyticsChart } from "@/components/analytics/analytics-chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("30")

  // Mock data for user engagement over time
  const engagementData = [
    { name: "Jan", value: 400 },
    { name: "Feb", value: 300 },
    { name: "Mar", value: 500 },
    { name: "Apr", value: 280 },
    { name: "May", value: 590 },
    { name: "Jun", value: 430 },
    { name: "Jul", value: 650 },
    { name: "Aug", value: 700 },
    { name: "Sep", value: 550 },
    { name: "Oct", value: 750 },
    { name: "Nov", value: 680 },
    { name: "Dec", value: 820 },
  ]

  // Mock data for restaurant growth
  const restaurantGrowthData = [
    { name: "Week 1", value: 10 },
    { name: "Week 2", value: 12 },
    { name: "Week 3", value: 15 },
    { name: "Week 4", value: 18 },
    { name: "Week 5", value: 20 },
    { name: "Week 6", value: 22 },
    { name: "Week 7", value: 25 },
    { name: "Week 8", value: 28 },
    { name: "Week 9", value: 30 },
    { name: "Week 10", value: 32 },
    { name: "Week 11", value: 35 },
    { name: "Week 12", value: 40 },
  ]

  // Mock data for review sentiment
  const reviewSentimentData = [
    { name: "Jan", positive: 65, neutral: 25, negative: 10 },
    { name: "Feb", positive: 60, neutral: 30, negative: 10 },
    { name: "Mar", positive: 70, neutral: 20, negative: 10 },
    { name: "Apr", positive: 55, neutral: 30, negative: 15 },
    { name: "May", positive: 75, neutral: 15, negative: 10 },
    { name: "Jun", positive: 80, neutral: 15, negative: 5 },
    { name: "Jul", positive: 70, neutral: 20, negative: 10 },
    { name: "Aug", positive: 75, neutral: 15, negative: 10 },
    { name: "Sep", positive: 60, neutral: 30, negative: 10 },
    { name: "Oct", positive: 85, neutral: 10, negative: 5 },
    { name: "Nov", positive: 75, neutral: 15, negative: 10 },
    { name: "Dec", positive: 80, neutral: 15, negative: 5 },
  ]

  // Mock data for top locations
  const topLocationsData = [
    { name: "New York", value: 35 },
    { name: "Los Angeles", value: 28 },
    { name: "Chicago", value: 18 },
    { name: "Houston", value: 12 },
    { name: "Miami", value: 7 },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-ezy-text">Analytics</h1>
          <p className="text-muted-foreground">Platform performance and insights</p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7">Last 7 days</SelectItem>
            <SelectItem value="30">Last 30 days</SelectItem>
            <SelectItem value="90">Last 90 days</SelectItem>
            <SelectItem value="365">Last year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <MetricsCard
          title="Total Users"
          value="12,345"
          change={{ value: 12, isPositive: true }}
          description="Active users on the platform"
        />
        <MetricsCard
          title="Active Restaurants"
          value="256"
          change={{ value: 8, isPositive: true }}
          description="Restaurants with activity in the period"
        />
        <MetricsCard
          title="Average Rating"
          value="4.7"
          change={{ value: 5, isPositive: true }}
          description="Average restaurant rating"
        />
        <MetricsCard
          title="New Reviews"
          value="1,234"
          change={{ value: 3, isPositive: false }}
          description="New reviews in the period"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <AnalyticsChart
          data={engagementData}
          title="User Engagement"
          description="Monthly active users on the platform"
          dataKey="value"
        />
        <AnalyticsChart
          data={restaurantGrowthData}
          title="Restaurant Growth"
          description="New restaurants onboarded over time"
          dataKey="value"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <AnalyticsChart
          data={reviewSentimentData}
          title="Review Sentiment"
          description="Percentage of positive, neutral, and negative reviews"
          dataKey="positive"
          yAxisLabel="%"
        />
        <AnalyticsChart
          data={topLocationsData}
          title="Top Locations"
          description="Restaurants by location"
          dataKey="value"
        />
      </div>
    </div>
  )
}
