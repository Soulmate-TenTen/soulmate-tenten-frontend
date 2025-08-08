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
};

export default function DiaryList({ diaryList, selectedDateText }: IDiaryList) {
  const router = useRouter();

  const onClick = (id: number) => {
    router.push(`/diary/${id}`);
  };

  return (
    <div className="grow flex flex-col p-8 bg-[#27272A] rounded-t-2xl gap-4">
      <p>{selectedDateText}</p>
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
  );
}
