"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Utensils } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function LoginForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const router = useRouter()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)

    // Simulate authentication - in a real app, this would call an API
    setTimeout(() => {
      setIsLoading(false)
      // Redirect to dashboard after successful login
      router.push("/dashboard")
    }, 1500)
  }

  return (
    <Card className="w-full max-w-md border-ezy-main shadow-lg">
      <CardHeader className="space-y-1 bg-ezy-main text-white rounded-t-lg">
        <div className="flex items-center justify-center mb-2">
          <Utensils className="h-10 w-10" />
        </div>
        <CardTitle className="text-2xl text-center">EzyBites Super Admin Login</CardTitle>
        <CardDescription className="text-ezy-background text-center">
          Enter your credentials to access the restaurant management platform
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                required
                className="border-ezy-light-text/20"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                required
                className="border-ezy-light-text/20"
              />
            </div>
            <Button type="submit" className="w-full bg-ezy-cta hover:bg-ezy-cta-dark text-white" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col">
        <div className="text-sm text-ezy-light-text text-center mt-2">Protected area. Authorized personnel only.</div>
      </CardFooter>
    </Card>
  )
}
