import { getTodayAdvice } from "@/api/home";
import { useQuery } from "@tanstack/react-query";

interface IGetTodayAdvice {
  memberId: number;
}

export default function useGetTodayAdvice({ memberId }: IGetTodayAdvice) {
  return useQuery({
    queryFn: () => getTodayAdvice({ memberId }),
    queryKey: [memberId],
    staleTime: 0,
  });
}
