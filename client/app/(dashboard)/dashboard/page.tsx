import { Coffee, DollarSign, Star, Users } from "lucide-react"

import { dashboardSummary, revenueByRestaurant } from "@/lib/data"
import { StatCard } from "@/components/dashboard/stat-card"
import { OverviewChart } from "@/components/dashboard/overview-chart"
import { RecentActivity } from "@/components/dashboard/recent-activity"

export default function DashboardPage() {
  // Format revenue for display
  const formattedRevenue = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(dashboardSummary.totalRevenue)

  // Format average rating
  const formattedRating = dashboardSummary.averageRating.toFixed(1)

  // Prepare data for revenue chart
  const revenueData = revenueByRestaurant
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5)
    .map((item) => ({
      name: item.name.length > 15 ? item.name.substring(0, 15) + "..." : item.name,
      total: Math.round(item.revenue),
    }))

  // Mock recent activities
  const recentActivities = [
    {
      id: "1",
      type: "review",
      title: "New Review",
      description: "Customer left a 5-star review for Restaurant 3",
      timestamp: "2 hours ago",
      user: {
        name: "John Doe",
        avatar: "/placeholder.svg?text=JD",
      },
    },
    {
      id: "2",
      type: "session",
      title: "Session Request",
      description: "New table reservation at Restaurant 5",
      timestamp: "3 hours ago",
    },
    {
      id: "3",
      type: "admin",
      title: "Admin Created",
      description: "New restaurant admin account created",
      timestamp: "5 hours ago",
      user: {
        name: "Admin User",
        avatar: "/placeholder.svg?text=AU",
      },
    },
    {
      id: "4",
      type: "restaurant",
      title: "Restaurant Updated",
      description: "Restaurant 2 updated their profile information",
      timestamp: "1 day ago",
    },
    {
      id: "5",
      type: "review",
      title: "New Review",
      description: "Customer left a 4-star review for Restaurant 7",
      timestamp: "1 day ago",
      user: {
        name: "Jane Smith",
        avatar: "/placeholder.svg?text=JS",
      },
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-ezy-text">Dashboard</h1>
        <p className="text-muted-foreground">Overview of the restaurant platform</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Restaurants"
          value={dashboardSummary.totalRestaurants}
          icon={Coffee}
          description={`${dashboardSummary.activeRestaurants} active`}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Total Admins"
          value={dashboardSummary.totalAdmins + dashboardSummary.totalManagers}
          icon={Users}
          description={`${dashboardSummary.totalAdmins} admins, ${dashboardSummary.totalManagers} managers`}
          trend={{ value: 5, isPositive: true }}
        />
        <StatCard
          title="Total Revenue"
          value={formattedRevenue}
          icon={DollarSign}
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title="Average Rating"
          value={formattedRating}
          icon={Star}
          description={`Across all restaurants`}
          trend={{ value: 2, isPositive: true }}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <OverviewChart
          data={revenueData}
          title="Top Restaurants by Revenue"
          description="Revenue from the top 5 performing restaurants"
        />
        <RecentActivity activities={recentActivities} />
      </div>
    </div>
  )
}
