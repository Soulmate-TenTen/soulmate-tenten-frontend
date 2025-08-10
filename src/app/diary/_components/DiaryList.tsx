import { Road } from "@/types/diary";
import { useRouter } from "next/navigation";

interface IDiaryList {
  diaryList: Road[];
  selectedDateText: string;
}

const ROAD_STATUS_COLOR = {
  미선택: "#EB423D",
  선택완료: "#FF7B00",
  회고완료: "#08A200",
} as const;

export default function DiaryList({ diaryList, selectedDateText }: IDiaryList) {
  const router = useRouter();
  const onClick = (id: number) => router.push(`/diary/${id}`);

  return (
    <section className="h-full w-full bg-[#27272A] rounded-t-2xl flex flex-col overflow-hidden">
      {/* 헤더(고정 영역) */}
      <header className="px-8 pt-6 pb-4 shrink-0">
        <p className="font-bold text-white">{selectedDateText}</p>
      </header>

      <div
        className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-8 pb-[calc(64px+env(safe-area-inset-bottom))]"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <div className="flex flex-col gap-4">
          {diaryList.map((diary) => (
            <div key={diary.id} className="text-black p-4 rounded-xl bg-white flex gap-1 cursor-pointer" onClick={() => onClick(diary.id)}>
              <div className="grow flex flex-col gap-1 min-w-0">
                <div className="text-[14px]">{diary.title}</div>
                <div className="text-[12px] line-clamp-2 break-words">{diary.summary}</div>
              </div>
              <div
                style={{ color: ROAD_STATUS_COLOR[diary.roadStatus] }}
                className={`rounded-full whitespace-nowrap px-2 h-4 text-[10px] ${diary.roadStatus === "회고완료" && "bg-[#EAFFE9]"}`}
              >
                {diary.roadStatus}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
