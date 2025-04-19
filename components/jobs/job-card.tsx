"use client"

import { formatDistanceToNow } from "date-fns"
import type { Job } from "@/lib/types"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Clock } from "lucide-react"

interface JobCardProps {
  job: Job
  onClick: () => void
}

export function JobCard({ job, onClick }: JobCardProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardContent className="pt-6 flex-1">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-md bg-muted flex items-center justify-center overflow-hidden">
            {job.companyLogo ? (
              <img
                src={job.companyLogo || "/placeholder.svg"}
                alt={`${job.company} logo`}
                className="h-full w-full object-contain"
              />
            ) : (
              <span className="font-bold text-lg">{job.company.charAt(0)}</span>
            )}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg line-clamp-2">{job.title}</h3>
            <p className="text-sm text-muted-foreground">{job.company}</p>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-2" />
            {job.location}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-2" />
            Posted {formatDistanceToNow(new Date(job.postedDate), { addSuffix: true })}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {job.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <Button onClick={onClick} className="w-full">
          View Details
        </Button>
      </CardFooter>
    </Card>
  )
}
