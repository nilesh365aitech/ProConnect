"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"
import { mockSuggestedUsers } from "@/lib/mock-data"

export function SuggestedConnections() {
  const { toast } = useToast()
  const [suggestedUsers, setSuggestedUsers] = useState(mockSuggestedUsers)

  const handleConnect = (userId: string) => {
    setSuggestedUsers(
      suggestedUsers.map((user) => {
        if (user.id === userId) {
          return { ...user, isConnected: true }
        }
        return user
      }),
    )

    toast({
      title: "Connection request sent",
      description: "Your connection request has been sent.",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Suggested Connections</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {suggestedUsers.map((user) => (
          <div key={user.id} className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground truncate">{user.headline}</p>
            </div>
            <Button
              variant={user.isConnected ? "outline" : "default"}
              size="sm"
              onClick={() => handleConnect(user.id)}
              disabled={user.isConnected}
            >
              {user.isConnected ? "Pending" : "Connect"}
            </Button>
          </div>
        ))}
        <Button variant="ghost" className="w-full text-sm">
          Show more
        </Button>
      </CardContent>
    </Card>
  )
}
