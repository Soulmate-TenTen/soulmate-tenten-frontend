"use client";

import { useStepFormStore } from "@/store/useStepFormStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import StepStart from "./_components/StepStart";
import Step1 from "./_components/Step1";
import Step2 from "./_components/Step2";
import Step3 from "./_components/Step3";
import Step4 from "./_components/Step4";
import Step5 from "./_components/Step5";
import StepEnd from "./_components/StepEnd";

export default function Page() {
  const router = useRouter();
  const { step, goNext } = useStepFormStore();

  const getTextByStep = () => {
    if (step === 0) return "시작하기";
    if (step >= 1 && step <= 5) return "다음";
    if (step === 6) return "만나러가기";
    return "";
  };

  useEffect(() => {
    if (step === 7) {
      router.push("/home");
    }
  }, [step]);

  return (
    <div className="h-screen flex flex-col justify-between pt-12">
      {step === 0 && <StepStart />}
      {step === 1 && <Step1 />}
      {step === 2 && <Step2 />}
      {step === 3 && <Step3 />}
      {step === 4 && <Step4 />}
      {step === 5 && <Step5 />}
      {step === 6 && <StepEnd />}

      <button
        className="fixed bottom-14 w-full left-0 right-0 mx-auto max-w-[402px] h-[46px] bg-[#FFFBC0] rounded-3xl text-[#000414] font-bold cursor-pointer"
        onClick={goNext}
      >
        {getTextByStep()}
      </button>
    </div>
  );
}
