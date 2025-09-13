"use client"

import { useSession } from "next-auth/react"
import { useRouter, usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import Sidebar from "@/components/admin/Sidebar"
import Header from "@/components/admin/Header"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || status === "loading") return

    // Only redirect if not on login page
    if (!session || session.user.role !== "ADMIN") {
      if (!pathname.includes('/admin/login')) {
        router.push("/admin/login")
      }
    }
  }, [session, status, router, pathname, mounted])

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-900 dark:text-white mt-2">Loading...</p>
        </div>
      </div>
    )
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-900 dark:text-white mt-2">Loading...</p>
        </div>
      </div>
    )
  }

  // If not authenticated and not on login page, show redirecting message
  if (!session || session.user.role !== "ADMIN") {
    if (pathname.includes('/admin/login')) {
      return <>{children}</>
    }
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <div className="text-gray-900 dark:text-white mt-2">Redirecting...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex h-screen">
        {/* Sidebar */}
        <Sidebar
          isCollapsed={sidebarCollapsed}
          onToggle={toggleSidebar}
          isMobileOpen={mobileMenuOpen}
          onMobileToggle={toggleMobileMenu}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <Header
            onMobileMenuToggle={toggleMobileMenu}
            isCollapsed={sidebarCollapsed}
            onToggle={toggleSidebar}
          />

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">
            <div className="p-4 lg:p-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}