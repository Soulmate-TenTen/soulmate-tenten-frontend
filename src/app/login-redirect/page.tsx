"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginRedirect() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      // 세션에서 신규회원 여부 판단
      const newMemberYn = session?.user?.newMemberYn;
      if (newMemberYn === "Y") {
        router.replace("/onboarding");
      } else {
        router.replace("/");
      }
    }
  }, [session, status, router]);

  return <div></div>;
}
