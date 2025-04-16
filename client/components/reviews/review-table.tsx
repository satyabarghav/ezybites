"use client"

import { MoreHorizontal, Star } from "lucide-react"

import type { Review } from "@/lib/data"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface ReviewTableProps {
  reviews: Review[]
  onViewDetails: (review: Review) => void
}

export function ReviewTable({ reviews, onViewDetails }: ReviewTableProps) {
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Restaurant</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead className="hidden md:table-cell">Comment</TableHead>
            <TableHead className="hidden md:table-cell">Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reviews.map((review) => (
            <TableRow key={review.id}>
              <TableCell className="font-medium">{review.restaurantName}</TableCell>
              <TableCell>{review.customerName}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  <Star className="mr-1 h-4 w-4 fill-ezy-main text-ezy-main" />
                  <span>{review.rating}</span>
                </div>
              </TableCell>
              <TableCell className="hidden max-w-xs truncate md:table-cell">{review.comment}</TableCell>
              <TableCell className="hidden md:table-cell">{formatDate(review.createdAt)}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => onViewDetails(review)}>View Details</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
          {reviews.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                No reviews found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
