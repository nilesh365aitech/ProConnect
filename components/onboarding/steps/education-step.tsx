"use client"

import { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2 } from "lucide-react"

const formSchema = z.object({
  school: z.string().min(2, { message: "School name is required" }),
  degree: z.string().min(2, { message: "Degree is required" }),
  field: z.string().min(2, { message: "Field of study is required" }),
  startDate: z.string().min(1, { message: "Start date is required" }),
  endDate: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

interface Education {
  school: string
  degree: string
  field: string
  startDate: string
  endDate: string
}

interface EducationStepProps {
  data: Education[]
  onUpdate: (education: Education[]) => void
}

export function EducationStep({ data, onUpdate }: EducationStepProps) {
  const [educations, setEducations] = useState<Education[]>(data || [])
  const [isAdding, setIsAdding] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      school: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
    },
  })

  function onSubmit(values: FormValues) {
    const updatedEducations = [...educations, values as Education]
    setEducations(updatedEducations)
    onUpdate(updatedEducations)
    setIsAdding(false)
    form.reset()
  }

  const removeEducation = (index: number) => {
    const updatedEducations = educations.filter((_, i) => i !== index)
    setEducations(updatedEducations)
    onUpdate(updatedEducations)
  }

  return (
    <div className="space-y-6">
      {educations.length > 0 && (
        <div className="space-y-4">
          {educations.map((education, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{education.school}</CardTitle>
                    <p className="text-sm">
                      {education.degree}, {education.field}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {education.startDate} - {education.endDate || "Present"}
                    </p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => removeEducation(index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}

      {isAdding ? (
        <Card>
          <CardHeader>
            <CardTitle>Add Education</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="school"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>School</FormLabel>
                      <FormControl>
                        <Input placeholder="University Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="degree"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Degree</FormLabel>
                      <FormControl>
                        <Input placeholder="Bachelor's, Master's, etc." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="field"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Field of Study</FormLabel>
                      <FormControl>
                        <Input placeholder="Computer Science, Business, etc." {...field} />
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
                          <Input placeholder="2018" {...field} />
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
                          <Input placeholder="2022" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsAdding(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Add Education</Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      ) : (
        <Button type="button" variant="outline" className="w-full" onClick={() => setIsAdding(true)}>
          Add Education
        </Button>
      )}

      <Button onClick={() => onUpdate(educations)} className="w-full" disabled={isAdding}>
        Save & Continue
      </Button>
    </div>
  )
}
