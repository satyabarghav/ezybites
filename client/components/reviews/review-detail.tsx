import { Star } from "lucide-react"

import type { Review } from "@/lib/data"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ReviewDetailProps {
  review: Review
}

export function ReviewDetail({ review }: ReviewDetailProps) {
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).format(date)
  }

  // Generate stars
  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <Star
          key={i}
          className={`h-5 w-5 ${i < rating ? "fill-ezy-main text-ezy-main" : "fill-gray-200 text-gray-200"}`}
        />
      ))
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl text-ezy-text">Review for {review.restaurantName}</CardTitle>
            <CardDescription>Submitted on {formatDate(review.createdAt)}</CardDescription>
          </div>
          <div className="flex">{renderStars(review.rating)}</div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4">
          <Avatar className="h-10 w-10 border border-ezy-main">
            <AvatarFallback className="bg-ezy-main text-white">
              {review.customerName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-ezy-text">{review.customerName}</p>
            <p className="text-sm text-muted-foreground">Customer</p>
          </div>
        </div>

        <div className="rounded-lg bg-muted p-4">
          <p className="text-ezy-text">{review.comment}</p>
        </div>
      </CardContent>
    </Card>
  )
}
