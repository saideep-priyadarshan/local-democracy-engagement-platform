import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

// This is a simple demo auth setup - in a real app, you'd use a database
const users = [
  {
    id: "1",
    name: "Rahul Sharma",
    email: "rahul@example.com",
    password: "password123",
    image: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "2",
    name: "Priya Patel",
    email: "priya@example.com",
    password: "password123",
    image: "/placeholder.svg?height=32&width=32",
  },
]

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const user = users.find((user) => user.email === credentials.email)

        if (user && user.password === credentials.password) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
          }
        }

        return null
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub as string
      }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "a-default-secret-for-development-only",
}
