export interface Road {
  id: number;
  summary: string;
  roadStatus: "미선택" | "선택완료" | "회고완료";
  title: string;
  createAt: Date;
}
