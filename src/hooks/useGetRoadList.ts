import { getRoadList } from "@/api/road";
import { useQuery } from "@tanstack/react-query";

interface IUseGetRoadList {
  selectDate: string;
}

export default function useGetRoadList({ selectDate }: IUseGetRoadList) {
  return useQuery({
    queryFn: () => getRoadList({ selectDate }),
    queryKey: [selectDate],
  });
}
