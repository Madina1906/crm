"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Users, Handshake, CheckSquare, UserPlus, LogOut, BarChart3, Settings, Bell } from "lucide-react"

interface NavigationProps {
  isAuthenticated?: boolean
  isAdmin?: boolean
  userName?: string
}

export default function Navigation({
  isAuthenticated = true,
  isAdmin = false,
  userName = "John Doe",
}: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false)

  const navigationItems = [
    { href: "/interactions", label: "Interactions", icon: Users },
    { href: "/deals", label: "Deals", icon: Handshake },
    { href: "/tasks", label: "Tasks", icon: CheckSquare },
    { href: "/leads", label: "Leads", icon: UserPlus },
    { href: "/analytics", label: "Analytics", icon: BarChart3 },
  ]

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-green-100 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-emerald-600">
              <span className="text-sm font-bold text-white">C</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              CRM Pro
            </span>
          </Link>

          {/* Desktop Navigation */}
          {isAuthenticated && (
            <div className="hidden md:flex items-center space-x-1">
              {navigationItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link key={item.href} href={item.href}>
                    <Button
                      variant="ghost"
                      className="flex items-center space-x-2 text-gray-600 hover:text-green-600 hover:bg-green-50"
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Button>
                  </Link>
                )
              })}
            </div>
          )}

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {/* Notifications */}
                <Button variant="ghost" size="icon" className="relative hover:bg-green-50">
                  <Bell className="h-5 w-5 text-gray-600" />
                  <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-green-500"></span>
                </Button>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <Avatar className="h-10 w-10 border-2 border-green-200">
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt={userName} />
                        <AvatarFallback className="bg-green-100 text-green-700">
                          {userName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{userName}</p>
                        <p className="text-xs leading-none text-muted-foreground">john@company.com</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    {isAdmin && (
                      <DropdownMenuItem>
                        <UserPlus className="mr-2 h-4 w-4" />
                        <span>Create User</span>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Mobile Menu */}
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="md:hidden">
                      <Menu className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                    <div className="flex flex-col space-y-4 mt-8">
                      {navigationItems.map((item) => {
                        const Icon = item.icon
                        return (
                          <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
                            <Button
                              variant="ghost"
                              className="w-full justify-start space-x-2 text-gray-600 hover:text-green-600 hover:bg-green-50"
                            >
                              <Icon className="h-4 w-4" />
                              <span>{item.label}</span>
                            </Button>
                          </Link>
                        )
                      })}
                    </div>
                  </SheetContent>
                </Sheet>
              </>
            ) : (
              <Link href="/login">
                <Button className="bg-green-600 hover:bg-green-700 text-white">Login</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
