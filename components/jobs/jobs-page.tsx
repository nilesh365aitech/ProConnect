"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { JobCard } from "@/components/jobs/job-card"
import { JobDetailModal } from "@/components/jobs/job-detail-modal"
import { mockJobs } from "@/lib/mock-data"
import type { Job } from "@/lib/types"
import { Search, Filter } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>(mockJobs)
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [filters, setFilters] = useState({
    remote: false,
    fullTime: false,
    partTime: false,
    entryLevel: false,
  })
  const [searchQuery, setSearchQuery] = useState("")

  const handleFilterChange = (filter: keyof typeof filters) => {
    setFilters({
      ...filters,
      [filter]: !filters[filter],
    })
  }

  const filteredJobs = jobs.filter((job) => {
    // Apply search filter
    if (
      searchQuery &&
      !job.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !job.company.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    // Apply tag filters
    if (filters.remote && !job.tags.includes("Remote")) return false
    if (filters.fullTime && !job.tags.includes("Full-time")) return false
    if (filters.partTime && !job.tags.includes("Part-time")) return false
    if (filters.entryLevel && !job.tags.includes("Entry-level")) return false

    return true
  })

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <h1 className="text-3xl font-bold">Job Board</h1>
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search jobs..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 items-center">
          <Filter className="h-4 w-4 mr-2" />
          <span className="text-sm font-medium mr-2">Filters:</span>
          <Badge
            variant={filters.remote ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => handleFilterChange("remote")}
          >
            Remote
          </Badge>
          <Badge
            variant={filters.fullTime ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => handleFilterChange("fullTime")}
          >
            Full-time
          </Badge>
          <Badge
            variant={filters.partTime ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => handleFilterChange("partTime")}
          >
            Part-time
          </Badge>
          <Badge
            variant={filters.entryLevel ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => handleFilterChange("entryLevel")}
          >
            Entry-level
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => <JobCard key={job.id} job={job} onClick={() => setSelectedJob(job)} />)
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">No jobs match your filters.</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setFilters({
                    remote: false,
                    fullTime: false,
                    partTime: false,
                    entryLevel: false,
                  })
                  setSearchQuery("")
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>

      {selectedJob && <JobDetailModal job={selectedJob} onClose={() => setSelectedJob(null)} />}
    </div>
  )
}
