import { getCount } from "@/api/getCount";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export default function useGetCount() {
  const { data: session } = useSession();
  return useQuery({
    queryFn: () => getCount(),
    queryKey: [session?.user.id],
  });
}
