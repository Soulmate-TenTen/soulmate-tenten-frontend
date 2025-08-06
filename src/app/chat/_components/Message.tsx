import React from 'react';
import Image from 'next/image';
import characterSvg from '@/assets/images/character.svg';

interface MessageProps {
  content: string;
  role: string;
}

const Message: React.FC<MessageProps> = ({ 
  content, 
  role,
}) => {
  return (
    <div className={`flex ${role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className="max-w-[270px] relative">
        {role === 'assistant' && (
          <div className="absolute -top-6 left-1 z-10">
            <Image
              src={characterSvg}
              alt="Assistant character"
              width={32}
              height={34}
              className="w-8 h-8"
            />
          </div>
        )}
        <div 
          className={`
            rounded-lg text-sm leading-[1.4] break-words
            ${role === 'user' 
              ? 'bg-[#FFFFF6] text-black border border-[#4E4E4E]' 
              : 'bg-[#1C1C1C] text-[#FFFFF6]'
            }
          `}
          style={{
            fontFamily: 'SUIT, sans-serif',
            fontWeight: 500,
            fontSize: '13px',
            lineHeight: '1.4em',
            padding: role === 'user' ? '13px 23px' : '12px 16px'
          }}
        >
          {content}
        </div>
      </div>
    </div>
  );
};

export default Message;
