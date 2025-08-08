import { saveRoad } from "@/api/road";
import { useMutation } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

interface IUseSaveRoad {
  id: number;
  result: "A" | "B";
  review: string;
}

export default function useSaveRoad() {
  const { data: session } = useSession();
  return useMutation({
    mutationFn: ({ id, result, review }: IUseSaveRoad) => saveRoad({ id, result, review }),
    mutationKey: [session?.user],
  });
}
