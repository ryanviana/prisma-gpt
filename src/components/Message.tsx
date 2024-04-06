import { SiOpenai } from "react-icons/si";
import { HiUser } from "react-icons/hi";
import { TbCursorText } from "react-icons/tb";
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// You can choose any style from the react-syntax-highlighter/dist/esm/styles/prism folder
import { materialLight, materialDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { useState } from 'react';


const Message = (props: any) => {
  const { message } = props;
  const { role, content: text } = message;

  const isUser = role === "user";

  const components = {
    code({ node, inline, className, children, ...props }: { node: any, inline: boolean, className: string, children: any, props: any }) {
      const [copyButtonText, setCopyButtonText] = useState('Copy');
      const match = /language-(\w+)/.exec(className || '');
      const textToCopy = String(children).replace(/\n$/, '');

      const copyToClipboard = async (text: any) => {
        try {
          await navigator.clipboard.writeText(text);
          setCopyButtonText('Copied!');
          setTimeout(() => setCopyButtonText('Copy'), 2000); // Reset button text after 2 seconds
        } catch (err) {
          console.error('Failed to copy text: ', err);
        }
      };

      return !inline && match ? (
        <div style={{ position: 'relative' }}>
          <SyntaxHighlighter
            style={isUser ? materialLight : materialDark}
            language={match[1]}
            PreTag="div"
            {...props}
          >
            {textToCopy}
          </SyntaxHighlighter>
          <button
            onClick={() => copyToClipboard(textToCopy)}
            style={{
              position: 'absolute',
              top: '5px',
              right: '5px',
              padding: '5px',
            }}
          >
            {copyButtonText}
          </button>
        </div>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  };

  return (
    <div
      className={`group w-full text-gray-800 dark:text-gray-100 border-b border-black/10 dark:border-gray-900/50 ${isUser ? "dark:bg-gray-800" : "bg-gray-50 dark:bg-[#444654]"
        }`}
    >
      <div className="text-base gap-4 md:gap-6 md:max-w-2xl lg:max-w-xl xl:max-w-3xl flex lg:px-0 m-auto w-full">
        <div className="flex flex-row gap-4 md:gap-6 md:max-w-2xl lg:max-w-xl xl:max-w-3xl p-4 md:py-6 lg:px-0 m-auto w-full">
          <div className="w-8 flex flex-col relative items-end">
            <div className="relative h-7 w-7 p-1 rounded-sm text-white flex items-center justify-center bg-black/75 text-opacity-100">
              {isUser ? (
                <HiUser className="h-4 w-4 text-white" />
              ) : (
                <SiOpenai className="h-4 w-4 text-white" />
              )}
            </div>
            <div className="text-xs flex items-center justify-center gap-1 absolute left-0 top-2 -ml-4 -translate-x-full group-hover:visible !invisible">
              <button
                disabled
                className="text-gray-300 dark:text-gray-400"
              ></button>
              <span className="flex-grow flex-shrink-0">1 / 1</span>
              <button
                disabled
                className="text-gray-300 dark:text-gray-400"
              ></button>
            </div>
          </div>
          <div className="relative flex w-[calc(100%-50px)] flex-col gap-1 md:gap-3 lg:w-[calc(100%-115px)]">
            <div className="flex flex-grow flex-col gap-3">
              <div className="min-h-20 flex flex-col items-start gap-4 whitespace-pre-wrap break-words">
                <div className="markdown prose w-full break-words dark:prose-invert dark">
                  {!isUser && text === null ? (
                    <TbCursorText className="h-6 w-6 animate-pulse" />
                  ) : (
                    <ReactMarkdown components={components}>{text}</ReactMarkdown>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
