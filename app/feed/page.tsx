"use client"

import { useEffect, useState } from "react"
import { AppLayout } from "@/components/layout/app-layout"
import { FeedPage } from "@/components/feed/feed-page"
import { mockPosts } from "@/lib/mock-data"

export default function Feed() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user exists in localStorage, if not create a default user
    const user = localStorage.getItem("proconnect-user")
    if (!user) {
      const defaultUser = {
        id: "user-1",
        name: "John Doe",
        email: "john.doe@example.com",
        headline: "Software Engineer",
        location: "San Francisco, CA",
        bio: "Passionate software engineer with experience in web development and UI/UX design.",
        avatar: "/placeholder.svg?height=100&width=100",
        skills: ["JavaScript", "React", "TypeScript", "Node.js", "UI/UX Design"],
        experience: [
          {
            title: "Senior Frontend Developer",
            company: "TechCorp",
            location: "San Francisco, CA",
            startDate: "Jan 2020",
            endDate: "Present",
            description: "Leading frontend development for the company's main product.",
          },
        ],
        education: [
          {
            school: "University of California",
            degree: "Bachelor's",
            field: "Computer Science",
            startDate: "2012",
            endDate: "2016",
          },
        ],
        isAuthenticated: true,
        profileCompleted: true,
      }

      localStorage.setItem("proconnect-user", JSON.stringify(defaultUser))
    }

    setIsLoading(false)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <AppLayout>
      <FeedPage initialPosts={mockPosts} />
    </AppLayout>
  )
}
