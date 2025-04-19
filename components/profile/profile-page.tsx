"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Pencil } from "lucide-react"
import { ProfileEditModal } from "@/components/profile/profile-edit-modal"
import { useToast } from "@/hooks/use-toast"

interface ProfilePageProps {
  userData: any
  onUpdate: (data: any) => void
}

export function ProfilePage({ userData, onUpdate }: ProfilePageProps) {
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)

  const handleSaveProfile = (data: any) => {
    onUpdate(data)
    setIsEditing(false)

    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated.",
    })
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="space-y-6">
        {/* Profile header */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={userData.avatar || "/placeholder.svg"} alt={userData.name} />
                <AvatarFallback>{userData.name ? userData.name.charAt(0).toUpperCase() : "U"}</AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                  <div>
                    <h1 className="text-2xl font-bold">{userData.name}</h1>
                    <p className="text-lg text-muted-foreground">{userData.headline}</p>
                    <p className="text-sm text-muted-foreground">{userData.location}</p>
                  </div>

                  <Button onClick={() => setIsEditing(true)}>
                    <Pencil className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {userData.skills?.map((skill: string) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">About</h3>
                  <p className="text-muted-foreground whitespace-pre-line">{userData.bio}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile tabs */}
        <Tabs defaultValue="experience">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
          </TabsList>

          <TabsContent value="experience" className="mt-6">
            <div className="space-y-4">
              {userData.experience?.length > 0 ? (
                userData.experience.map((exp: any, index: number) => (
                  <Card key={index}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{exp.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {exp.company}
                        {exp.location && ` • ${exp.location}`}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {exp.startDate} - {exp.endDate || "Present"}
                      </p>
                    </CardHeader>
                    {exp.description && (
                      <CardContent>
                        <p className="text-sm">{exp.description}</p>
                      </CardContent>
                    )}
                  </Card>
                ))
              ) : (
                <p className="text-muted-foreground text-center py-6">No experience added yet.</p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="education" className="mt-6">
            <div className="space-y-4">
              {userData.education?.length > 0 ? (
                userData.education.map((edu: any, index: number) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-lg">{edu.school}</CardTitle>
                      <p className="text-sm">
                        {edu.degree}, {edu.field}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {edu.startDate} - {edu.endDate || "Present"}
                      </p>
                    </CardHeader>
                  </Card>
                ))
              ) : (
                <p className="text-muted-foreground text-center py-6">No education added yet.</p>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {isEditing && (
        <ProfileEditModal userData={userData} onSave={handleSaveProfile} onCancel={() => setIsEditing(false)} />
      )}
    </div>
  )
}
