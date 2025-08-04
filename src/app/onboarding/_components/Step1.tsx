import { Step1CategoryList, Step1CategoryType } from "@/types/onboarding";
import StepRadioList from "./StepRadioList";
import StepLayout from "./StepLayout";
import { useStepFormStore } from "@/store/useStepFormStore";
import { useState } from "react";

export default function Step1() {
  const { setData, data } = useStepFormStore();
  const [checked, setChecked] = useState<Step1CategoryType | undefined>(data.step1 as Step1CategoryType);

  const handleClick = (value: Step1CategoryType) => {
    setChecked(value);
    setData("step1", value as Step1CategoryType);
  };

  return (
    <StepLayout
      text={
        <>
          당신의 삶에서 가장 중요한 가치
          <br />
          하나는 무엇인가요?
        </>
      }
    >
      <StepRadioList direction="row" list={Step1CategoryList} onClick={handleClick} checked={checked} />
    </StepLayout>
  );
}
