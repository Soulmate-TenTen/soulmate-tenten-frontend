"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import StepStart from "./_components/StepStart";
import Step1 from "./_components/Step1";
import Step2 from "./_components/Step2";
import Step3 from "./_components/Step3";
import Step4 from "./_components/Step4";
import Step5 from "./_components/Step5";
import StepEnd from "./_components/StepEnd";
import { AnimatePresence, motion } from "framer-motion";
import { useStepFormStore } from "@/store/useStepFormStore";
import { saveOnboarding } from "./api";
import { useSession } from "next-auth/react";
import { OnboardingData, Step1CategoryType, Step2CategoryType, Step3CategoryType, Step4CategoryType } from "@/types/onboarding";

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? "-100%" : "100%",
    opacity: 0,
  }),
};

export default function Page() {
  const router = useRouter();
  const { data: session } = useSession();
  const { step, direction, goNext, data } = useStepFormStore();

  const isValidCurrentStep = (() => {
    switch (step) {
      case 0:
        return true;
      case 1:
        return !!data.step1;
      case 2:
        return !!data.step2;
      case 3:
        return !!data.step3;
      case 4:
        return !!data.step4;
      case 5:
        return !!data.step5;
      case 6:
        return true;
      default:
        return false;
    }
  })();

  const isDisabled = !isValidCurrentStep;

  const getTextByStep = () => {
    if (step === 0) return "시작하기";
    if (step >= 1 && step <= 5) return "다음";
    if (step === 6) return "만나러가기";
    return "";
  };

  useEffect(() => {
    if (step === 7) {
      const transformedData: OnboardingData = {
        memberId: session?.user?.id,
        valueAttribute: data.step1 as Step1CategoryType,
        decision: data.step2 as Step2CategoryType,
        regret: data.step3 as Step3CategoryType,
        decisionTrust: data.step4 as Step4CategoryType,
        soulmateType: data.step5 === "이성을 기반으로 해결책을 제시" ? "T" : "F",
      };

      saveOnboarding(transformedData);
      router.push("/");
    }
  }, [step, data.step1, data.step2, data.step3, data.step4, data.step5, router, session?.user?.id]);

  const stepComponents = [
    <StepStart key="step-start" />,
    <Step1 key="step1" />,
    <Step2 key="step2" />,
    <Step3 key="step3" />,
    <Step4 key="step4" />,
    <Step5 key="step5" />,
    <StepEnd key="step-end" />,
  ];

  return (
    <div className="mx-8 h-min-screen flex flex-col justify-between">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={step}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            type: "tween",
            ease: "easeInOut",
            duration: 0.3,
          }}
          className="inset-0 w-full h-full overflow-y-hidden"
        >
          {stepComponents[step]}
          {step === 6 && <StepEnd />}
        </motion.div>
      </AnimatePresence>

      <div className="fixed left-0 right-0 bottom-[calc(env(safe-area-inset-bottom)+16px)] z-50 mb-12">
        <div className="w-full max-w-[402px] mx-auto px-8">
          <button
            className={[
              "w-full h-[56px] rounded-full font-bold transition-colors text-[#000414]",
              !isDisabled && "bg-[#FFFBC0]",
              isDisabled && "bg-[#6C6C6C] cursor-not-allowed",
            ].join(" ")}
            onClick={goNext}
          >
            {getTextByStep()}
          </button>
        </div>
      </div>
    </div>
  );
}
