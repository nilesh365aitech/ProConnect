export interface User {
  id: string
  name: string
  avatar: string
  headline?: string
}

export interface Comment {
  id: string
  author: User
  content: string
  timestamp: string
}

export interface Post {
  id: string
  author: User
  content: string
  image?: string
  timestamp: string
  likes: number
  comments: Comment[]
  shares: number
  isLiked: boolean
}

export interface Job {
  id: string
  title: string
  company: string
  companyLogo?: string
  location: string
  description: string
  requirements: string[]
  benefits: string[]
  salary: string
  tags: string[]
  postedDate: string
  deadline: string
}

export interface Message {
  id: string
  content: string
  timestamp: string
  isFromMe: boolean
}

export interface Conversation {
  id: string
  user: User
  messages: Message[]
  lastMessage: string
  lastMessageTime: string
}
