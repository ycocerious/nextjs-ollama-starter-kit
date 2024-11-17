import ReactMarkdown, { Components } from "react-markdown";

interface MessageContentProps {
  content: string;
}

export const MessageContent: React.FC<MessageContentProps> = ({ content }) => {
  const components: Components = {
    p: ({ children }) => <p className="my-2 leading-normal">{children}</p>,
    code: ({ children, className }) => {
      const isInline = !className;
      return isInline ? (
        <code className="bg-slate-100 rounded px-1 py-0.5">{children}</code>
      ) : (
        <code className="block bg-slate-100 rounded p-2 my-2">{children}</code>
      );
    },
    ul: ({ children }) => <ul className="my-2 ml-4 list-disc">{children}</ul>,
    ol: ({ children }) => (
      <ol className="my-2 ml-4 list-decimal">{children}</ol>
    ),
    li: ({ children }) => <li className="my-2">{children}</li>,
    a: ({ children, href }) => (
      <a
        href={href}
        className="text-blue-600 hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
    h1: ({ children }) => (
      <h1 className="text-2xl font-bold my-2">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-xl font-bold my-2">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-lg font-bold my-2">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-slate-300 pl-4 my-2 italic">
        {children}
      </blockquote>
    ),
  };

  return (
    <ReactMarkdown
      className="prose prose-slate prose-p:my-2 prose-headings:my-2 max-w-none leading-normal"
      components={components}
    >
      {content}
    </ReactMarkdown>
  );
};
