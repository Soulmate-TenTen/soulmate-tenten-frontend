import { http } from "@/lib/http";

interface IGetTodayAdvice {
  memberId: number;
}
export async function getTodayAdvice({ memberId }: IGetTodayAdvice): Promise<string> {
  return await http.get(`/api/member/todayAdvice?memberId=${memberId}`).then((res) => res.data.advice);
}
