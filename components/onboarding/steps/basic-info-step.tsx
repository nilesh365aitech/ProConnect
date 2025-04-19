"use client"

import type React from "react"

import { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  headline: z.string().min(5, { message: "Headline must be at least 5 characters" }),
  location: z.string().min(2, { message: "Location is required" }),
  bio: z.string().min(20, { message: "Bio must be at least 20 characters" }),
})

type FormValues = z.infer<typeof formSchema>

interface BasicInfoStepProps {
  data: {
    avatar: string
    name: string
    headline: string
    location: string
    bio: string
  }
  onUpdate: (data: {
    avatar: string
    name: string
    headline: string
    location: string
    bio: string
  }) => void
}

export function BasicInfoStep({ data, onUpdate }: BasicInfoStepProps) {
  const [avatar, setAvatar] = useState<string>(data.avatar || "/placeholder.svg?height=100&width=100")

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data.name || "",
      headline: data.headline || "",
      location: data.location || "",
      bio: data.bio || "",
    },
  })

  function onSubmit(values: FormValues) {
    onUpdate({
      avatar,
      ...values,
    })
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // In a real app, you would upload the file to a server
      // Here we're just creating a local URL for the image
      const reader = new FileReader()
      reader.onload = () => {
        if (reader.result) {
          setAvatar(reader.result.toString())
        }
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center gap-4">
        <Avatar className="h-24 w-24">
          <AvatarImage src={avatar || "/placeholder.svg"} alt="Profile" />
          <AvatarFallback>{data.name ? data.name.charAt(0).toUpperCase() : "U"}</AvatarFallback>
        </Avatar>
        <div>
          <label htmlFor="avatar-upload" className="cursor-pointer text-sm text-primary hover:underline">
            Change profile picture
          </label>
          <input id="avatar-upload" type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="headline"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Professional Headline</FormLabel>
                <FormControl>
                  <Input placeholder="Software Engineer at Company" {...field} />
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
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="San Francisco, CA" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea placeholder="Tell us about yourself..." className="min-h-[120px]" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Save & Continue
          </Button>
        </form>
      </Form>
    </div>
  )
}
