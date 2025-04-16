import Link from "next/link"
import { Utensils } from "lucide-react"

import { UserNav } from "@/components/layout/user-nav"
import { MobileNav } from "@/components/layout/mobile-nav"

export function Header() {
  return (
    <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-white px-4 md:px-6">
      <div className="flex items-center gap-2 md:hidden">
        <MobileNav />
      </div>
      <div className="hidden md:flex">
        <Link href="/dashboard" className="flex items-center gap-2 text-lg font-semibold">
          <Utensils className="h-6 w-6 text-ezy-main" />
          <span className="text-ezy-text">Restaurant Platform</span>
        </Link>
      </div>
      <div className="flex flex-1 items-center justify-end gap-4">
        <UserNav />
      </div>
    </header>
  )
}
