import { StepCategoryType } from "@/types/onboarding";
import StepRadio from "./StepRadio";

interface IStepRadioList<T extends StepCategoryType> {
  direction: "row" | "column";
  list: T[];
  onClick: (value: T) => void;
  checked?: T;
}

export default function StepRadioList<T extends StepCategoryType>({ direction, list, onClick, checked }: IStepRadioList<T>) {
  const getStyleByDirection = () => {
    return direction === "row" ? "grid grid-cols-2 gap-3" : "flex flex-col gap-3";
  };

  return (
    <div className={getStyleByDirection()}>
      {list.map((value: T) => (
        <StepRadio key={value} text={value} onClick={onClick} checked={checked === value} />
      ))}
    </div>
  );
}
