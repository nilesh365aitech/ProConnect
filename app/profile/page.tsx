"use client"

import { useEffect, useState } from "react"
import { AppLayout } from "@/components/layout/app-layout"
import { ProfilePage } from "@/components/profile/profile-page"

export default function Profile() {
  const [isLoading, setIsLoading] = useState(true)
  const [userData, setUserData] = useState<any>(null)

  useEffect(() => {
    // Check if user exists in localStorage, if not create a default user
    let user = localStorage.getItem("proconnect-user")
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
      user = JSON.stringify(defaultUser)
    }

    setUserData(JSON.parse(user))
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
      <ProfilePage
        userData={userData}
        onUpdate={(data) => {
          const updatedUser = { ...userData, ...data }
          localStorage.setItem("proconnect-user", JSON.stringify(updatedUser))
          setUserData(updatedUser)
        }}
      />
    </AppLayout>
  )
}
