import { useSession } from "next-auth/react";
import Image from "next/image";

export default function StepStart() {
  const { data: session } = useSession();

  return (
    <div className="mt-8">
      <Image className="mb-23" src="/logo.svg" width={80} height={10.34} alt="소울메이트 로고" />

      <div className="font-bold">
        <p className="text-[26px] mb-3">
          반가워요! {session?.user?.name}님의 선택을 <br />
          돕기 위한 간단한 질문이 있어요.
        </p>
        <p className="text-[#BFBFBF]">추후 기준이나 방향성을 재설정할 수 있습니다.</p>
      </div>
    </div>
  );
}
