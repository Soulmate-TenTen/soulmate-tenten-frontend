import Image from "next/image";
import { useRouter } from "next/navigation";

export default function DiaryEmpty() {
  const router = useRouter();

  const goChat = () => {
    router.push("/chat");
  };
  return (
    <div className="flex flex-col gap-12 justify-center items-center">
      {/* 채팅 바로가기 */}
      <div className="w-full flex justify-between items-center gap-5 p-4 mx-auto bg-[#27272A] rounded-xl cursor-pointer" onClick={goChat}>
        <Image src="/star.svg" width={50} height={50} alt="별 캐릭터" />
        <div>
          <p className="font-bold">오늘 어떤 선택이 있나요?</p>
          <p className="text-[12px] mt-1">저와 함께 이야기해봐요!</p>
        </div>
        <Image src="/right-arrow.svg" width={20} height={20} alt="오른쪽 화살표" />
      </div>
    </div>
  );
}
