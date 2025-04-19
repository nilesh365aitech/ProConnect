"use client"

import { useState } from "react"
import { formatDistanceToNow } from "date-fns"
import type { Job } from "@/lib/types"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, Calendar, Briefcase } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface JobDetailModalProps {
  job: Job
  onClose: () => void
}

export function JobDetailModal({ job, onClose }: JobDetailModalProps) {
  const { toast } = useToast()
  const [isApplying, setIsApplying] = useState(false)

  const handleApply = () => {
    setIsApplying(true)

    // Simulate API call
    setTimeout(() => {
      setIsApplying(false)
      onClose()

      toast({
        title: "Application submitted",
        description: `Your application for ${job.title} at ${job.company} has been submitted.`,
      })
    }, 1500)
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
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
            <div>
              <DialogTitle className="text-xl">{job.title}</DialogTitle>
              <p className="text-muted-foreground">{job.company}</p>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center text-sm">
              <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
              {job.location}
            </div>
            <div className="flex items-center text-sm">
              <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
              Posted {formatDistanceToNow(new Date(job.postedDate), { addSuffix: true })}
            </div>
            <div className="flex items-center text-sm">
              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
              Apply by {job.deadline}
            </div>
            <div className="flex items-center text-sm">
              <Briefcase className="h-4 w-4 mr-2 text-muted-foreground" />
              {job.salary}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {job.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Job Description</h3>
            <p className="whitespace-pre-line">{job.description}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Requirements</h3>
            <ul className="list-disc pl-5 space-y-1">
              {job.requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Benefits</h3>
            <ul className="list-disc pl-5 space-y-1">
              {job.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          </div>
        </div>

        <DialogFooter className="mt-6">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button onClick={handleApply} disabled={isApplying}>
            {isApplying ? "Applying..." : "Apply Now"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
