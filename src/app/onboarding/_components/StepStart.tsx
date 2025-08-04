import { useSession } from "next-auth/react";
import Image from "next/image";

export default function StepStart() {
  const { data: session } = useSession();

  return (
    <div className="mt-8">
      {/* 커스텀 애니메이션 정의 */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
        `}
      </style>
      {/* 로고 */}
      <Image className="mb-23" src="/logo.svg" width={80} height={10.34} alt="소울메이트 로고" />

      <div className="flex flex-col justify-between h-[100%]">
        {/* 텍스트 */}
        <div className="font-bold">
          <p className="text-[26px] mb-3">
            반가워요! {session?.user?.name}님의 선택을 <br />
            돕기 위한 간단한 질문이 있어요.
          </p>
          <p className="text-[#BFBFBF]">추후 기준이나 방향성을 재설정할 수 있습니다.</p>
        </div>

        {/* 캐릭터 + 말풍선 */}
        <div className="flex flex-col items-center gap-10">
          <Image src="/onboarding-chat-1.svg" width={208} height={53} alt="저와 함께 시작해볼까요?" />
          <Image className="[animation:float_3s_ease-in-out_infinite]" src="/onboarding-char-1.svg" width={117} height={105} alt="캐릭터" />
        </div>
      </div>

      {/* Spacer 아래 버튼 영역 고려 시 약간의 여백 */}
      <div className="h-[80px]" />
    </div>
  );
}
