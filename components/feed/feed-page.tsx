"use client"

import { useState, useEffect } from "react"
import type { Post } from "@/lib/types"
import { PostCard } from "@/components/feed/post-card"
import { SuggestedConnections } from "@/components/feed/suggested-connections"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ImageIcon, Link, Smile } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface FeedPageProps {
  initialPosts: Post[]
}

export function FeedPage({ initialPosts }: FeedPageProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts)
  const [newPostContent, setNewPostContent] = useState("")
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const userData = localStorage.getItem("proconnect-user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const handleCreatePost = () => {
    if (!newPostContent.trim()) return

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      const newPost: Post = {
        id: `post-${Date.now()}`,
        author: {
          id: user?.id || "user-1",
          name: user?.name || "John Doe",
          avatar: user?.avatar || "/placeholder.svg?height=100&width=100",
          headline: user?.headline || "Professional",
        },
        content: newPostContent,
        timestamp: new Date().toISOString(),
        likes: 0,
        comments: [],
        shares: 0,
        isLiked: false,
      }

      setPosts([newPost, ...posts])
      setNewPostContent("")
      setIsLoading(false)

      toast({
        title: "Post created",
        description: "Your post has been published to your network.",
      })
    }, 1000)
  }

  const handleLikePost = (postId: string) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            isLiked: !post.isLiked,
          }
        }
        return post
      }),
    )
  }

  const handleAddComment = (postId: string, comment: string) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [
              ...post.comments,
              {
                id: `comment-${Date.now()}`,
                author: {
                  id: user?.id || "user-1",
                  name: user?.name || "John Doe",
                  avatar: user?.avatar || "/placeholder.svg?height=100&width=100",
                },
                content: comment,
                timestamp: new Date().toISOString(),
              },
            ],
          }
        }
        return post
      }),
    )
  }

  const handleSharePost = (postId: string) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            shares: post.shares + 1,
          }
        }
        return post
      }),
    )

    toast({
      title: "Post shared",
      description: "The post has been shared with your network.",
    })
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Create post card */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <Avatar>
                  <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
                  <AvatarFallback>{user?.name ? user.name.charAt(0).toUpperCase() : "U"}</AvatarFallback>
                </Avatar>
                <Textarea
                  placeholder="What's on your mind?"
                  className="resize-none"
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">
                  <ImageIcon className="h-4 w-4 mr-2" />
                  Photo
                </Button>
                <Button variant="ghost" size="sm">
                  <Link className="h-4 w-4 mr-2" />
                  Link
                </Button>
                <Button variant="ghost" size="sm">
                  <Smile className="h-4 w-4 mr-2" />
                  Feeling
                </Button>
              </div>
              <Button onClick={handleCreatePost} disabled={!newPostContent.trim() || isLoading}>
                {isLoading ? "Posting..." : "Post"}
              </Button>
            </CardFooter>
          </Card>

          {/* Posts feed */}
          <div className="space-y-6">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onLike={() => handleLikePost(post.id)}
                onComment={handleAddComment}
                onShare={() => handleSharePost(post.id)}
              />
            ))}

            {/* Load more button */}
            <div className="flex justify-center">
              <Button variant="outline">Load More</Button>
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="hidden lg:block space-y-6">
          <SuggestedConnections />
        </div>
      </div>
    </div>
  )
}
