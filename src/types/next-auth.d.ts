declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null
      image?: string | null
      newMemberYn?: string
      id?: string
    }
  }

  interface User {
    name?: string | null
    image?: string | null
    newMemberYn?: string
    id?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    newMemberYn?: string
    id?: string
  }
}