import { useState } from "react";
import API from "../../api/axios";
import {
  Bot,
  X,
  Send,
  Loader2,
  Sparkles
} from "lucide-react";

export default function FloatingAIChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi  I’m your AI assistant. How can I help you today?"
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await API.post("/ai-assistant/chat", {
        message: input
      });

      setMessages(prev => [
        ...prev,
        { role: "assistant", content: res.data.reply }
      ]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        { role: "assistant", content: " AI failed. Try again." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full 
        bg-gradient-to-br from-purple-600 to-indigo-600 
        text-white shadow-2xl flex items-center justify-center
        hover:scale-110 transition"
      >
        <Bot size={24} />
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[90vw]
        bg-white rounded-3xl shadow-2xl border overflow-hidden">

          {/* Header */}
          <div className="flex items-center justify-between p-4
          bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
            <div className="flex items-center gap-2">
              <Sparkles size={18} />
              <h3 className="font-semibold">AI Assistant</h3>
            </div>
            <button onClick={() => setOpen(false)}>
              <X />
            </button>
          </div>

          {/* Messages */}
          <div className="h-[300px] overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`max-w-[80%] p-3 rounded-2xl text-sm
                ${
                  msg.role === "user"
                    ? "ml-auto bg-indigo-600 text-white"
                    : "bg-white border"
                }`}
              >
                {msg.content}
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-gray-500">
                <Loader2 className="animate-spin" size={16} />
                AI is typing...
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-3 border-t flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Ask something..."
              className="flex-1 px-4 py-2 rounded-full border outline-none
              focus:ring-2 focus:ring-purple-500"
            />
            <button
              onClick={sendMessage}
              className="w-10 h-10 rounded-full bg-indigo-600 
              text-white flex items-center justify-center hover:scale-105"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}


