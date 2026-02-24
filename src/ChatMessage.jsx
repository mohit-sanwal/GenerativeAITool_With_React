import ReactMarkdown from "react-markdown";

export default function ChatMessage({ message }) {
  if (!message) return null;

  const isUser = message.role === "user";

  return (
    <div
      className={`flex w-full min-w-0 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`px-4 py-3 rounded-2xl shadow-md break-words min-w-0 ${
          isUser
            ? "bg-blue-600 text-white max-w-[85%] sm:max-w-[70%]"
            : "bg-zinc-800 text-white max-w-[95%] sm:max-w-[85%]"
        }`}
      >
        <div className="prose prose-invert max-w-none overflow-hidden">
          <ReactMarkdown
            components={{
              code({ inline, children, ...props }) {
                if (inline) {
                  return (
                    <code
                      className="break-all"
                      {...props}
                    >
                      {children}
                    </code>
                  );
                }

                return (
                  <pre className="overflow-x-auto rounded-lg bg-black p-3">
                    <code {...props}>{children}</code>
                  </pre>
                );
              },
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}