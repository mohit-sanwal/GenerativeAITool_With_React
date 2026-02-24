import ReactMarkdown from "react-markdown";

export default function ChatMessage({ message }) {
  if (!message) return null;
  const isUser = message.role === "user";

  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`px-5 py-3 rounded-2xl shadow-md ${
          isUser
            ? "bg-blue-600 text-white max-w-[70%]"
            : "bg-zinc-800 text-white max-w-[90%]"
        }`}
      >
        <div className="prose prose-invert max-w-none break-words">
            <ReactMarkdown>
            {message.content}
            </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}