"use client"

import { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2 } from "lucide-react"

const formSchema = z.object({
  title: z.string().min(2, { message: "Job title is required" }),
  company: z.string().min(2, { message: "Company name is required" }),
  location: z.string().optional(),
  startDate: z.string().min(1, { message: "Start date is required" }),
  endDate: z.string().optional(),
  description: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

interface Experience {
  title: string
  company: string
  location: string
  startDate: string
  endDate: string
  description: string
}

interface ExperienceStepProps {
  data: Experience[]
  onUpdate: (experience: Experience[]) => void
}

export function ExperienceStep({ data, onUpdate }: ExperienceStepProps) {
  const [experiences, setExperiences] = useState<Experience[]>(data || [])
  const [isAdding, setIsAdding] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  })

  function onSubmit(values: FormValues) {
    const updatedExperiences = [...experiences, values as Experience]
    setExperiences(updatedExperiences)
    onUpdate(updatedExperiences)
    setIsAdding(false)
    form.reset()
  }

  const removeExperience = (index: number) => {
    const updatedExperiences = experiences.filter((_, i) => i !== index)
    setExperiences(updatedExperiences)
    onUpdate(updatedExperiences)
  }

  return (
    <div className="space-y-6">
      {experiences.length > 0 && (
        <div className="space-y-4">
          {experiences.map((experience, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{experience.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {experience.company}
                      {experience.location && ` • ${experience.location}`}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {experience.startDate} - {experience.endDate || "Present"}
                    </p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => removeExperience(index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              {experience.description && (
                <CardContent>
                  <p className="text-sm">{experience.description}</p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      )}

      {isAdding ? (
        <Card>
          <CardHeader>
            <CardTitle>Add Experience</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Software Engineer" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company</FormLabel>
                      <FormControl>
                        <Input placeholder="Company Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="San Francisco, CA" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Date</FormLabel>
                        <FormControl>
                          <Input placeholder="Jan 2020" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Date (or "Present")</FormLabel>
                        <FormControl>
                          <Input placeholder="Present" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your responsibilities and achievements..."
                          className="min-h-[100px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsAdding(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Add Experience</Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      ) : (
        <Button type="button" variant="outline" className="w-full" onClick={() => setIsAdding(true)}>
          Add Experience
        </Button>
      )}

      <Button onClick={() => onUpdate(experiences)} className="w-full" disabled={isAdding}>
        Save & Continue
      </Button>
    </div>
  )
}
