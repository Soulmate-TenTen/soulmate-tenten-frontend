import Image from "next/image";

export default function StepEnd() {
  return (
    <div className="mt-8">
      {/* 커스텀 애니메이션 정의 */}
      <style>
        {`
          @keyframes swayX {
            0%, 100% {
              transform: translateX(0);
            }
            50% {
              transform: translateX(10px);
            }
          }
        `}
      </style>

      {/* 로고 */}
      <Image className="mb-23" src="/logo.svg" width={80} height={10.34} alt="소울메이트 로고" />

      <div className="flex flex-col justify-between h-[100%]">
        {/* 텍스트 */}
        <div className="font-bold">
          <p className="text-[26px] mb-3">
            후회에 작별을 고하고,
            <br />
            선택에 확신을 더하세요.
          </p>
        </div>

        {/* 캐릭터 + 말풍선*/}
        <div className="flex flex-col items-end gap-2">
          <Image src="/onboarding-chat-2.svg" width={274} height={56} alt="지금 이 선택부터, 소울메이트와 함께해요" />
          <Image className="[animation:swayX_2s_ease-in-out_infinite]" src="/onboarding-char-2.svg" width={150} height={130} alt="캐릭터" />
        </div>
      </div>

      {/* Spacer 아래 버튼 영역 고려 시 약간의 여백 */}
      <div className="h-[80px]" />
    </div>
  );
}
