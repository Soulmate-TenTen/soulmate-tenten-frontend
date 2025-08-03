import Image from "next/image";

export default function StepEnd() {
  return (
    <div className="mt-8">
      <Image className="mb-23" src="/logo.svg" width={80} height={10.34} alt="소울메이트 로고" />

      <div className="font-bold">
        <p className="text-[26px] mb-3">
          후회에 작별을 고하고,
          <br />
          선택에 확신을 더하세요.
        </p>
      </div>
    </div>
  );
}
