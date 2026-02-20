import { useState, useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import './App.css'
import {CHAT_URL} from './utils/apiUrls'

function App() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);

  // Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const ask = async () => {
    if (!query.trim()) return;

    const userMessage = {
      role: "user",
      content: query,
    };

    setMessages((prev) => [...prev, userMessage]);
    setQuery("");
    setLoading(true);
    console.log('process.env', import.meta.env);
    const res = await fetch(`${import.meta.env.VITE_GENERATIVE_AI_API_BASE_URL}${CHAT_URL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: query }),
    });

    const data = await res.json();

    const aiMessage = {
      role: "assistant",
      content: data.reply,
    };

    setMessages((prev) => [...prev, aiMessage]);
    setLoading(false);
  };

  return (
    <div className="h-screen bg-zinc-900 text-white flex">
      
      {/* Sidebar Placeholder (for future chat list) */}
      <div className="w-1/5 bg-zinc-800 p-4 hidden md:block">
        <h1 className="text-xl font-semibold">AI Assistant</h1>
        <p className="text-zinc-400 text-sm mt-4">
          Future: Chat History Here
        </p>
      </div>

      {/* Main Area */}
<div className="flex-1 flex flex-col">

  {/* Messages */}
  <div className="flex-1 overflow-y-auto p-6 space-y-4 chat-scroll">
    {messages.length === 0 && (
      <div className="h-full flex items-center justify-center text-zinc-500">
        Start a conversation 🚀
      </div>
    )}

    {messages.map((msg, index) => (
      <ChatMessage key={index} message={msg} />
    ))}

    {loading && (
      <div className="text-zinc-400 animate-pulse">
        Thinking...
      </div>
    )}

    <div ref={bottomRef}></div>
  </div>

  {/* Input */}
  <div className="p-4 border-t border-zinc-700 bg-zinc-900">
    <div className="flex items-center gap-3 bg-zinc-800 px-4 py-3 rounded-full border border-zinc-700">
      <textarea
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ask me anything..."
        rows={1}
        className="flex-1 bg-transparent outline-none resize-none text-white"
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            ask();
          }
        }}
      />
      <button
        onClick={ask}
        className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-full transition"
      >
        Ask
      </button>
    </div>
  </div>

</div>
    </div>
  );
}

export default App;