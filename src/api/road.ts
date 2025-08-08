import { http } from "@/lib/http";
import { Road } from "@/types/calendar";
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
