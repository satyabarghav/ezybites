// Mock data for the restaurant platform

export interface Restaurant {
    id: string
    name: string
    description: string
    phone: string
    email: string
    location: string
    rating: number
    reviewCount: number
    status: "active" | "inactive" | "pending"
    createdAt: string
    updatedAt: string
  }
  
  export interface Admin {
    id: string
    name: string
    email: string
    phone: string
    restaurantId: string
    restaurantName: string
    role: "admin"
    status: "active" | "inactive"
    createdAt: string
  }
  
  export interface Manager {
    id: string
    name: string
    email: string
    phone: string
    restaurantId: string
    restaurantName: string
    role: "manager"
    status: "active" | "inactive"
    createdAt: string
  }
  
  export interface MenuItem {
    id: string
    name: string
    description: string
    price: number
    category: string
    restaurantId: string
    restaurantName: string
    isAvailable: boolean
    image: string
  }
  
  export interface Table {
    id: string
    number: number
    capacity: number
    status: "available" | "occupied" | "reserved"
    restaurantId: string
    restaurantName: string
  }
  
  export interface Session {
    id: string
    customerId: string
    customerName: string
    restaurantId: string
    restaurantName: string
    tableId: string
    tableNumber: number
    status: "requested" | "confirmed" | "in-progress" | "completed" | "cancelled"
    startTime: string
    endTime: string | null
    guestCount: number
  }
  
  export interface Bill {
    id: string
    sessionId: string
    restaurantId: string
    restaurantName: string
    customerId: string
    customerName: string
    items: {
      id: string
      name: string
      price: number
      quantity: number
    }[]
    subtotal: number
    tax: number
    total: number
    status: "pending" | "paid" | "cancelled"
    createdAt: string
    paidAt: string | null
  }
  
  export interface Review {
    id: string
    restaurantId: string
    restaurantName: string
    customerId: string
    customerName: string
    rating: number
    comment: string
    createdAt: string
  }
  
  export interface Metric {
    id: string
    restaurantId: string
    restaurantName: string
    type: "engagement" | "revenue" | "sessions" | "customers"
    value: number
    period: "daily" | "weekly" | "monthly"
    date: string
  }
  
  // Generate mock restaurants
  export const restaurants: Restaurant[] = Array.from({ length: 20 }, (_, i) => ({
    id: `rest-${i + 1}`,
    name: `Restaurant ${i + 1}`,
    description: `A wonderful restaurant with great food and atmosphere. Located in a prime location.`,
    phone: `+1 (555) ${100 + i}-${1000 + i}`,
    email: `contact@restaurant${i + 1}.com`,
    location: ["New York", "Los Angeles", "Chicago", "Houston", "Miami"][i % 5],
    rating: Math.floor(Math.random() * 2) + 3 + Math.random(),
    reviewCount: Math.floor(Math.random() * 100) + 10,
    status: ["active", "inactive", "pending"][Math.floor(Math.random() * 3)] as "active" | "inactive" | "pending",
    createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
    updatedAt: new Date(Date.now() - Math.floor(Math.random() * 1000000000)).toISOString(),
  }))
  
  // Generate mock admins
  export const admins: Admin[] = restaurants.map((restaurant, i) => ({
    id: `admin-${i + 1}`,
    name: `Admin ${i + 1}`,
    email: `admin${i + 1}@restaurant${i + 1}.com`,
    phone: `+1 (555) ${200 + i}-${2000 + i}`,
    restaurantId: restaurant.id,
    restaurantName: restaurant.name,
    role: "admin",
    status: Math.random() > 0.2 ? "active" : "inactive",
    createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
  }))
  
  // Generate mock managers
  export const managers: Manager[] = Array.from({ length: 40 }, (_, i) => {
    const restaurantIndex = Math.floor(i / 2)
    const restaurant = restaurants[restaurantIndex]
    return {
      id: `manager-${i + 1}`,
      name: `Manager ${i + 1}`,
      email: `manager${i + 1}@restaurant${restaurantIndex + 1}.com`,
      phone: `+1 (555) ${300 + i}-${3000 + i}`,
      restaurantId: restaurant.id,
      restaurantName: restaurant.name,
      role: "manager",
      status: Math.random() > 0.2 ? "active" : "inactive",
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
    }
  })
  
  // Generate mock menu items
  export const menuItems: MenuItem[] = Array.from({ length: 100 }, (_, i) => {
    const restaurantIndex = Math.floor(i / 5)
    const restaurant = restaurants[restaurantIndex]
    const categories = ["Appetizer", "Main Course", "Dessert", "Beverage", "Special"]
    return {
      id: `item-${i + 1}`,
      name: `Menu Item ${i + 1}`,
      description: `Delicious ${categories[i % 5].toLowerCase()} made with fresh ingredients.`,
      price: Math.floor(Math.random() * 20) + 5 + Math.random(),
      category: categories[i % 5],
      restaurantId: restaurant.id,
      restaurantName: restaurant.name,
      isAvailable: Math.random() > 0.1,
      image: `/placeholder.svg?text=Food${i + 1}`,
    }
  })
  
  // Generate mock tables
  export const tables: Table[] = Array.from({ length: 80 }, (_, i) => {
    const restaurantIndex = Math.floor(i / 4)
    const restaurant = restaurants[restaurantIndex]
    return {
      id: `table-${i + 1}`,
      number: (i % 4) + 1,
      capacity: [2, 4, 6, 8][i % 4],
      status: ["available", "occupied", "reserved"][Math.floor(Math.random() * 3)] as
        | "available"
        | "occupied"
        | "reserved",
      restaurantId: restaurant.id,
      restaurantName: restaurant.name,
    }
  })
  
  // Generate mock sessions
  export const sessions: Session[] = Array.from({ length: 50 }, (_, i) => {
    const restaurantIndex = Math.floor(i / 3)
    const restaurant = restaurants[restaurantIndex % restaurants.length]
    const tableIndex = Math.floor(i / 2)
    const table = tables[tableIndex % tables.length]
    const statuses = ["requested", "confirmed", "in-progress", "completed", "cancelled"]
    const status = statuses[Math.floor(Math.random() * statuses.length)] as
      | "requested"
      | "confirmed"
      | "in-progress"
      | "completed"
      | "cancelled"
    const startTime = new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString()
    const endTime =
      status === "completed" ? new Date(Date.now() - Math.floor(Math.random() * 1000000000)).toISOString() : null
  
    return {
      id: `session-${i + 1}`,
      customerId: `customer-${i + 1}`,
      customerName: `Customer ${i + 1}`,
      restaurantId: restaurant.id,
      restaurantName: restaurant.name,
      tableId: table.id,
      tableNumber: table.number,
      status,
      startTime,
      endTime,
      guestCount: Math.floor(Math.random() * 6) + 1,
    }
  })
  
  // Generate mock bills
  export const bills: Bill[] = sessions
    .filter((session) => ["in-progress", "completed"].includes(session.status))
    .map((session, i) => {
      const items = Array.from({ length: Math.floor(Math.random() * 5) + 1 }, (_, j) => {
        const menuItemIndex = Math.floor(Math.random() * menuItems.length)
        const menuItem = menuItems[menuItemIndex]
        const quantity = Math.floor(Math.random() * 3) + 1
        return {
          id: menuItem.id,
          name: menuItem.name,
          price: menuItem.price,
          quantity,
        }
      })
  
      const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
      const tax = subtotal * 0.08
      const total = subtotal + tax
  
      return {
        id: `bill-${i + 1}`,
        sessionId: session.id,
        restaurantId: session.restaurantId,
        restaurantName: session.restaurantName,
        customerId: session.customerId,
        customerName: session.customerName,
        items,
        subtotal,
        tax,
        total,
        status: session.status === "completed" ? "paid" : "pending",
        createdAt: session.startTime,
        paidAt: session.status === "completed" ? session.endTime : null,
      }
    })
  
  // Generate mock reviews
  export const reviews: Review[] = Array.from({ length: 100 }, (_, i) => {
    const restaurantIndex = Math.floor(Math.random() * restaurants.length)
    const restaurant = restaurants[restaurantIndex]
    const rating = Math.floor(Math.random() * 5) + 1
  
    return {
      id: `review-${i + 1}`,
      restaurantId: restaurant.id,
      restaurantName: restaurant.name,
      customerId: `customer-${i + 100}`,
      customerName: `Customer ${i + 100}`,
      rating,
      comment:
        rating > 3
          ? `Great experience at ${restaurant.name}! The food was delicious and the service was excellent.`
          : `Average experience at ${restaurant.name}. The food was okay but the service could be improved.`,
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
    }
  })
  
  // Generate mock metrics
  export const metrics: Metric[] = Array.from({ length: 80 }, (_, i) => {
    const restaurantIndex = Math.floor(i / 4)
    const restaurant = restaurants[restaurantIndex % restaurants.length]
    const types = ["engagement", "revenue", "sessions", "customers"]
    const periods = ["daily", "weekly", "monthly"]
  
    return {
      id: `metric-${i + 1}`,
      restaurantId: restaurant.id,
      restaurantName: restaurant.name,
      type: types[i % 4] as "engagement" | "revenue" | "sessions" | "customers",
      value: Math.floor(Math.random() * 1000) + 100,
      period: periods[Math.floor(Math.random() * 3)] as "daily" | "weekly" | "monthly",
      date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
    }
  })
  
  // Dashboard summary data
  export const dashboardSummary = {
    totalRestaurants: restaurants.length,
    activeRestaurants: restaurants.filter((r) => r.status === "active").length,
    totalAdmins: admins.length,
    totalManagers: managers.length,
    totalSessions: sessions.length,
    pendingSessions: sessions.filter((s) => s.status === "requested").length,
    totalRevenue: bills.reduce((sum, bill) => sum + (bill.status === "paid" ? bill.total : 0), 0),
    averageRating: restaurants.reduce((sum, restaurant) => sum + restaurant.rating, 0) / restaurants.length,
  }
  
  // Restaurant metrics by location
  export const restaurantsByLocation = restaurants.reduce(
    (acc, restaurant) => {
      acc[restaurant.location] = (acc[restaurant.location] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )
  
  // Revenue by restaurant
  export const revenueByRestaurant = restaurants.map((restaurant) => {
    const restaurantBills = bills.filter((bill) => bill.restaurantId === restaurant.id && bill.status === "paid")
    const revenue = restaurantBills.reduce((sum, bill) => sum + bill.total, 0)
    return {
      id: restaurant.id,
      name: restaurant.name,
      revenue,
    }
  })
  
  // Sessions by status
  export const sessionsByStatus = sessions.reduce(
    (acc, session) => {
      acc[session.status] = (acc[session.status] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )
  
  // Reviews by rating
  export const reviewsByRating = reviews.reduce(
    (acc, review) => {
      acc[review.rating] = (acc[review.rating] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )
  