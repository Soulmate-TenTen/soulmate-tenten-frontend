import { useStepFormStore } from "@/store/useStepFormStore";
import Image from "next/image";
import { ReactNode } from "react";

interface IStepLayout {
  children: ReactNode;
  text: ReactNode;
}

export default function StepLayout({ children, text }: IStepLayout) {
  const { step, goBack } = useStepFormStore();

  return (
    <div className="mt-2">
      <Image className="cursor-pointer" src="/back-icon.svg" width={32} height={32} alt="뒤로" onClick={goBack} />

      <div className="mt-5 w-full bg-[#444] rounded-full h-2 overflow-hidden mx-2 mb-[15%]">
        <div className="bg-[#fffac4] h-2 rounded-full" style={{ width: `${(100 * step) / 5}%` }} />
      </div>
      <p className="text-bold text-[22px] text-center mb-14">{text}</p>
      {children}
    </div>
  );
}
