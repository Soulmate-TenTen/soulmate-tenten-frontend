import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    accessToken?: string
    refreshToken?: string
    user: {
      name?: string | null
      image?: string | null
      newMemberYn?: string
      id?: number
    }
  }

  interface User {
    name?: string | null
    image?: string | null
    newMemberYn?: string
    id?: number
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string
    refreshToken?: string
    newMemberYn?: string
    id?: number
  }
}