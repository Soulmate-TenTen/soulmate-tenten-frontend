import { StepCategoryType } from "@/types/onboarding";
import clsx from "clsx";

interface ICheckButton<T extends StepCategoryType> {
  text: T;
  onClick: (value: T) => void;
  checked?: boolean;
}

export default function StepRadio<T extends StepCategoryType>({ text, onClick, checked }: ICheckButton<T>) {
  return (
    <div
      className={clsx(
        "flex h-23 border rounded-md items-center justify-center text-[18px] bg-transparent cursor-pointer hover:bg-white hover:text-[#000414]",
        checked ? "font-extrabold bg-white text-[#000414]" : "bg-transparent text-white border-[#4E4E4E]"
      )}
      onClick={() => onClick(text)}
    >
      {text}
    </div>
  );
}
