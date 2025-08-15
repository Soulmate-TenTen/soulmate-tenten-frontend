import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import 'github-markdown-css/github-markdown.css';
import { useEffect, useRef } from 'react';
import { useChatStore } from '@/store/useChatStore';

interface MarkdownProps {
  text: string;
}

const Markdown: React.FC<MarkdownProps> = ({ text }) => {
  const markdownRef = useRef<HTMLDivElement>(null);
  const { roadId } = useChatStore(); //TODO Refactor : remove dependency on roadId

  useEffect(() => {
    if (markdownRef.current && roadId === 0) {
      const elements = markdownRef.current.querySelectorAll('*');
      elements.forEach((element, index) => {
        if (element instanceof HTMLElement) {
          element.style.opacity = '0';
          element.style.animation = `fadeIn 1.2s ease-in-out ${index * 0.1}s forwards`;
        }
      });
    }
  }, [text]);

  return (
    <div ref={markdownRef}>
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

      `}</style>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {text}
      </ReactMarkdown>
    </div>
  );
};

export default Markdown;

