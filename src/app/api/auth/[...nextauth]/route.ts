import NextAuth, { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";
import Kakao from "next-auth/providers/kakao";
import { getSession } from "next-auth/react";

const authOptions = {
  providers: [
    Kakao({
      clientId: process.env.AUTH_KAKAO_ID!,
      clientSecret: process.env.AUTH_KAKAO_SECRET!,
    }),
  ],
  pages: {
    signIn: "/login",
    signOut: "/login"
  },
  callbacks: {
    async signIn({ user }: { user: User }) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: user.name
        })
      });
      if (response.ok) {
        const data = await response.json();
        user.newMemberYn = data.newMemberYn;
      }
      return true;
    },
    async redirect({ url, baseUrl }: { url: string, baseUrl: string }) {
      if (url.startsWith(baseUrl)) {
        const session = await getSession();
        if (session?.user?.newMemberYn === 'Y') {
          return `${baseUrl}/onboarding`;
        } else {
          return `${baseUrl}/`;
        }
      }
      return url;
    },
    async session({ session, token }: { session: Session, token: JWT }) {
      if (token.newMemberYn) {
        session.user.newMemberYn = token.newMemberYn;
      }
      return session;
    },
    async jwt({ token, user }: { token: JWT, user: User }) {
      if (user?.newMemberYn) {
        token.newMemberYn = user.newMemberYn;
      }
      return token;
    }
  },
};

const handler = NextAuth(authOptions);

export const GET = handler;
export const POST = handler;

// 캐싱 문제 방지용 옵션
export const dynamic = "force-dynamic";
