import { http } from "@/lib/http";
import { Road, RoadDetail } from "@/types/diary";
import { getSession } from "next-auth/react";

interface IGetRoadList {
  selectDate: string;
}
export async function getRoadList({ selectDate }: IGetRoadList): Promise<Road[]> {
  const session = await getSession();
  return await http.get(`/api/road/getRoadList?memberId=${session?.user?.id}&selectDate=${selectDate}`).then((res) => res.data.roadList);
}

interface ICheckCalendarRoadDay {
  selectMonth: string;
}
export async function checkCalendarRoadDay({ selectMonth }: ICheckCalendarRoadDay): Promise<number[]> {
  const session = await getSession();
  return await http
    .get(`/api/road/checkCalendarRoadDay?memberId=${session?.user?.id}&selectMonth=${selectMonth}`)
    .then((res) => res.data.existsRoadDay);
}

interface IGetRoadDetail {
  roadId: number;
}
export async function getRoadDetail({ roadId }: IGetRoadDetail): Promise<RoadDetail> {
  return await http.get(`/api/road/getRoadDetail?roadId=${roadId}`).then((res) => res.data);
}

interface ISaveRoad {
  id: number;
  result: "A" | "B";
  review: string;
}
export async function saveRoad({ id, result, review }: ISaveRoad) {
  return await http.patch(`/api/road/saveRoad`, { id, result, review });
}
