"use client";

import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import usePost from "@/lib/usePost";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Eye, FileText, Hash, Calendar } from "lucide-react";
import AllPostThemes from "@/lib/all-post-themes";
import { useUser } from "@/lib/useUser";

// Sample posts data
const samplePosts = [
  {
    id: 1,
    title: "Building Interactive Forms with Formik in React",
    description:
      "📋 Formik is a powerful library for handling forms in React. It simplifies form validation, submission, and state management, making it easy to build interactive and user-friendly forms.",
    hashtags: [
      "JavaScript",
      "React",
      "Formik",
      "Forms",
      "webdev",
      "frontend",
      "development",
    ],
    content: [
      {
        name: "Introduction to Formik",
        description:
          "📋 Formik is a popular library for managing form state in React applications. It helps you handle form validation, submission, and state management efficiently.",
        codeLang: "none",
        code: "",
      },
      {
        name: "Installing Formik",
        description:
          "📥 Start by installing Formik in your React project using npm or yarn.",
        codeLang: "bash",
        code: "npm install formik\n# or\nyarn add formik",
      },
    ],
    createdAt: "2024-01-15",
  },
  {
    id: 2,
    title: "Mastering CSS Grid Layout for Modern Web Design",
    description:
      "🎨 CSS Grid is a powerful layout system that allows you to create complex, responsive designs with ease. Learn how to leverage CSS Grid for modern web applications.",
    hashtags: [
      "CSS",
      "WebDesign",
      "Grid",
      "Frontend",
      "WebDev",
      "Responsive",
      "Layout",
    ],
    content: [
      {
        name: "Understanding CSS Grid Basics",
        description:
          "🏗️ CSS Grid provides a two-dimensional layout system, perfect for creating complex designs.",
        codeLang: "css",
        code: ".container {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  grid-gap: 20px;\n}",
      },
      {
        name: "Creating Responsive Grids",
        description:
          "📱 Make your grids responsive using auto-fit and minmax functions.",
        codeLang: "css",
        code: ".responsive-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));\n  gap: 1rem;\n}",
      },
    ],
    createdAt: "2024-01-20",
  },
  {
    id: 3,
    title: "Getting Started with Node.js and Express",
    description:
      "🚀 Node.js and Express form a powerful combination for building server-side applications. Learn the fundamentals of creating REST APIs and web servers.",
    hashtags: [
      "NodeJS",
      "Express",
      "JavaScript",
      "Backend",
      "API",
      "WebDev",
      "Server",
    ],
    content: [
      {
        name: "Setting up Express Server",
        description:
          "⚡ Create a basic Express server to handle HTTP requests.",
        codeLang: "javascript",
        code: "const express = require('express');\nconst app = express();\n\napp.get('/', (req, res) => {\n  res.send('Hello World!');\n});\n\napp.listen(3000, () => {\n  console.log('Server running on port 3000');\n});",
      },
    ],
    createdAt: "2024-01-25",
  },
  {
    id: 4,
    title: "Python Data Analysis with Pandas",
    description:
      "🐼 Pandas is an essential library for data analysis in Python. Discover how to manipulate, analyze, and visualize data efficiently.",
    hashtags: [
      "Python",
      "Pandas",
      "DataAnalysis",
      "DataScience",
      "Programming",
      "Analytics",
    ],
    content: [
      {
        name: "Loading Data with Pandas",
        description:
          "📊 Learn how to load and explore datasets using Pandas DataFrames.",
        codeLang: "python",
        code: "import pandas as pd\n\n# Load CSV file\ndf = pd.read_csv('data.csv')\n\n# Display basic info\nprint(df.head())\nprint(df.info())\nprint(df.describe())",
      },
    ],
    createdAt: "2024-02-01",
  },
  {
    id: 5,
    title: "TypeScript Best Practices for Large Applications",
    description:
      "🔷 TypeScript brings type safety to JavaScript. Learn best practices for structuring and maintaining large TypeScript applications.",
    hashtags: [
      "TypeScript",
      "JavaScript",
      "WebDev",
      "BestPractices",
      "Programming",
      "Development",
    ],
    content: [
      {
        name: "Type Definitions",
        description:
          "🏷️ Create clear and maintainable type definitions for your application.",
        codeLang: "typescript",
        code: "interface User {\n  id: number;\n  name: string;\n  email: string;\n  role: 'admin' | 'user' | 'moderator';\n}\n\ntype ApiResponse<T> = {\n  data: T;\n  success: boolean;\n  message?: string;\n};",
      },
    ],
    createdAt: "2024-02-05",
  },
  {
    id: 6,
    title: "Docker Containerization for Modern Development",
    description:
      "🐳 Docker revolutionizes application deployment and development workflows. Learn how to containerize your applications for consistent, scalable, and portable solutions.",
    hashtags: [
      "Docker",
      "DevOps",
      "Containerization",
      "Deployment",
      "Infrastructure",
      "CloudComputing",
      "Development",
    ],
    content: [
      {
        name: "Docker Fundamentals",
        description:
          "🚢 Docker containers package applications with all their dependencies, ensuring consistent behavior across different environments.",
        codeLang: "dockerfile",
        code: "# Basic Dockerfile example\nFROM node:18-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci --only=production\nCOPY . .\nEXPOSE 3000\nCMD [\"npm\", \"start\"]",
      },
      {
        name: "Docker Compose for Multi-Service Apps",
        description:
          "🔧 Use Docker Compose to manage multi-container applications with ease.",
        codeLang: "yaml",
        code: "version: '3.8'\nservices:\n  app:\n    build: .\n    ports:\n      - '3000:3000'\n    environment:\n      - NODE_ENV=production\n  db:\n    image: postgres:15\n    environment:\n      - POSTGRES_DB=myapp",
      },
      {
        name: "Container Best Practices",
        description:
          "💡 Follow these essential practices for secure, efficient, and maintainable Docker containers.",
        codeLang: "",
        code: "",
      },
    ],
    createdAt: "2024-02-10",
  },
];

// Preview component for themed posts
function ThemedPostPreview({ post, themeIndex }: { post: any; themeIndex: number }) {
  const theme = AllPostThemes[themeIndex % AllPostThemes.length];
  
  return (
    <div className="w-full h-48 overflow-hidden rounded-t-lg relative bg-gray-100 dark:bg-gray-800">
      {/* Show the demo image for the theme */}
      <Image
        src={theme.demoUrl}
        alt={`${theme.title} preview`}
        fill
        className="object-cover"
      />
      
      {/* Theme name overlay */}
      <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
        {theme.title}
      </div>
      
      {/* Post title overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
        <h4 className="text-white text-sm font-medium line-clamp-2 leading-tight">
          {post.title}
        </h4>
      </div>
    </div>
  );
}

export default function ExplorePage() {
  const { setContentObject, contentObject } = usePost();
  const { setName, setUsername, setProfilePic } = useUser();
  const router = useRouter();

  const handleUsePost = (post: any, themeIndex: number) => {
    // Set dummy user data for preview if not set
    if (!contentObject) {
      setName("John Doe");
      setUsername("johndoe");
      setProfilePic("/dummyData/profilePic.jpg");
    }
    
    // Set the selected theme based on the post's theme
    const selectedTheme = AllPostThemes[themeIndex % AllPostThemes.length];
    if (typeof window !== "undefined") {
      localStorage.setItem("activePostTheme", selectedTheme.name);
    }
    
    setContentObject(post);
    router.push("/post-editor");
  };

  return (
    <main className="min-h-screen">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Explore Posts</h1>
            <p className="text-muted-foreground">
              Discover and use sample posts to create your own LinkedIn content
            </p>
          </div>
          <Link href="/">
            <Button variant="outline">Back to Home</Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {samplePosts.map((post, index) => (
            <div key={post.id} className="rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-lg transition-shadow overflow-hidden">
              {/* Theme Preview */}
              <ThemedPostPreview post={post} themeIndex={index} />
              
              {/* Post Details */}
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="line-clamp-2 text-base font-semibold leading-tight">
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(post.createdAt).toLocaleDateString()}
                  </div>
                </div>
                
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {post.description}
                </p>
                
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <FileText className="h-3 w-3" />
                  {post.content.length} sections
                </div>

                <div className="flex flex-wrap gap-1">
                  {post.hashtags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-md text-xs"
                    >
                      <Hash className="h-2 w-2" />
                      {tag}
                    </span>
                  ))}
                  {post.hashtags.length > 2 && (
                    <span className="text-xs text-muted-foreground px-2 py-1">
                      +{post.hashtags.length - 2}
                    </span>
                  )}
                </div>

                <Button
                  onClick={() => handleUsePost(post, index)}
                  className="w-full"
                  size="sm"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Use This Theme & Post
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-accent p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Want to create your own?</h2>
            <p className="text-muted-foreground mb-4">
              Start creating your unique LinkedIn posts with our AI-powered generator
            </p>
            <Link href="/post-editor">
              <Button>Create New Post</Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}