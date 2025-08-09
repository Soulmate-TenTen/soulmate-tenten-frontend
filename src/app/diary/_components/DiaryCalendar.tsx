import useCheckCalendarRoadDay from "@/hooks/useCheckCalendarRoadDay";
import Image from "next/image";

export interface IDiaryCalendar {
  year: number;
  month: number; // 1~12
  selectedDate: Date;
  onSelect: (day: number) => void;
}

export default function DiaryCalendar({ year, month, selectedDate, onSelect }: IDiaryCalendar) {
  const daysInMonth = new Date(year, month, 0).getDate();
  const firstDayOfWeek = new Date(year, month - 1, 1).getDay();
  const offset = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;

  const selectMonth = `${year}-${month > 9 ? month : `0${month}`}`;
  const { data } = useCheckCalendarRoadDay({ selectMonth });

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const prevMonth = month === 1 ? 12 : month - 1;
  const prevYear = month === 1 ? year - 1 : year;
  const prevMonthDays = new Date(prevYear, prevMonth, 0).getDate();
  const emptyStart = Array.from({ length: offset }, (_, i) => prevMonthDays - offset + i + 1);

  const isSelected = (day: number) => {
    const selectedYear = selectedDate.getFullYear();
    const selectedMonth = selectedDate.getMonth() + 1;
    const selectedDay = selectedDate.getDate();
    return selectedYear === year && selectedMonth === month && selectedDay === day;
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 mb-2">
      <div className="grid grid-cols-7 gap-1 my-2 text-[#7B827E]">
        {["월", "화", "수", "목", "금", "토", "일"].map((d) => (
          <div key={d} className="text-center text-xs text-muted-foreground">
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {/* 이전달 날짜 */}
        {emptyStart.map((day, i) => (
          <div key={`empty-start-${i}`}>
            <span></span>
          </div>
        ))}

        {/* 현재 달 날짜 */}
        {days.map((day) => (
          <button key={day} className={"flex flex-col items-center h-14 transition text-[#4E4E4E] cursor-pointer"} onClick={() => onSelect(day)}>
            <div className={`leading-none ${isSelected(day) && "w-full rounded-full bg-[#fffbc0] hover:bg-[#fffbc0]"}`}>{day}</div>
            {data?.includes(day) && (
              <div className="flex-grow flex justify-center items-center">
                <Image src="/calendar-icon.svg" width={26} height={22} alt="체크" />
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
