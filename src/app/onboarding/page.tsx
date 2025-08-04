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
  const { step, direction, goNext } = useStepFormStore();

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
    <div className="mx-8 h-screen flex flex-col justify-between pt-12">
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
          className="inset-0 w-full h-full overflow-hidden"
        >
          {stepComponents[step]}
          {step === 6 && <StepEnd />}
        </motion.div>
      </AnimatePresence>

      <div className="w-full max-w-[402px] mx-auto mb-14">
        <button className="w-full h-[46px] bg-[#FFFBC0] rounded-3xl text-[#000414] font-bold" onClick={goNext}>
          {getTextByStep()}
        </button>
      </div>
    </div>
  );
}
