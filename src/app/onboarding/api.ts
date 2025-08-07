import { http } from "@/lib/http";
import { OnboardingData } from "@/types/onboarding";

/* 온보딩 결과 저장 API */
export async function saveOnboarding(data: OnboardingData): Promise<void> {
    await http.post(`/api/onboarding/onboardingResult`, data);
}