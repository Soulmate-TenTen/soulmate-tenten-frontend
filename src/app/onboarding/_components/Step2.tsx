import { Step2CategoryList, Step2CategoryType } from "@/types/onboarding";
import StepRadioList from "./StepRadioList";
import StepLayout from "./StepLayout";
import { useStepFormStore } from "@/store/useStepFormStore";
import { useState } from "react";

export default function Step2() {
  const { setData, data } = useStepFormStore();
  const [checked, setChecked] = useState<Step2CategoryType | undefined>(data.step2 as Step2CategoryType);

  const handleClick = (value: Step2CategoryType) => {
    setChecked(value);
    setData("step2", checked as Step2CategoryType);
  };

  return (
    <StepLayout
      text={
        <>
          결정을 내릴 때
          <br />
          어떤 편에 가까운가요?
        </>
      }
    >
      <StepRadioList direction="column" list={Step2CategoryList} onClick={handleClick} checked={checked} />
    </StepLayout>
  );
}
