import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTodayDate = () => {
  const today = new Date();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  const dayOfWeek = today.getDay();
  
  const dayNames = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
  
  return `${month}월 ${date}일 ${dayNames[dayOfWeek]}`;
};