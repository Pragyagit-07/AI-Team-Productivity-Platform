import API from "../../api/axios";
import { useState } from "react";
import {
  Sparkles,
  Wand2,
  AlertTriangle,
  CalendarCheck,
  Bot,
  Loader2,
  Copy,
  Trash2,
} from "lucide-react";

const MODES = [
  { id: "explain", label: "Explain", icon: AlertTriangle, desc: "Understand task" },
  { id: "rewrite", label: "Rewrite", icon: Wand2, desc: "Improve wording" },
  { id: "priority", label: "Priority", icon: Sparkles, desc: "AI importance" },
  { id: "daily-summary", label: "Summary", icon: CalendarCheck, desc: "Daily overview" },
];

export default function AIAssistant({ taskId }) {
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState("");

  const askAI = async (type) => {
    try {
      setActive(type);
      setLoading(true);
      setOutput("");
      const res = await API.post("/ai-assistant/task", { taskId, type });
      setOutput(res.data.aiResult);
    } catch (err) {
      alert(err.response?.data?.msg || "AI failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative max-w-4xl mx-auto mt-8">
      {/* Glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 rounded-3xl blur opacity-25" />

      {/* Card */}
      <div className="relative bg-white/80 backdrop-blur-xl  rounded-3xl shadow-2xl p-7">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white">
              <Bot />
            </div>
            <div>
              <h2 className="text-xl font-bold">AI Assistant</h2>
              <p className="text-sm text-gray-500">
                Think, rewrite & prioritize with AI
              </p>
            </div>
          </div>

          <span className="text-xs px-3 py-1 rounded-full bg-purple-100 text-purple-700 font-medium">
            AI POWERED
          </span>
        </div>

        {/* Mode selector */}
        <div className="flex flex-wrap gap-3 mb-6">
          {MODES.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => askAI(id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm transition-all
                ${
                  active === id
                    ? "bg-purple-600 text-white shadow-md scale-105"
                    : "bg-white hover:bg-purple-50 hover:border-purple-300"
                }`}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </div>

        {/* Output */}
        <div className="relative rounded-2xl border bg-gradient-to-br from-gray-50 to-gray-100 p-5 min-h-[180px]">
          {/* Output header */}
          {(output || loading) && (
            <div className="flex items-center justify-between mb-3 text-xs text-gray-500">
              <span>AI Response</span>
              <div className="flex gap-3">
                {output && (
                  <button
                    onClick={() => navigator.clipboard.writeText(output)}
                    className="hover:text-purple-600"
                  >
                    <Copy size={14} />
                  </button>
                )}
                {output && (
                  <button
                    onClick={() => setOutput("")}
                    className="hover:text-red-500"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            </div>
          )}

          {loading && (
            <div className="flex items-center gap-3 text-purple-600 font-medium">
              <Loader2 className="animate-spin" size={18} />
              AI is thinking deeply…
            </div>
          )}

          {!loading && !output && (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-400">
              <Bot size={30} className="mb-3 opacity-40" />
              Select a mode to let AI assist you
            </div>
          )}

          {!loading && output && (
            <div className="text-gray-800 whitespace-pre-line leading-relaxed">
              {output}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
