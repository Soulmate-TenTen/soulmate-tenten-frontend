import { getRemind } from "@/api/road";
import { useQuery } from "@tanstack/react-query";

interface IUseGetRemind {
  memberId: number;
}

export default function useGetRemind({ memberId }: IUseGetRemind) {
  return useQuery({
    queryFn: () => getRemind({ memberId }),
    queryKey: ["count"],
  });
}
