"use client";

import { useEffect, useState } from "react";
import { Report } from "../type";
import { getReport, saveReport } from "../api";
import { useChatStore } from "@/store/useChatStore";
import { useRouter } from "next/navigation";
import { ShortButton } from "@/components/buttons";

export default function ReportPage() {
  const router = useRouter();
  const { roadId } = useChatStore();
  const [report, setReport] = useState<Report>({
    thinkingContent: '',
    titleA: '',
    titleB: '',
    contentA: '',
    contentB: '',
    conclusionTitle: '',
    conclusion: '',
    result: null,
    review: null
  });
  const [expandedA, setExpandedA] = useState(false);
  const [expandedB, setExpandedB] = useState(false);

  useEffect(() => {
    const fetchReport = async () => {
      const res = await getReport(roadId);
      setReport(res);
    };
    fetchReport();
  }, [roadId]);

  useEffect(() => {
    if (expandedA) {
      setReport(prev => ({ ...prev, result: 'A' }));
    } else if (expandedB) {
      setReport(prev => ({ ...prev, result: 'B' }));
    } else {
      setReport(prev => ({ ...prev, result: null }));
    }
  }, [expandedA, expandedB]);

  const handleAccordionClick = (type: 'A' | 'B') => {
    if (type === 'A') {
      setExpandedA(!expandedA);
      setExpandedB(false);
    } else {
      setExpandedB(!expandedB);
      setExpandedA(false);
    }
  };

  /* 나중에 선택하기 */
  const handleBack = () => {
    router.push('/');
  };

  /* 선택하기 */
  const handleSelect = () => {
    if (report.result) {
      saveReport(roadId, report.result);
      router.push('/diary');
    }
  };

  return (
    <div className="bg-[#000414] flex flex-col">

      {/* Main Content */}
      <div className="flex-1 px-8 pb-32">
        {/* Analysis Result */}
        <div className="bg-[#FFFFF6] rounded-lg p-4 mb-6">
          <h3 className="text-[#000414] text-base font-bold mb-3">
            {report.conclusionTitle}
          </h3>
          <p className="text-[#000414] text-sm leading-relaxed">
            {report.conclusion}
          </p>
        </div>

        {/* Option A */}
        <div className="bg-[#CACACA] rounded-lg p-4 mb-4">
          <div 
            className="flex items-center justify-between cursor-pointer"
            onClick={() => handleAccordionClick('A')}
          >
            <span className="text-black text-[15px] font-bold">
              A  {report.titleA}
            </span>
            <svg 
              width="12" 
              height="6" 
              viewBox="0 0 12 6" 
              fill="none" 
              className={`text-[#343434] transition-transform duration-200 ${expandedA ? 'rotate-180' : ''}`}
            >
              <path d="M1 1L6 5L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          {expandedA && (
            <div className="mt-4 pt-4 border-t border-[#343434]/20">
              <p className="text-black text-sm leading-relaxed">
                {report.contentA}
              </p>
            </div>
          )}
        </div>

        {/* Option B */}
        <div className="bg-[#1C1C1C] rounded-lg p-4 mb-6">
          <div 
            className="flex items-center justify-between cursor-pointer"
            onClick={() => handleAccordionClick('B')}
          >
            <span className="text-[#FFFFF6] text-[15px] font-bold">
              B  {report.titleB}
            </span>
            <svg 
              width="12" 
              height="6" 
              viewBox="0 0 12 6" 
              fill="none" 
              className={`text-[#C9C9C9] transition-transform duration-200 ${expandedB ? 'rotate-180' : ''}`}
            >
              <path d="M1 1L6 5L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          {expandedB && (
            <div className="mt-4 pt-4 border-t border-[#C9C9C9]/20">
              <p className="text-[#FFFFF6] text-sm leading-relaxed">
                {report.contentB}
              </p>
            </div>
          )}
        </div>

        {/* Quote - moved after options */}
        <div className="text-center mb-8">
          <p className="text-[#5B5B5B] text-xs font-medium leading-relaxed">
            후회 없는 선택은 존재하지 않습니다.<br />
            다만 당신의 가치에 맞는 선택은 후회를 줄입니다.
          </p>
        </div>
      </div>

      {/* Bottom Buttons */}
      <div className="flex justify-center gap-2 mb-10">
        <ShortButton variant="secondary" onClick={handleBack}>나중에 선택하기</ShortButton>
        <ShortButton onClick={handleSelect}>선택하기</ShortButton>
      </div>
    </div>
  );
}