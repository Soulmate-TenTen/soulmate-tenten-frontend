import { Step5CategoryList, Step5CategoryType } from "@/types/onboarding";
import StepRadioList from "./StepRadioList";
import StepLayout from "./StepLayout";
import { useStepFormStore } from "@/store/useStepFormStore";
import { useState } from "react";

export default function Step5() {
  const { setData } = useStepFormStore();
  const [checked, setChecked] = useState<Step5CategoryType | undefined>(undefined);

  const handleClick = (value: Step5CategoryType) => {
    setChecked(value);
    setData("step2", checked as Step5CategoryType);
  };

  return (
    <StepLayout text={<>나의 소울메이트의 성격은?</>}>
      <StepRadioList direction="column" list={Step5CategoryList} onClick={handleClick} checked={checked} />
    </StepLayout>
  );
}
