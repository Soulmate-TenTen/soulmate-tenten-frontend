import { create } from "zustand";
import { devtools } from "zustand/middleware";

type StepData = {
  [step: string]: string | null;
};

interface StepFormState {
  step: number;
  direction: 1 | -1;
  data: StepData;
}

interface StepFormAction {
  setData: (step: string, value: string) => void;
  goNext: () => void;
  goBack: () => void;
  reset: () => void;
}

export const useStepFormStore = create<StepFormState & StepFormAction>()(
  devtools((set, get) => ({
    step: 0,
    direction: 1,
    data: {},

    setData: (step: string, value: string) =>
      set((state) => ({
        data: { ...state.data, [step]: value },
      })),

    goNext: () => {
      const { step, data } = get();

      // 각 step 인덱스에 대응되는 필드명 정의
      const requiredFields = [
        null, // step 0 (시작 페이지): 무조건 통과
        "step1",
        "step2",
        "step3",
        "step4",
        "step5",
      ];

      const currentKey = requiredFields[step];
      // 입력값이 없는 경우: 넘어가지 않음
      if (currentKey && !data[currentKey]) return;

      set({ direction: 1, step: step + 1 });
    },

    goBack: () => {
      if (get().step > 0) {
        set({ direction: -1, step: get().step - 1 });
      }
    },
    reset: () => set({ step: 0, direction: 1, data: {} }),
  }))
);
