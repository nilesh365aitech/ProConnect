"use client"

import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ProfilePreviewStepProps {
  data: {
    avatar: string
    name: string
    headline: string
    location: string
    bio: string
    skills: string[]
    experience: {
      title: string
      company: string
      location: string
      startDate: string
      endDate: string
      description: string
    }[]
    education: {
      school: string
      degree: string
      field: string
      startDate: string
      endDate: string
    }[]
  }
}

export function ProfilePreviewStep({ data }: ProfilePreviewStepProps) {
  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left gap-6">
        <Avatar className="h-24 w-24">
          <AvatarImage src={data.avatar || "/placeholder.svg"} alt={data.name} />
          <AvatarFallback>{data.name ? data.name.charAt(0).toUpperCase() : "U"}</AvatarFallback>
        </Avatar>
        <div className="space-y-2 flex-1">
          <h2 className="text-2xl font-bold">{data.name || "Your Name"}</h2>
          <p className="text-lg text-muted-foreground">{data.headline || "Your Professional Headline"}</p>
          <p className="text-sm text-muted-foreground">{data.location || "Your Location"}</p>
          <div className="flex flex-wrap gap-2 mt-4">
            {data.skills.map((skill) => (
              <Badge key={skill} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">About</h3>
        <p className="text-muted-foreground">{data.bio || "Your professional bio will appear here."}</p>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Experience</h3>
        {data.experience.length > 0 ? (
          <div className="space-y-4">
            {data.experience.map((exp, index) => (
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
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-sm">No experience added yet.</p>
        )}
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Education</h3>
        {data.education.length > 0 ? (
          <div className="space-y-4">
            {data.education.map((edu, index) => (
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
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-sm">No education added yet.</p>
        )}
      </div>
    </div>
  )
}
