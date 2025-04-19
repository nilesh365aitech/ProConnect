"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ProfileWizard } from "@/components/onboarding/profile-wizard"

export default function OnboardingPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is authenticated
    const user = localStorage.getItem("proconnect-user")
    if (!user) {
      router.push("/")
      return
    }

    setIsLoading(false)
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        <ProfileWizard onComplete={() => router.push("/feed")} />
      </div>
    </div>
  )
}
