import { http } from "@/lib/http";

export async function chat(memberId: number, question: string) {
    const response = await http.post(`/api/chatting/api/send`, {
        memberId,
        question,
    });
    return response.data;
}

export async function resetChatMemory(memberId: number): Promise<void> {
    await http.get(`/api/chatting/reset?memberId=${memberId}`);
}

export async function getReport(roadId: number=3) {
  const response = await http.get(`/api/road/getRoadDetail?roadId=${roadId}`);
  return response.data;
}

export async function saveReport(roadId: number, result: string) {
    const response = await http.patch(`/api/road/saveRoad`, {
        id: roadId,
        result
    });
  return response.data;
}