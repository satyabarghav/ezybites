"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus } from "lucide-react"

import { restaurants } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { RestaurantCard } from "@/components/restaurants/restaurant-card"
import { RestaurantFilter } from "@/components/restaurants/restaurant-filter"

export default function RestaurantsPage() {
  // Get unique locations and statuses for filters
  const locations = Array.from(new Set(restaurants.map((r) => r.location)))
  const statuses = Array.from(new Set(restaurants.map((r) => r.status)))

  // State for filtered restaurants
  const [filteredRestaurants, setFilteredRestaurants] = useState(restaurants)

  // Handle filter changes
  const handleFilterChange = (filters: { search: string; location: string; status: string }) => {
    const filtered = restaurants.filter((restaurant) => {
      const matchesSearch = filters.search
        ? restaurant.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          restaurant.description.toLowerCase().includes(filters.search.toLowerCase())
        : true

      const matchesLocation = filters.location ? restaurant.location === filters.location : true

      const matchesStatus = filters.status ? restaurant.status === filters.status : true

      return matchesSearch && matchesLocation && matchesStatus
    })

    setFilteredRestaurants(filtered)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-ezy-text">Restaurants</h1>
          <p className="text-muted-foreground">Manage all restaurants on the platform</p>
        </div>
        <Button className="bg-ezy-cta hover:bg-ezy-cta-dark" asChild>
          <Link href="/restaurants/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Restaurant
          </Link>
        </Button>
      </div>

      <RestaurantFilter locations={locations} statuses={statuses} onFilterChange={handleFilterChange} />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredRestaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}

        {filteredRestaurants.length === 0 && (
          <div className="col-span-full flex h-40 flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
            <h3 className="text-lg font-semibold">No restaurants found</h3>
            <p className="text-muted-foreground">Try adjusting your filters or add a new restaurant</p>
          </div>
        )}
      </div>
    </div>
  )
}
