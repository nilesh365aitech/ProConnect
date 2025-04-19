"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BasicInfoStep } from "@/components/onboarding/steps/basic-info-step"
import { SkillsStep } from "@/components/onboarding/steps/skills-step"
import { ExperienceStep } from "@/components/onboarding/steps/experience-step"
import { EducationStep } from "@/components/onboarding/steps/education-step"

interface ProfileEditModalProps {
  userData: any
  onSave: (data: any) => void
  onCancel: () => void
}

export function ProfileEditModal({ userData, onSave, onCancel }: ProfileEditModalProps) {
  const [profileData, setProfileData] = useState({
    avatar: userData.avatar || "",
    name: userData.name || "",
    headline: userData.headline || "",
    location: userData.location || "",
    bio: userData.bio || "",
    skills: userData.skills || [],
    experience: userData.experience || [],
    education: userData.education || [],
  })

  const handleSave = () => {
    onSave(profileData)
  }

  return (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="basic">
          <TabsList className="grid grid-cols-4">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="mt-4">
            <BasicInfoStep data={profileData} onUpdate={(data) => setProfileData({ ...profileData, ...data })} />
          </TabsContent>

          <TabsContent value="skills" className="mt-4">
            <SkillsStep data={profileData.skills} onUpdate={(skills) => setProfileData({ ...profileData, skills })} />
          </TabsContent>

          <TabsContent value="experience" className="mt-4">
            <ExperienceStep
              data={profileData.experience}
              onUpdate={(experience) => setProfileData({ ...profileData, experience })}
            />
          </TabsContent>

          <TabsContent value="education" className="mt-4">
            <EducationStep
              data={profileData.education}
              onUpdate={(education) => setProfileData({ ...profileData, education })}
            />
          </TabsContent>
        </Tabs>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
