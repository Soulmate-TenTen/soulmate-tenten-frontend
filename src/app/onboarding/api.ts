import { http } from "@/lib/http";

/* 온보딩 결과 저장 API */
export async function saveOnboarding(data: any): Promise<any> {
    return await http.post(`/api/onboarding/onboardingResult`, data);
}