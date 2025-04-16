"use client"

import { useState } from "react"
import { Check, ChevronsUpDown, Search } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface RestaurantFilterProps {
  locations: string[]
  statuses: string[]
  onFilterChange: (filters: { search: string; location: string; status: string }) => void
}

export function RestaurantFilter({ locations, statuses, onFilterChange }: RestaurantFilterProps) {
  const [search, setSearch] = useState("")
  const [location, setLocation] = useState("")
  const [status, setStatus] = useState("")
  const [openLocation, setOpenLocation] = useState(false)
  const [openStatus, setOpenStatus] = useState(false)

  const handleSearchChange = (value: string) => {
    setSearch(value)
    onFilterChange({ search: value, location, status })
  }

  const handleLocationChange = (value: string) => {
    setLocation(value === location ? "" : value)
    setOpenLocation(false)
    onFilterChange({ search, location: value === location ? "" : value, status })
  }

  const handleStatusChange = (value: string) => {
    setStatus(value === status ? "" : value)
    setOpenStatus(false)
    onFilterChange({ search, location, status: value === status ? "" : value })
  }

  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search restaurants..."
          className="pl-8"
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
      </div>

      <Popover open={openLocation} onOpenChange={setOpenLocation}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={openLocation}
            className="w-full justify-between md:w-[200px]"
          >
            {location ? location : "Filter by location"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0 md:w-[200px]">
          <Command>
            <CommandInput placeholder="Search location..." />
            <CommandList>
              <CommandEmpty>No location found.</CommandEmpty>
              <CommandGroup>
                {locations.map((loc) => (
                  <CommandItem key={loc} value={loc} onSelect={() => handleLocationChange(loc)}>
                    <Check className={cn("mr-2 h-4 w-4", location === loc ? "opacity-100" : "opacity-0")} />
                    {loc}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <Popover open={openStatus} onOpenChange={setOpenStatus}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={openStatus}
            className="w-full justify-between md:w-[200px]"
          >
            {status ? status.charAt(0).toUpperCase() + status.slice(1) : "Filter by status"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0 md:w-[200px]">
          <Command>
            <CommandInput placeholder="Search status..." />
            <CommandList>
              <CommandEmpty>No status found.</CommandEmpty>
              <CommandGroup>
                {statuses.map((stat) => (
                  <CommandItem key={stat} value={stat} onSelect={() => handleStatusChange(stat)}>
                    <Check className={cn("mr-2 h-4 w-4", status === stat ? "opacity-100" : "opacity-0")} />
                    {stat.charAt(0).toUpperCase() + stat.slice(1)}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
