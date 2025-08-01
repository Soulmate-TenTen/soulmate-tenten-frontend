import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface ExampleState {
  activity: string;
}

interface ExampleAction {
  setActivity: (activity: string) => void;
}

export const useExampleStore = create<ExampleState & ExampleAction>()(
  devtools((set) => ({
    activity: null,

    setActivity: (activity) => set({ activity }),
  }))
);
