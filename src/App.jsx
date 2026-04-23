import { useState, useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";
import './App.css'
import {CHAT_URL} from './utils/apiUrls'

function App() {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isWarmingUp, setIsWarmingUp] = useState(true);

  const bottomRef = useRef(null);

  // to check server health
  useEffect(() => {
    const warmUpServer = async () => {
      try {
        await fetch(`${import.meta.env.VITE_GENERATIVE_AI_API_BASE_URL}/health`);
      } catch (err) {
        console.log("Warmup failed:", err);
      } finally {
        setIsWarmingUp(false);
      }
    };
    warmUpServer();
  }, [])


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
    <>
    <div className="h-dvh w-full bg-zinc-900 text-white flex flex-col md:flex-row overflow-hidden">
     
      
      {/* Sidebar Placeholder (for future chat list) */}
      <div className="hidden md:flex md:w-1/5 bg-zinc-800 p-4 relative">
        <h1 className="text-xl font-semibold">AI Assistant</h1>
        <p className="text-zinc-400 text-sm mt-4">
          {/* Future: Chat History Here */}
        </p>
        <div className="absolute bottom-5"> 
            <p>Author:</p>
            <p>Mohit Sanwal</p>
        </div>
      </div>

      {/* Main Area */}
      <div className="flex-1 w-full flex flex-col overflow-hidden">
         {isWarmingUp && (
      <div className="bg-yellow-600 text-black text-center py-2 text-sm">
        Waking up server... first request may take ~30s
      </div>
    )}

  {/* Messages */}
  <div className="flex-1 overflow-y-auto px-4 py-4 md:p-6 space-y-4">
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
  <div className="shrink-0 p-4 border-t border-zinc-700 bg-zinc-900">
  <div className="flex items-end gap-3 bg-zinc-800 px-4 py-3 rounded-2xl border border-zinc-700">
    <textarea
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Ask me anything..."
      rows={1}
      className="flex-1 min-w-0 bg-transparent outline-none resize-none text-white max-h-40 overflow-y-auto"
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
    </>
  );
}

export default App;