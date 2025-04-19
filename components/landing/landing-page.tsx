"use client"

import { useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { useRouter } from "next/navigation"

export function LandingPage() {
  const router = useRouter()

  useEffect(() => {
    // Create a default user in localStorage if it doesn't exist
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

    // Redirect to feed page after a short delay
    const timer = setTimeout(() => {
      router.push("/feed")
    }, 2000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-primary rounded-full w-8 h-8 flex items-center justify-center text-white font-bold">
              P
            </div>
            <span className="text-xl font-bold">ProConnect</span>
          </div>
          <div className="flex items-center gap-4">
            <ModeToggle />
            <Button onClick={() => router.push("/feed")}>Enter App</Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold">
                Connect, Collaborate, and Grow Your Professional Network
              </h1>
              <p className="text-xl text-muted-foreground">
                ProConnect helps professionals build meaningful connections, discover opportunities, and advance their
                careers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" onClick={() => router.push("/feed")}>
                  Enter ProConnect
                </Button>
              </div>
            </div>
            <div className="flex-1">
              <Image
                src="/placeholder.svg?height=400&width=500"
                alt="Professional networking"
                width={500}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>

          <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg shadow">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Build Your Network</h3>
              <p className="text-muted-foreground">
                Connect with professionals in your industry and expand your professional circle.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg shadow">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Find Opportunities</h3>
              <p className="text-muted-foreground">
                Discover job opportunities that match your skills and career aspirations.
              </p>
            </div>

            <div className="bg-card p-6 rounded-lg shadow">
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Grow Your Skills</h3>
              <p className="text-muted-foreground">
                Share knowledge, learn from others, and stay updated with industry trends.
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="bg-primary rounded-full w-8 h-8 flex items-center justify-center text-white font-bold">
                P
              </div>
              <span className="text-xl font-bold">ProConnect</span>
            </div>
            <div className="flex gap-8">
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                About
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                Privacy
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                Terms
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                Help
              </Link>
            </div>
          </div>
          <div className="mt-8 text-center text-muted-foreground">
            &copy; {new Date().getFullYear()} ProConnect. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
