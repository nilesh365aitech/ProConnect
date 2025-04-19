import type { Post, Job, Conversation } from "@/lib/types"

export const mockPosts: Post[] = [
  {
    id: "post-1",
    author: {
      id: "user-2",
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=100&width=100",
      headline: "Product Manager at TechCorp",
    },
    content:
      "Just launched our new product feature! It's been months in the making, and I'm so proud of the team for their hard work and dedication. Check it out and let me know what you think!",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    likes: 42,
    comments: [
      {
        id: "comment-1",
        author: {
          id: "user-3",
          name: "Michael Chen",
          avatar: "/placeholder.svg?height=100&width=100",
        },
        content: "Congratulations! The new feature looks amazing.",
        timestamp: new Date(Date.now() - 1800000).toISOString(),
      },
      {
        id: "comment-2",
        author: {
          id: "user-4",
          name: "Emily Rodriguez",
          avatar: "/placeholder.svg?height=100&width=100",
        },
        content: "Great work! I've been waiting for this.",
        timestamp: new Date(Date.now() - 900000).toISOString(),
      },
    ],
    shares: 12,
    isLiked: false,
  },
  {
    id: "post-2",
    author: {
      id: "user-5",
      name: "David Wilson",
      avatar: "/placeholder.svg?height=100&width=100",
      headline: "Software Engineer at InnovateTech",
    },
    content:
      "I'm excited to share that I've just completed the Advanced React certification! It was a challenging journey, but I learned so much along the way. Looking forward to applying these skills to my next project.",
    image: "/placeholder.svg?height=400&width=600",
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    likes: 78,
    comments: [
      {
        id: "comment-3",
        author: {
          id: "user-6",
          name: "Jessica Lee",
          avatar: "/placeholder.svg?height=100&width=100",
        },
        content: "Congratulations! That's a great achievement.",
        timestamp: new Date(Date.now() - 43200000).toISOString(),
      },
    ],
    shares: 5,
    isLiked: true,
  },
  {
    id: "post-3",
    author: {
      id: "user-7",
      name: "Robert Brown",
      avatar: "/placeholder.svg?height=100&width=100",
      headline: "Marketing Director at GrowthCo",
    },
    content:
      "I'm looking for recommendations on the best marketing automation tools for a mid-sized B2B company. What has worked well for you? Any tools to avoid?",
    timestamp: new Date(Date.now() - 172800000).toISOString(),
    likes: 15,
    comments: [],
    shares: 2,
    isLiked: false,
  },
]

export const mockJobs: Job[] = [
  {
    id: "job-1",
    title: "Senior Frontend Developer",
    company: "TechCorp",
    companyLogo: "/placeholder.svg?height=100&width=100",
    location: "San Francisco, CA (Remote)",
    description:
      "We are looking for a Senior Frontend Developer to join our team. You will be responsible for building user interfaces for our web applications using React and TypeScript.",
    requirements: [
      "5+ years of experience with JavaScript and frontend frameworks",
      "3+ years of experience with React",
      "Experience with TypeScript",
      "Experience with state management libraries (Redux, MobX, etc.)",
      "Strong understanding of web standards and best practices",
    ],
    benefits: [
      "Competitive salary and equity",
      "Health, dental, and vision insurance",
      "Unlimited PTO",
      "Remote-first culture",
      "Professional development budget",
    ],
    salary: "$120,000 - $160,000 / year",
    tags: ["Remote", "Full-time", "React", "TypeScript"],
    postedDate: new Date(Date.now() - 604800000).toISOString(),
    deadline: "June 30, 2023",
  },
  {
    id: "job-2",
    title: "Product Manager",
    company: "InnovateTech",
    companyLogo: "/placeholder.svg?height=100&width=100",
    location: "New York, NY",
    description:
      "We are seeking a Product Manager to lead the development of our flagship product. You will work closely with engineering, design, and marketing teams to define product strategy and roadmap.",
    requirements: [
      "3+ years of experience in product management",
      "Experience with agile development methodologies",
      "Strong analytical and problem-solving skills",
      "Excellent communication and leadership abilities",
      "Technical background preferred",
    ],
    benefits: [
      "Competitive salary and bonus",
      "Comprehensive benefits package",
      "Flexible work arrangements",
      "Career advancement opportunities",
      "Modern office in downtown NYC",
    ],
    salary: "$110,000 - $140,000 / year",
    tags: ["On-site", "Full-time", "Product Management"],
    postedDate: new Date(Date.now() - 1209600000).toISOString(),
    deadline: "July 15, 2023",
  },
  {
    id: "job-3",
    title: "UX/UI Designer",
    company: "DesignHub",
    companyLogo: "/placeholder.svg?height=100&width=100",
    location: "Remote",
    description:
      "DesignHub is looking for a talented UX/UI Designer to create beautiful and functional user interfaces for our clients. You will collaborate with product managers and developers to deliver exceptional user experiences.",
    requirements: [
      "Portfolio demonstrating strong UI/UX skills",
      "Experience with design tools (Figma, Sketch, Adobe XD)",
      "Understanding of user-centered design principles",
      "Ability to create wireframes, prototypes, and high-fidelity designs",
      "Knowledge of accessibility standards",
    ],
    benefits: ["Competitive pay", "Health benefits", "Flexible hours", "Remote work", "Creative environment"],
    salary: "$90,000 - $120,000 / year",
    tags: ["Remote", "Full-time", "Design", "Figma"],
    postedDate: new Date(Date.now() - 432000000).toISOString(),
    deadline: "July 5, 2023",
  },
  {
    id: "job-4",
    title: "Data Analyst",
    company: "DataCo",
    companyLogo: "/placeholder.svg?height=100&width=100",
    location: "Chicago, IL (Hybrid)",
    description:
      "Join our data team to help analyze and interpret complex data sets. You will work on creating reports, dashboards, and insights that drive business decisions.",
    requirements: [
      "Bachelor's degree in Statistics, Mathematics, or related field",
      "Experience with SQL and data visualization tools",
      "Proficiency in Excel and data analysis",
      "Strong analytical and critical thinking skills",
      "Excellent communication abilities",
    ],
    benefits: [
      "Competitive salary",
      "401(k) matching",
      "Health insurance",
      "Hybrid work model",
      "Professional development opportunities",
    ],
    salary: "$70,000 - $90,000 / year",
    tags: ["Hybrid", "Full-time", "Entry-level", "Data"],
    postedDate: new Date(Date.now() - 864000000).toISOString(),
    deadline: "June 25, 2023",
  },
  {
    id: "job-5",
    title: "Marketing Coordinator",
    company: "GrowthCo",
    companyLogo: "/placeholder.svg?height=100&width=100",
    location: "Austin, TX",
    description:
      "We're looking for a Marketing Coordinator to support our marketing team in executing campaigns, managing social media, and analyzing performance metrics.",
    requirements: [
      "1-3 years of marketing experience",
      "Familiarity with social media platforms and analytics",
      "Strong writing and communication skills",
      "Experience with email marketing tools",
      "Ability to work in a fast-paced environment",
    ],
    benefits: [
      "Competitive salary",
      "Health and wellness benefits",
      "Flexible schedule",
      "Professional development budget",
      "Fun company culture",
    ],
    salary: "$50,000 - $65,000 / year",
    tags: ["On-site", "Full-time", "Entry-level", "Marketing"],
    postedDate: new Date(Date.now() - 345600000).toISOString(),
    deadline: "July 10, 2023",
  },
  {
    id: "job-6",
    title: "Backend Developer",
    company: "ServerStack",
    companyLogo: "/placeholder.svg?height=100&width=100",
    location: "Remote",
    description:
      "We are looking for a Backend Developer to build and maintain our server infrastructure. You will work with our team to design and implement APIs, database schemas, and server-side logic.",
    requirements: [
      "3+ years of experience in backend development",
      "Proficiency in Node.js, Python, or Java",
      "Experience with databases (SQL and NoSQL)",
      "Knowledge of RESTful APIs and microservices",
      "Understanding of cloud services (AWS, Azure, or GCP)",
    ],
    benefits: [
      "Competitive salary",
      "Remote work",
      "Flexible hours",
      "Health insurance",
      "Learning and development budget",
    ],
    salary: "$100,000 - $130,000 / year",
    tags: ["Remote", "Full-time", "Backend", "Node.js"],
    postedDate: new Date(Date.now() - 518400000).toISOString(),
    deadline: "July 20, 2023",
  },
]

export const mockSuggestedUsers = [
  {
    id: "user-10",
    name: "Alex Thompson",
    avatar: "/placeholder.svg?height=100&width=100",
    headline: "Software Engineer at Google",
    isConnected: false,
  },
  {
    id: "user-11",
    name: "Priya Patel",
    avatar: "/placeholder.svg?height=100&width=100",
    headline: "Product Designer at Airbnb",
    isConnected: false,
  },
  {
    id: "user-12",
    name: "James Wilson",
    avatar: "/placeholder.svg?height=100&width=100",
    headline: "Marketing Manager at Spotify",
    isConnected: false,
  },
  {
    id: "user-13",
    name: "Sophia Garcia",
    avatar: "/placeholder.svg?height=100&width=100",
    headline: "Data Scientist at Netflix",
    isConnected: false,
  },
  {
    id: "user-14",
    name: "Marcus Johnson",
    avatar: "/placeholder.svg?height=100&width=100",
    headline: "Frontend Developer at Amazon",
    isConnected: false,
  },
]

export const mockConversations: Conversation[] = [
  {
    id: "conv-1",
    user: {
      id: "user-10",
      name: "Alex Thompson",
      avatar: "/placeholder.svg?height=100&width=100",
      headline: "Software Engineer at Google",
    },
    messages: [
      {
        id: "msg-1",
        content:
          "Hi there! I saw your profile and I'm impressed with your work. Would you be interested in connecting?",
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        isFromMe: false,
      },
      {
        id: "msg-2",
        content: "Thanks, Alex! I'd be happy to connect. What kind of projects are you working on currently?",
        timestamp: new Date(Date.now() - 82800000).toISOString(),
        isFromMe: true,
      },
      {
        id: "msg-3",
        content: "I'm working on a new recommendation algorithm for our search product. It's challenging but exciting!",
        timestamp: new Date(Date.now() - 79200000).toISOString(),
        isFromMe: false,
      },
    ],
    lastMessage: "I'm working on a new recommendation algorithm for our search product. It's challenging but exciting!",
    lastMessageTime: new Date(Date.now() - 79200000).toISOString(),
  },
  {
    id: "conv-2",
    user: {
      id: "user-11",
      name: "Priya Patel",
      avatar: "/placeholder.svg?height=100&width=100",
      headline: "Product Designer at Airbnb",
    },
    messages: [
      {
        id: "msg-4",
        content:
          "Hello! I'm organizing a design workshop next month and would love to have you join as a speaker. Would you be interested?",
        timestamp: new Date(Date.now() - 172800000).toISOString(),
        isFromMe: false,
      },
      {
        id: "msg-5",
        content: "Hi Priya, that sounds interesting! Could you share more details about the workshop?",
        timestamp: new Date(Date.now() - 169200000).toISOString(),
        isFromMe: true,
      },
    ],
    lastMessage: "Hi Priya, that sounds interesting! Could you share more details about the workshop?",
    lastMessageTime: new Date(Date.now() - 169200000).toISOString(),
  },
  {
    id: "conv-3",
    user: {
      id: "user-12",
      name: "James Wilson",
      avatar: "/placeholder.svg?height=100&width=100",
      headline: "Marketing Manager at Spotify",
    },
    messages: [
      {
        id: "msg-6",
        content:
          "Hey, I noticed you have experience with content marketing. I'm looking to improve our strategy and would love to get your insights.",
        timestamp: new Date(Date.now() - 259200000).toISOString(),
        isFromMe: false,
      },
    ],
    lastMessage:
      "Hey, I noticed you have experience with content marketing. I'm looking to improve our strategy and would love to get your insights.",
    lastMessageTime: new Date(Date.now() - 259200000).toISOString(),
  },
]
