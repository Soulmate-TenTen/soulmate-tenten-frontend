import { checkCalendarRoadDay } from "@/api/road";
import { useQuery } from "@tanstack/react-query";

interface IUseGetRoadList {
  selectMonth: string;
}

export default function useCheckCalendarRoadDay({ selectMonth }: IUseGetRoadList) {
  return useQuery({
    queryFn: () => checkCalendarRoadDay({ selectMonth }),
    queryKey: [selectMonth],
  });
}
