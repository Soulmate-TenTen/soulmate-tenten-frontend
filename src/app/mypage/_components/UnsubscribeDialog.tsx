import { useState } from "react";
import { 
  Dialog, 
  DialogTrigger, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription
} from "@/components/Dialog"
import { useUnsubscribe } from "../model";

export default function UnsubscribeDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const { mutate: unsubscribe } = useUnsubscribe();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button
          onClick={() => setIsOpen(true)}
          className="text-[#FFFFF6] font-normal hover:font-bold text-base text-left w-full py-5 px-1 hover:text-[#FFFFFF] hover:bg-[#1A1A1A]/30 rounded-md transition-all duration-200 ease-in-out cursor-pointer"
        >
          회원탈퇴
        </button>
      </DialogTrigger>
      <DialogContent className="p-8">
        <DialogHeader>
          <DialogTitle>회원 탈퇴</DialogTitle>
          <DialogDescription>
            {`회원 탈퇴 시 계정 정보 및 보유중인 기록이
삭제되어 복구가 불가해요.

정말로 탈퇴하시겠어요?`}
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-4">
          <button 
            onClick={() => setIsOpen(false)}
            className="bg-[#D9D9D9] text-background cursor-pointer flex-1 h-[42px] rounded-[4px] font-bold text-[16px] leading-[1.4] border border-[#D9D9D9] transition-all duration-200"
          >
            더 써볼래요
          </button>
          <button 
            onClick={() => unsubscribe()}
            className="bg-background text-foreground cursor-pointer flex-1 h-[42px] rounded-[4px] font-bold text-[16px] leading-[1.4] bg-[#FFFFF6] transition-all duration-200"
          >
            떠날래요
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}