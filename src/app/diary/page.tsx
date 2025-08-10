"use client";

import Footer from "@/components/Footer";
import DiaryCalendar from "./_components/DiaryCalendar";
import { useEffect, useState } from "react";
import Image from "next/image";
import useGetRoadList from "@/hooks/useGetRoadList";
import DiaryEmpty from "./_components/DiaryEmpty";
import DiaryList from "./_components/DiaryList";

const getFormattedDate = (year: number, month: number, day: number) => {
  return `${year}-${month > 9 ? month : `0${month}`}-${day > 9 ? day : `0${day}`}`;
};

const getDay = (day: number) => {
  return ["일", "월", "화", "수", "목", "금", "토", "일"][day];
};

export default function DiaryPage() {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1); // 1~12
  const [day, setDay] = useState(today.getDate());
  const formatted = getFormattedDate(year, month, day);
  const { data, isLoading } = useGetRoadList({ selectDate: formatted });

  const setDate = (newMonth: number) => {
    if (newMonth > 12) {
      setYear(year + 1);
      setMonth(1);
    } else if (newMonth < 1) {
      setYear(year - 1);
      setMonth(12);
    } else {
      setMonth(newMonth);
    }
  };

  useEffect(() => {
    const newSelectedDate = getFormattedDate(year, month, day);
    setSelectedDate(new Date(newSelectedDate));
  }, [day, month, year]);

  return (
    <div className="h-[calc(100dvh)] flex flex-col overflow-hidden">
      <div className="flex-1 min-h-0 flex flex-col">
        {/* 상단 헤더 */}
        <div className="flex gap-4 mt-2 mb-6 justify-center items-center">
          <Image
            src="/calendar-l-arrow.svg"
            className="cursor-pointer"
            width={10}
            height={14}
            alt="이전 달 보기"
            onClick={() => setDate(month - 1)}
          />
          <p className="font-semibold">
            {year}년 {month}월
          </p>
          <Image
            src="/calendar-r-arrow.svg"
            className="cursor-pointer"
            width={10}
            height={14}
            alt="다음 달 보기"
            onClick={() => setDate(month + 1)}
          />
        </div>

        {/* 캘린더 */}
        <div className="shrink-0">
          <DiaryCalendar year={year} month={month} selectedDate={selectedDate} onSelect={setDay} />
        </div>

        {/* 하단 */}
        <div className="flex-1 min-h-0 w-full flex flex-col">
          {isLoading ? null : !data || data.length === 0 ? (
            <div className="mt-auto m-4">
              <DiaryEmpty />
            </div>
          ) : (
            <DiaryList
              diaryList={data || []}
              selectedDateText={`${selectedDate.getMonth() + 1}월 ${selectedDate.getDate()}일 ${getDay(selectedDate.getDay())}요일`}
            />
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
