"use client"

import { useState } from "react"
import { formatDistanceToNow } from "date-fns"
import type { Post } from "@/lib/types"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Heart, MessageCircle, Share2 } from "lucide-react"

interface PostCardProps {
  post: Post
  onLike: () => void
  onComment: (postId: string, comment: string) => void
  onShare: () => void
}

export function PostCard({ post, onLike, onComment, onShare }: PostCardProps) {
  const [showComments, setShowComments] = useState(false)
  const [newComment, setNewComment] = useState("")

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      onComment(post.id, newComment)
      setNewComment("")
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-start gap-4 pb-2">
        <Avatar>
          <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
          <AvatarFallback>{post.author.name.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="font-semibold">{post.author.name}</div>
          <div className="text-sm text-muted-foreground">{post.author.headline}</div>
          <div className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(post.timestamp), { addSuffix: true })}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="whitespace-pre-line">{post.content}</p>
        {post.image && (
          <div className="mt-4">
            <img src={post.image || "/placeholder.svg"} alt="Post attachment" className="rounded-md max-h-96 w-auto" />
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col">
        <div className="flex justify-between w-full text-sm text-muted-foreground mb-2">
          <span>{post.likes} likes</span>
          <span>
            {post.comments.length} comments • {post.shares} shares
          </span>
        </div>
        <div className="flex justify-between w-full border-t border-b py-1">
          <Button variant="ghost" size="sm" className={`flex-1 ${post.isLiked ? "text-primary" : ""}`} onClick={onLike}>
            <Heart className={`h-4 w-4 mr-2 ${post.isLiked ? "fill-primary" : ""}`} />
            Like
          </Button>
          <Button variant="ghost" size="sm" className="flex-1" onClick={() => setShowComments(!showComments)}>
            <MessageCircle className="h-4 w-4 mr-2" />
            Comment
          </Button>
          <Button variant="ghost" size="sm" className="flex-1" onClick={onShare}>
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>

        {showComments && (
          <div className="w-full mt-4 space-y-4">
            {post.comments.map((comment) => (
              <div key={comment.id} className="flex gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={comment.author.avatar || "/placeholder.svg"} alt={comment.author.name} />
                  <AvatarFallback>{comment.author.name.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="bg-muted p-2 rounded-md">
                    <div className="font-semibold text-sm">{comment.author.name}</div>
                    <p className="text-sm">{comment.content}</p>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {formatDistanceToNow(new Date(comment.timestamp), { addSuffix: true })}
                  </div>
                </div>
              </div>
            ))}

            <div className="flex gap-2 mt-4">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Your avatar" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div className="flex-1 flex gap-2">
                <Textarea
                  placeholder="Write a comment..."
                  className="resize-none min-h-[40px] text-sm"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSubmitComment()
                    }
                  }}
                />
                <Button size="sm" onClick={handleSubmitComment} disabled={!newComment.trim()}>
                  Post
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}
