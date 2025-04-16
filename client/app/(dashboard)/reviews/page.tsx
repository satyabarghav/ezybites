"use client"

import { useState } from "react"
import { Search } from "lucide-react"

import { reviews } from "@/lib/data"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ReviewTable } from "@/components/reviews/review-table"
import { ReviewDetail } from "@/components/reviews/review-detail"
import { Dialog, DialogContent } from "@/components/ui/dialog"

export default function ReviewsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [ratingFilter, setRatingFilter] = useState("")
  const [selectedReview, setSelectedReview] = useState<(typeof reviews)[0] | null>(null)

  // Filter reviews based on search term and rating
  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.restaurantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesRating = ratingFilter ? review.rating === Number.parseInt(ratingFilter) : true

    return matchesSearch && matchesRating
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-ezy-text">Reviews</h1>
        <p className="text-muted-foreground">Manage customer reviews for all restaurants</p>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search reviews..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Select value={ratingFilter} onValueChange={setRatingFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Filter by rating" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Ratings</SelectItem>
            <SelectItem value="5">5 Stars</SelectItem>
            <SelectItem value="4">4 Stars</SelectItem>
            <SelectItem value="3">3 Stars</SelectItem>
            <SelectItem value="2">2 Stars</SelectItem>
            <SelectItem value="1">1 Star</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <ReviewTable reviews={filteredReviews} onViewDetails={setSelectedReview} />

      {/* Review Detail Dialog */}
      <Dialog open={!!selectedReview} onOpenChange={(open) => !open && setSelectedReview(null)}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedReview && <ReviewDetail review={selectedReview} />}
        </DialogContent>
      </Dialog>
    </div>
  )
}
