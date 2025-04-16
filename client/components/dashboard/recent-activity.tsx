import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface Activity {
  id: string
  type: "review" | "session" | "admin" | "restaurant"
  title: string
  description: string
  timestamp: string
  user?: {
    name: string
    avatar?: string
  }
}

interface RecentActivityProps {
  activities: Activity[]
}

export function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle className="text-ezy-text">Recent Activity</CardTitle>
        <CardDescription>Latest actions across the platform</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start">
              {activity.user && (
                <Avatar className="h-9 w-9 border border-ezy-main">
                  <AvatarImage src={activity.user.avatar || "/placeholder.svg"} alt={activity.user.name} />
                  <AvatarFallback className="bg-ezy-main text-white">{activity.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
              )}
              {!activity.user && (
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-ezy-main bg-ezy-background">
                  <span className="text-sm font-medium text-ezy-main">{activity.type.charAt(0).toUpperCase()}</span>
                </div>
              )}
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none text-ezy-text">{activity.title}</p>
                <p className="text-sm text-muted-foreground">{activity.description}</p>
                <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
