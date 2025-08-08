import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface DiaryState {
  selectedDate: string;
}

interface DiaryAction {
  setSelectedDate: (selectedDate: string) => void;
}

export const useDiaryStore = create<DiaryState & DiaryAction>()(
  devtools((set) => ({
    selectedDate: "",
    setSelectedDate: (selectedDate) => set({ selectedDate }),
  }))
);
