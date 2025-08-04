import { Step3CategoryList, Step3CategoryType } from "@/types/onboarding";
import StepRadioList from "./StepRadioList";
import StepLayout from "./StepLayout";
import { useStepFormStore } from "@/store/useStepFormStore";
import { useState } from "react";

export default function Step3() {
  const { setData, data } = useStepFormStore();
  const [checked, setChecked] = useState<Step3CategoryType | undefined>(data.step3 as Step3CategoryType);

  const handleClick = (value: Step3CategoryType) => {
    setChecked(value);
    setData("step3", checked as Step3CategoryType);
  };

  return (
    <StepLayout
      text={
        <>
          후회할 때 가장 많이
          <br />
          하는 생각은 무엇인가요?
        </>
      }
    >
      <StepRadioList direction="column" list={Step3CategoryList} onClick={handleClick} checked={checked} />
    </StepLayout>
  );
}
