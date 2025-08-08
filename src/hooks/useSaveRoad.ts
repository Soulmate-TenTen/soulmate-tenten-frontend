import { saveRoad } from "@/api/road";
import { useMutation } from "@tanstack/react-query";

interface IUseSaveRoad {
  id: number;
  result: "A" | "B";
  review: string;
}

export default function useSaveRoad() {
  return useMutation({
    mutationFn: ({ id, result, review }: IUseSaveRoad) => saveRoad({ id, result, review }),
  });
}
