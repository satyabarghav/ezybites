"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, Utensils, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { MainNav } from "@/components/layout/main-nav"

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col p-0">
        <div className="flex items-center border-b p-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-lg font-semibold"
            onClick={() => setOpen(false)}
          >
            <Utensils className="h-6 w-6 text-ezy-main" />
            <span className="text-ezy-text">Restaurant Platform</span>
          </Link>
          <Button variant="ghost" size="icon" className="ml-auto" onClick={() => setOpen(false)}>
            <X className="h-6 w-6" />
            <span className="sr-only">Close menu</span>
          </Button>
        </div>
        <div className="flex-1 overflow-auto">
          <MainNav />
        </div>
      </SheetContent>
    </Sheet>
  )
}
