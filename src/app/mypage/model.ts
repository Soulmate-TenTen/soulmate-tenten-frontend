import { useMutation } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { unsubscribeKakao, deleteUser } from "./api";

/* 회원탈퇴 */
export const useUnsubscribe = () => {
  return useMutation({
    mutationFn: async () => {
      await unsubscribeKakao();
      await deleteUser();
      signOut({ callbackUrl: "/login" });
    },
    onError: (error) => {
      console.error("회원탈퇴 중 오류 발생:", error);
    },
  });
};