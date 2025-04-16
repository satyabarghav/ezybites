import Link from "next/link"
import { MapPin, Phone, Star } from "lucide-react"

import type { Restaurant } from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface RestaurantCardProps {
  restaurant: Restaurant
}

export function RestaurantCard({ restaurant }: RestaurantCardProps) {
  // Format rating
  const formattedRating = restaurant.rating.toFixed(1)

  // Status badge color
  const statusColor = {
    active: "bg-green-100 text-green-800 hover:bg-green-100",
    inactive: "bg-gray-100 text-gray-800 hover:bg-gray-100",
    pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
  }[restaurant.status]

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <CardTitle className="text-xl text-ezy-text">{restaurant.name}</CardTitle>
          <Badge className={statusColor} variant="outline">
            {restaurant.status.charAt(0).toUpperCase() + restaurant.status.slice(1)}
          </Badge>
        </div>
        <CardDescription className="line-clamp-2">{restaurant.description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-2 text-sm">
          <div className="flex items-center text-ezy-light-text">
            <MapPin className="mr-1 h-4 w-4 text-ezy-main" />
            {restaurant.location}
          </div>
          <div className="flex items-center text-ezy-light-text">
            <Phone className="mr-1 h-4 w-4 text-ezy-main" />
            {restaurant.phone}
          </div>
          <div className="flex items-center text-ezy-light-text">
            <Star className="mr-1 h-4 w-4 text-ezy-main" />
            <span>{formattedRating}</span>
            <span className="ml-1 text-muted-foreground">({restaurant.reviewCount} reviews)</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <Button variant="outline" size="sm" asChild>
          <Link href={`/restaurants/${restaurant.id}`}>View Details</Link>
        </Button>
        <Button variant="default" size="sm" className="bg-ezy-main hover:bg-ezy-main-dark">
          <Link href={`/restaurants/${restaurant.id}/edit`}>Edit</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
