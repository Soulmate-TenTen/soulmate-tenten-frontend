import { getCount } from "@/api/getCount";
import { useQuery } from "@tanstack/react-query";

export default function useGetCount() {
  return useQuery({
    queryFn: () => getCount(),
    queryKey: ["count"],
  });
}
