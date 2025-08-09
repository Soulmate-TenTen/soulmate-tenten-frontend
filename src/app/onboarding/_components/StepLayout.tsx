import { useStepFormStore } from "@/store/useStepFormStore";
import Image from "next/image";
import { ReactNode, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface IStepLayout {
  children: ReactNode;
  text: ReactNode;
}

export default function StepLayout({ children, text }: IStepLayout) {
  const { step, goBack } = useStepFormStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    requestAnimationFrame(() => {
      setProgress((100 * step) / 5);
    });
  }, [step]);

  const handleBackClick = () => {
    const fromMypage = searchParams.get("from") === "mypage";

    if (step === 1 && fromMypage) {
      router.push("/mypage");
    } else {
      goBack();
    }
  };

  return (
    <div className="h-[100svh] sm:h-dvh flex flex-col overflow-hidden mb-2">
      {/* 뒤로 가기 버튼 */}
      <Image className="cursor-pointer" src="/back-icon.svg" width={32} height={32} alt="뒤로" onClick={handleBackClick} />

      {/* progress bar */}
      <div className="mt-5 bg-[#444] rounded-full h-2 mx-2 mb-6">
        <div className="bg-[#fffac4] h-full rounded-full transition-[width] duration-200 ease-in-out" style={{ width: `${progress}%` }} />
      </div>

      <main className="px-4">
        <p className="font-bold text-[22px] text-center my-4">{text}</p>
        {children}
        <div className="h-6" />
      </main>
    </div>
  );
}
