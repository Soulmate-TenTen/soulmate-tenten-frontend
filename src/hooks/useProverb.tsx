/* 속담 폰트 적용 함수 */
export const parseProverb = (text: string) => {
  if (!text) return text;
  
  const parts = text.split(/(<danbi>.*?<\/danbi>)/g);
  
  return parts.map((part, index) => {
    if (part.startsWith('<danbi>') && part.endsWith('</danbi>')) {
      const content = part.replace(/<\/?danbi>/g, '');
      return (
        <span key={index} className="font-ChungjuKimSaeng">
          {content}
        </span>
      );
    }
    return part;
  });
};