import { http } from "@/lib/http";
import { getSession } from "next-auth/react";

export async function getCount(): Promise<number> {
  const session = await getSession();
  return await http.get(`/api/road/countRoad?memberId=${session?.user?.id}`).then((res) => res.data.roadCount);
}
