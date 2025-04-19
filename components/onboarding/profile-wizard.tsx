"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { BasicInfoStep } from "@/components/onboarding/steps/basic-info-step"
import { SkillsStep } from "@/components/onboarding/steps/skills-step"
import { ExperienceStep } from "@/components/onboarding/steps/experience-step"
import { EducationStep } from "@/components/onboarding/steps/education-step"
import { ProfilePreviewStep } from "@/components/onboarding/steps/profile-preview-step"

interface ProfileWizardProps {
  onComplete: () => void
}

export function ProfileWizard({ onComplete }: ProfileWizardProps) {
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(0)
  const [profileData, setProfileData] = useState({
    avatar: "",
    name: "",
    headline: "",
    location: "",
    bio: "",
    skills: [] as string[],
    experience: [] as {
      title: string
      company: string
      location: string
      startDate: string
      endDate: string
      description: string
    }[],
    education: [] as {
      school: string
      degree: string
      field: string
      startDate: string
      endDate: string
    }[],
  })

  const steps = [
    {
      title: "Basic Information",
      description: "Let's start with your basic profile information",
      component: <BasicInfoStep data={profileData} onUpdate={(data) => setProfileData({ ...profileData, ...data })} />,
    },
    {
      title: "Skills",
      description: "Add skills to showcase your expertise",
      component: (
        <SkillsStep data={profileData.skills} onUpdate={(skills) => setProfileData({ ...profileData, skills })} />
      ),
    },
    {
      title: "Experience",
      description: "Add your work experience",
      component: (
        <ExperienceStep
          data={profileData.experience}
          onUpdate={(experience) => setProfileData({ ...profileData, experience })}
        />
      ),
    },
    {
      title: "Education",
      description: "Add your educational background",
      component: (
        <EducationStep
          data={profileData.education}
          onUpdate={(education) => setProfileData({ ...profileData, education })}
        />
      ),
    },
    {
      title: "Preview Profile",
      description: "Review your profile before completing",
      component: <ProfilePreviewStep data={profileData} />,
    },
  ]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Save profile data to localStorage
      const user = JSON.parse(localStorage.getItem("proconnect-user") || "{}")
      localStorage.setItem(
        "proconnect-user",
        JSON.stringify({
          ...user,
          ...profileData,
          profileCompleted: true,
        }),
      )

      toast({
        title: "Profile completed",
        description: "Your profile has been successfully created!",
      })

      onComplete()
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Complete Your Profile</h1>
        <p className="text-muted-foreground">
          Step {currentStep + 1} of {steps.length}
        </p>
        <div className="w-full bg-muted h-2 mt-4 rounded-full overflow-hidden">
          <div
            className="bg-primary h-full transition-all duration-300 ease-in-out"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{steps[currentStep].title}</CardTitle>
          <CardDescription>{steps[currentStep].description}</CardDescription>
        </CardHeader>
        <CardContent>{steps[currentStep].component}</CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleBack} disabled={currentStep === 0}>
            Back
          </Button>
          <Button onClick={handleNext}>{currentStep === steps.length - 1 ? "Complete Profile" : "Next"}</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
