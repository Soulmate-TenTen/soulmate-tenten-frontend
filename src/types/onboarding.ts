enum Step1Category {
  Growth = "성장",
  Stability = "안정",
  Autonomy = "자율",
  Relationship = "관계",
  Success = "성공",
  Adventure = "모험",
}
enum Step2Category {
  Fast = "오래 고민하지 않고 빠르게 결정하는 편",
  Deliberate = "오래 고민하고 결정을 미루는 편",
}
enum Step3Category {
  WhatIfOtherChoice = "다른걸 선택했으면 어땠을까",
  ReasonForChoice = "이 선택을 한 이유가 뭘까",
  WhereWentWrong = "어디서부터 잘못된걸까",
  NoRegret = "선택에 후회하지 않는 편이다",
}
enum Step4Category {
  PastExperience = "과거 경험",
  ObjectiveData = "객관적 데이터",
  Intuition = "직감",
  OthersOpinion = "타인의 의견",
}
enum Step5Category {
  Rational = "이성을 기반으로 해결책을 제시",
  Emotional = "감정을 기반으로 해결책 제시",
}

export type Step1CategoryType = (typeof Step1Category)[keyof typeof Step1Category];
export type Step2CategoryType = (typeof Step2Category)[keyof typeof Step2Category];
export type Step3CategoryType = (typeof Step3Category)[keyof typeof Step3Category];
export type Step4CategoryType = (typeof Step4Category)[keyof typeof Step4Category];
export type Step5CategoryType = (typeof Step5Category)[keyof typeof Step5Category];
export type StepCategoryType = null | Step1CategoryType | Step2CategoryType | Step3CategoryType | Step4CategoryType | Step5CategoryType;

export const Step1CategoryList: Step1Category[] = Object.values(Step1Category);
export const Step2CategoryList: Step2Category[] = Object.values(Step2Category);
export const Step3CategoryList: Step3Category[] = Object.values(Step3Category);
export const Step4CategoryList: Step4Category[] = Object.values(Step4Category);
export const Step5CategoryList: Step5Category[] = Object.values(Step5Category);

export interface OnboardingData {
  memberId?: string;
  valueAttribute: Step1CategoryType;
  decision: Step2CategoryType;
  regret: Step3CategoryType;
  decisionTrust: Step4CategoryType;
  soulmateType: "T" | "F";
}