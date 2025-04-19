"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { X, Plus } from "lucide-react"

interface SkillsStepProps {
  data: string[]
  onUpdate: (skills: string[]) => void
}

export function SkillsStep({ data, onUpdate }: SkillsStepProps) {
  const [skills, setSkills] = useState<string[]>(data || [])
  const [newSkill, setNewSkill] = useState("")

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      const updatedSkills = [...skills, newSkill.trim()]
      setSkills(updatedSkills)
      onUpdate(updatedSkills)
      setNewSkill("")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    const updatedSkills = skills.filter((skill) => skill !== skillToRemove)
    setSkills(updatedSkills)
    onUpdate(updatedSkills)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addSkill()
    }
  }

  // Suggested skills for quick addition
  const suggestedSkills = [
    "JavaScript",
    "React",
    "TypeScript",
    "Node.js",
    "Python",
    "UI/UX Design",
    "Product Management",
    "Data Analysis",
    "Marketing",
    "Leadership",
  ].filter((skill) => !skills.includes(skill))

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <Input
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a skill (e.g., JavaScript, Project Management)"
          className="flex-1"
        />
        <Button type="button" onClick={addSkill} size="icon">
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {skills.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <Badge key={skill} variant="secondary" className="px-3 py-1 text-sm">
              {skill}
              <button
                type="button"
                onClick={() => removeSkill(skill)}
                className="ml-2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove {skill}</span>
              </button>
            </Badge>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground text-sm">No skills added yet. Add skills to showcase your expertise.</p>
      )}

      {suggestedSkills.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Suggested skills:</h3>
          <div className="flex flex-wrap gap-2">
            {suggestedSkills.slice(0, 8).map((skill) => (
              <Badge
                key={skill}
                variant="outline"
                className="cursor-pointer hover:bg-secondary"
                onClick={() => {
                  setNewSkill(skill)
                  addSkill()
                }}
              >
                {skill}
              </Badge>
            ))}
          </div>
        </div>
      )}

      <Button onClick={() => onUpdate(skills)} className="w-full">
        Save & Continue
      </Button>
    </div>
  )
}
