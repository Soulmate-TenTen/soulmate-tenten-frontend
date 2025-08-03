import { create } from "zustand";
import { devtools } from "zustand/middleware";

type StepData = {
  [step: string]: string | null;
};

interface StepFormState {
  step: number;
  data: StepData;
}

interface StepFormAction {
  goBack: () => void;
  goNext: () => void;
  setData: (step: string, value: string) => void;
  reset: () => void;
}

export const useStepFormStore = create<StepFormState & StepFormAction>()(
  devtools((set, get) => ({
    step: 0,
    data: {},

    goBack: () => {
      const currentStep = get().step;
      if (currentStep > 0) {
        set({ step: currentStep - 1 });
      }
    },
    goNext: () => set({ step: get().step + 1 }),

    setData: (step: string, value: string) =>
      set((state) => ({
        data: { ...state.data, [step]: value },
      })),
    reset: () => set({ data: {} }),
  }))
);
