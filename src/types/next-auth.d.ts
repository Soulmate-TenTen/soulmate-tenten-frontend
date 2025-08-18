import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    accessToken?: string;
    refreshToken?: string;
    user: DefaultSession["user"] & {
      id: string;
      newMemberYn?: string;
    };
  }

  interface User extends DefaultUser {
    id: string;
    newMemberYn?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
    newMemberYn?: string;
    id?: string;
    sub?: string;
  }
}

export {};
