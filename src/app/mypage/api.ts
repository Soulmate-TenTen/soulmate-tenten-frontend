import { http } from "@/lib/http";
import { getSession } from "next-auth/react";

/* 현재까지 총 고민 선택한 횟수 조회 API */
export async function getCount(): Promise<number> {
    const session = await getSession();
    return await http.get(`/api/road/countRoad?memberId=${session?.user?.id}`)
        .then((res) => res.data.roadCount);
}