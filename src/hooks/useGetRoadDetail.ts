import { getRoadDetail } from "@/api/road";
import { useQuery } from "@tanstack/react-query";

interface IUseGetRoadDetail {
  roadId: number;
}
export default function useGetRoadDetail({ roadId }: IUseGetRoadDetail) {
  return useQuery({
    queryFn: () => getRoadDetail({ roadId }),
    queryKey: ["roadDetail", roadId],
    staleTime: 0,
  });
}
