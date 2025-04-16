"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Coffee, LayoutDashboard, MessageSquare, Settings, Users } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface NavItem {
  title: string
  href: string
  icon: React.ReactNode
}

export function MainNav() {
  const pathname = usePathname()

  const navItems: NavItem[] = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="mr-2 h-4 w-4" />,
    },
    {
      title: "Restaurants",
      href: "/restaurants",
      icon: <Coffee className="mr-2 h-4 w-4" />,
    },
    {
      title: "Admins",
      href: "/admins",
      icon: <Users className="mr-2 h-4 w-4" />,
    },
    {
      title: "Reviews",
      href: "/reviews",
      icon: <MessageSquare className="mr-2 h-4 w-4" />,
    },
    {
      title: "Analytics",
      href: "/analytics",
      icon: <BarChart3 className="mr-2 h-4 w-4" />,
    },
    {
      title: "Settings",
      href: "/settings",
      icon: <Settings className="mr-2 h-4 w-4" />,
    },
  ]

  return (
    <nav className="flex flex-col gap-2 p-2">
      {navItems.map((item) => (
        <Button
          key={item.href}
          variant={pathname === item.href ? "default" : "ghost"}
          className={cn(
            "justify-start",
            pathname === item.href
              ? "bg-ezy-main text-white hover:bg-ezy-main-dark"
              : "text-ezy-text hover:bg-ezy-background hover:text-ezy-main",
          )}
          asChild
        >
          <Link href={item.href}>
            {item.icon}
            {item.title}
          </Link>
        </Button>
      ))}
    </nav>
  )
}
