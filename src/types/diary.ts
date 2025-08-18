export interface Road {
  id: number;
  summary: string;
  roadStatus: "미선택" | "선택완료" | "회고완료";
  title: string;
  createAt: Date;
}

export interface RoadDetail {
  thinkingContent: string;
  titleA: string;
  titleB: string;
  contentA: string;
  contentB: string;
  conclusionTitle: string;
  conclusion: string;
  result: string;
  review: string;
}

export interface Remind {
  title: string;
  remindYn: "Y" | "N";
  roadId: number;
}
