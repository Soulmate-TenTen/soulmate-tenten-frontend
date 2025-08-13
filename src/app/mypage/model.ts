import { deleteUser, unsubscribeKakao } from "./api";
import { signOut } from "next-auth/react";

/* 회원탈퇴 */
export const unsubscribe = async () => {
    await unsubscribeKakao();
    await deleteUser();
    signOut({ callbackUrl: "/login" });
};