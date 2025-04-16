"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"

import type { Admin, Restaurant } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

interface AdminFormProps {
  admin?: Admin
  restaurants: Restaurant[]
  onCancel: () => void
}

export function AdminForm({ admin, restaurants, onCancel }: AdminFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: admin?.name || "",
    email: admin?.email || "",
    phone: admin?.phone || "",
    restaurantId: admin?.restaurantId || "",
    status: admin?.status || "active",
  })

  const handleChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      router.push("/admins")
    }, 1000)
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>{admin ? "Edit Admin" : "Create Admin"}</CardTitle>
          <CardDescription>
            {admin ? "Update the admin account information" : "Create a new restaurant admin account"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" value={formData.name} onChange={(e) => handleChange("name", e.target.value)} required />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" value={formData.phone} onChange={(e) => handleChange("phone", e.target.value)} required />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="restaurant">Restaurant</Label>
            <Select
              value={formData.restaurantId}
              onValueChange={(value) => handleChange("restaurantId", value)}
              required
            >
              <SelectTrigger id="restaurant">
                <SelectValue placeholder="Select a restaurant" />
              </SelectTrigger>
              <SelectContent>
                {restaurants.map((restaurant) => (
                  <SelectItem key={restaurant.id} value={restaurant.id}>
                    {restaurant.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="status"
              checked={formData.status === "active"}
              onCheckedChange={(checked) => handleChange("status", checked ? "active" : "inactive")}
            />
            <Label htmlFor="status">Active</Label>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={onCancel} type="button">
            Cancel
          </Button>
          <Button type="submit" className="bg-ezy-cta hover:bg-ezy-cta-dark" disabled={isLoading}>
            {isLoading ? "Saving..." : admin ? "Update Admin" : "Create Admin"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
