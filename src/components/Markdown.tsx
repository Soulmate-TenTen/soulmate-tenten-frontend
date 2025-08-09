import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import 'github-markdown-css/github-markdown.css';

interface MarkdownProps {
  text: string;
}

const Markdown: React.FC<MarkdownProps> = ({ text }) => {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]}>
      {text}
    </ReactMarkdown>
  );
};

export default Markdown;

