import { Step4CategoryList, Step4CategoryType } from "@/types/onboarding";
import StepRadioList from "./StepRadioList";
import StepLayout from "./StepLayout";
import { useStepFormStore } from "@/store/useStepFormStore";
import { useState } from "react";

export default function Step4() {
  const { setData, data } = useStepFormStore();
  const [checked, setChecked] = useState<Step4CategoryType | undefined>(data.step4 as Step4CategoryType);

  const handleClick = (value: Step4CategoryType) => {
    setChecked(value);
    setData("step2", checked as Step4CategoryType);
  };

  return (
    <StepLayout
      text={
        <>
          선택 앞에서 당신이 가장
          <br />
          믿는 건 무엇인가요?
        </>
      }
    >
      <StepRadioList direction="column" list={Step4CategoryList} onClick={handleClick} checked={checked} />
    </StepLayout>
  );
}
