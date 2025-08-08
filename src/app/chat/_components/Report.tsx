"use client";

import { useChatStore } from "@/store/useChatStore";
import { useState } from "react";
import { LongButton } from "@/components/buttons";

interface OptionData {
  title: string;
  description: string;
  pros: string[];
  cons: string[];
  recommendation: string;
}

export default function ReportPage() {
  const { messages, clearMessages } = useChatStore();
  const [expandedOption, setExpandedOption] = useState<'A' | 'B' | null>(null);
  const [result, setResult] = useState<string>("");

  // A안, B안 데이터 (예시)
  const options: Record<'A' | 'B', OptionData> = {
    A: {
      title: "A안: 현재 직장에서 계속 근무",
      description: "안정적인 수입과 익숙한 환경에서의 근무를 선택하는 방안",
      pros: [
        "안정적인 수입 보장",
        "익숙한 업무 환경",
        "기존 인맥 유지",
        "리스크가 낮음"
      ],
      cons: [
        "성장 한계 가능성",
        "새로운 도전 기회 제한",
        "업무 만족도 저하 가능성"
      ],
      recommendation: "현재 상황에서 안정성을 우선시한다면 좋은 선택입니다. 다만 장기적인 성장을 위해서는 추가적인 자기계발이 필요할 수 있습니다."
    },
    B: {
      title: "B안: 새로운 직장으로 이직",
      description: "새로운 환경과 도전을 통해 성장을 추구하는 방안",
      pros: [
        "새로운 성장 기회",
        "더 나은 조건의 가능성",
        "다양한 경험 축적",
        "자기계발 동기 부여"
      ],
      cons: [
        "이직 과정의 불안정성",
        "새로운 환경 적응 필요",
        "기존 인맥과의 거리감",
        "실패 리스크 존재"
      ],
      recommendation: "성장과 도전을 원한다면 좋은 선택입니다. 다만 신중한 준비와 계획이 필요하며, 새로운 환경 적응에 대한 마음의 준비가 중요합니다."
    }
  };

  const AccordionItem = ({ option, data }: { option: 'A' | 'B'; data: OptionData }) => {
    const isExpanded = expandedOption === option;
    
    return (
      <div className="bg-[#1A1A1A] rounded-2xl overflow-hidden">
        <button
          onClick={() => setExpandedOption(isExpanded ? null : option)}
          className="w-full p-6 text-left flex items-center justify-between hover:bg-[#252525] transition-colors"
        >
          <div className="flex items-center space-x-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
              option === 'A' ? 'bg-[#FFD700] text-[#000414]' : 'bg-[#87CEEB] text-[#000414]'
            }`}>
              {option}
            </div>
            <div>
              <h3 className="text-[#FFFFF6] font-semibold text-base">{data.title}</h3>
              <p className="text-[#6C6C6C] text-sm mt-1">{data.description}</p>
            </div>
          </div>
          <div className={`w-6 h-6 transition-transform duration-200 ${
            isExpanded ? 'rotate-180' : ''
          }`}>
            <svg className="w-6 h-6 text-[#6C6C6C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </button>
        
        {isExpanded && (
          <div className="px-6 pb-6 space-y-6">
            {/* 장점 */}
            <div>
              <h4 className="text-[#4CAF50] font-semibold text-sm mb-3 flex items-center">
                <span className="w-2 h-2 bg-[#4CAF50] rounded-full mr-2"></span>
                장점
              </h4>
              <ul className="space-y-2">
                {data.pros.map((pro, index) => (
                  <li key={index} className="text-[#CCCCCC] text-sm flex items-start">
                    <span className="text-[#4CAF50] mr-2">•</span>
                    {pro}
                  </li>
                ))}
              </ul>
            </div>

            {/* 단점 */}
            <div>
              <h4 className="text-[#F44336] font-semibold text-sm mb-3 flex items-center">
                <span className="w-2 h-2 bg-[#F44336] rounded-full mr-2"></span>
                단점
              </h4>
              <ul className="space-y-2">
                {data.cons.map((con, index) => (
                  <li key={index} className="text-[#CCCCCC] text-sm flex items-start">
                    <span className="text-[#F44336] mr-2">•</span>
                    {con}
                  </li>
                ))}
              </ul>
            </div>

            {/* 추천사항 */}
            <div className="bg-gradient-to-r from-[#FFFBC0]/10 to-[#FFFBC0]/5 rounded-xl p-4 border border-[#FFFBC0]/20">
              <h4 className="text-[#FFFBC0] font-semibold text-sm mb-2">💡 추천사항</h4>
              <p className="text-[#CCCCCC] text-sm leading-relaxed">
                {data.recommendation}
              </p>
            </div>
          </div>
        )}
      </div>
    );
  };

  const handleBackToChat = () => {
    clearMessages();
    window.location.reload();
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#000414] px-5 py-6">
      <div className="bg-[#FFFFF6] rounded-2xl p-6 mb-6">
        <h2 className="text-[#000414] text-lg font-semibold mb-4">소울메이트는 A안을 추천합니다</h2>
          <p className="text-[#000414] text-sm leading-relaxed">
            {result}
          </p>
      </div>

      {/* A안, B안 아코디언 */}
      <div className="space-y-4 mb-8">
        <h2 className="text-[#FFFFF6] text-lg font-semibold mb-4">선택지 분석</h2>
        <AccordionItem option="A" data={options.A} />
        <AccordionItem option="B" data={options.B} />
      </div>

      {/* 하단 버튼 */}
      <div className="mt-8 mb-6">
        <LongButton onClick={handleBackToChat} variant="secondary">
          새로운 대화 시작하기
        </LongButton>
      </div>
    </div>
  );
}