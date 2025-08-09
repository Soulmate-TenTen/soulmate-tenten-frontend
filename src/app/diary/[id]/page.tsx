"use client";

import useGetRoadDetail from "@/hooks/useGetRoadDetail";
import useSaveRoad from "@/hooks/useSaveRoad";
import { useDiaryStore } from "@/store/useDiaryStore";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import DiarySave from "../_components/DiarySave";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const queryClient = useQueryClient();

  const { id } = use(params);
  const router = useRouter();
  const [select, setSelect] = useState<null | "A" | "B">(null);
  const [review, setReview] = useState("");
  const [showSaveComponent, setShowSaveComponent] = useState(false);
  const { data } = useGetRoadDetail({ roadId: +id });
  const { mutate: saveRoad } = useSaveRoad();
  const { selectedDate } = useDiaryStore();

  const goBack = () => {
    router.back();
  };

  const goChat = () => {
    router.push(`/chat/${id}`);
  };

  const save = () => {
    if (!select) return;
    saveRoad(
      {
        id: +id,
        result: select,
        review,
      },
      {
        onSuccess() {
          queryClient.invalidateQueries({ queryKey: ["roadDetail", id] });
          queryClient.invalidateQueries({ queryKey: [selectedDate] });
          setShowSaveComponent(true);
        },
      }
    );
  };

  useEffect(() => {
    if (data?.review) {
      setReview(data.review);
    }

    if (data) {
      if (data.result) {
        setSelect(data.result as "A" | "B");
      }
    }
  }, [data]);

  if (showSaveComponent) {
    return <DiarySave />;
  }

  return (
    <div className="mt-4 flex flex-col min-h-screen justify-between content-center mx-4">
      <div>
        {/* 헤더 */}
        <div className="mb-10 flex justify-between items-center">
          <Image src="/back-icon.svg" width={32} height={32} alt="뒤로" onClick={goBack} />
          <p className="font-semibold">{selectedDate}</p>
          <div></div>
        </div>

        {/* 기로 내용 */}
        <div className="bg-white text-black rounded-xl p-4 mb-3">
          <p className="font-bold mb-4">{data?.conclusionTitle}</p>
          <p className="text-[13px]">{data?.conclusion}</p>
        </div>

        {/* 기로 선택 버튼 */}
        <div className="flex gap-2 mb-12">
          <button
            style={{ backgroundColor: select === "A" ? "#FFFBC0" : "#1C1C1C", color: select === "A" ? "black" : "white" }}
            className="rounded-full w-full py-2 font-bold"
            onClick={() => setSelect("A")}
          >
            A {data?.titleA}
          </button>
          <button
            style={{ backgroundColor: select === "B" ? "#FFFBC0" : "#1C1C1C", color: select === "B" ? "black" : "white" }}
            className="rounded-full w-full py-2 font-bold"
            onClick={() => setSelect("B")}
          >
            B {data?.titleB}
          </button>
        </div>

        {/* 회고 */}
        {select && (
          <div>
            <p className="mb-5 font-semibold">회고</p>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="text-black w-full resize-none bg-white rounded-xl h-[145px] placeholder-[#A5A5A5] p-4"
              placeholder="그 선택이 어떤 변화를 만들어냈나요?"
            />
          </div>
        )}
      </div>

      {/* 버튼 */}
      <div className="flex flex-col gap-3 mb-6">
        <button style={{ backgroundColor: select ? "#FFFBC0" : "#6C6C6C" }} className="text-[#000414] w-full rounded-full py-2" onClick={save}>
          저장하기
        </button>
        <button className="text-white rounded-full w-full py-2 border border-[#4E4E4E]" onClick={goChat}>
          대화 보러가기
        </button>
      </div>
    </div>
  );
}
