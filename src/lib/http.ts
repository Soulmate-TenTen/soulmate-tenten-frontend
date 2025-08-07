import axios from "axios";

export type ApiResponse<T> = {
  data: T;
};

export const http = axios.create({
  baseURL: '/',
  headers: {
    'x-api-route': 'true', /* next-auth랑 API 라우트 경로 충돌 방지 */
  },
});
