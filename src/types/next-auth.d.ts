import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null
      image?: string | null
      newMemberYn?: string
    }
  }

  interface User {
    name?: string | null
    image?: string | null
    newMemberYn?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    newMemberYn?: string
  }
}