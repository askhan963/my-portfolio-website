"use client"

import { useSession } from "next-auth/react"
import { prisma } from "@/lib/prisma"
import { useEffect, useState } from "react"

export default function AdminDashboard() {
  const { data: session } = useSession()
  const [stats, setStats] = useState({
    projects: 0,
    honors: 0,
    experience: 0,
  })

  useEffect(() => {
    // In a real app, you'd fetch this data from API routes
    // For now, we'll show placeholder data
    setStats({
      projects: 2,
      honors: 2,
      experience: 1,
    })
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-foreground/70">Welcome to your admin panel</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card p-6 rounded-lg border border-border">
          <h3 className="text-lg font-semibold text-foreground">Projects</h3>
          <p className="text-3xl font-bold text-primary">{stats.projects}</p>
          <p className="text-sm text-foreground/70">Total projects</p>
        </div>

        <div className="bg-card p-6 rounded-lg border border-border">
          <h3 className="text-lg font-semibold text-foreground">Honors</h3>
          <p className="text-3xl font-bold text-primary">{stats.honors}</p>
          <p className="text-sm text-foreground/70">Certifications & awards</p>
        </div>

        <div className="bg-card p-6 rounded-lg border border-border">
          <h3 className="text-lg font-semibold text-foreground">Experience</h3>
          <p className="text-3xl font-bold text-primary">{stats.experience}</p>
          <p className="text-sm text-foreground/70">Work experiences</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-card p-6 rounded-lg border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/admin/projects"
            className="p-4 border border-border rounded-lg hover:bg-primary/5 transition-colors"
          >
            <h4 className="font-medium text-foreground">Manage Projects</h4>
            <p className="text-sm text-foreground/70">Add, edit, or delete projects</p>
          </a>
          <a
            href="/admin/honors"
            className="p-4 border border-border rounded-lg hover:bg-primary/5 transition-colors"
          >
            <h4 className="font-medium text-foreground">Manage Honors</h4>
            <p className="text-sm text-foreground/70">Update certifications and awards</p>
          </a>
          <a
            href="/admin/experience"
            className="p-4 border border-border rounded-lg hover:bg-primary/5 transition-colors"
          >
            <h4 className="font-medium text-foreground">Manage Experience</h4>
            <p className="text-sm text-foreground/70">Edit work history and roles</p>
          </a>
        </div>
      </div>
    </div>
  )
}
