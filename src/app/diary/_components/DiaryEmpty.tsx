import Image from "next/image";
import { useRouter } from "next/navigation";

export default function DiaryEmpty() {
  const router = useRouter();

  const goChat = () => {
    router.push("/chat");
  };
  return (
    <div className="flex flex-col gap-12 justify-center items-center">
      {/* 캐릭터 */}
      <Image src="/calendar-char.svg" width={168} height={137} alt="저와 함께 시작해볼까요?" />

      {/* 채팅 바로가기 */}
      <div className="mb-8 flex justify-between gap-5 p-4 mx-auto bg-[#27272A] rounded-xl cursor-pointer" onClick={goChat}>
        <Image src="/star.svg" width={50} height={50} alt="별 캐릭터" />
        <div>
          <p>오늘은 어떤 선택이 있으신가요?</p>
          <p className="text-[12px] mt-1">틀린 선택은 없어요. 저와 함께 이야기해봐요.</p>
        </div>
        <Image src="/right-arrow.svg" width={20} height={20} alt="오른쪽 화살표" />
      </div>
    </div>
  );
}
