// import API from "../../api/axios";
// import { useState } from "react";
// import {
//   Sparkles,
//   Wand2,
//   AlertTriangle,
//   CalendarCheck,
//   Bot,
//   Loader2,
// } from "lucide-react";

// export default function AIAssistant({ taskId }) {
//   const [output, setOutput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [active, setActive] = useState("");
//   const askAI = async (type) => {
//     try {
//       setActive(type);
//       setLoading(true);
//       setOutput("");
//       const res = await API.post("/ai-assistant/task", { taskId, type });
//       setOutput(res.data.aiResult);
//     } catch (err) {
//       alert(err.response?.data?.msg || "AI failed");
//     } finally {
//       setLoading(false);
//       setActive("");
//     }
//   };

//   return (
//     <div className="relative max-w-3xl mx-auto mt-6">
//       {/* Floating glow */}
//       <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 rounded-3xl blur opacity-30"></div>
//       {/* Main glass card */}
//       <div className="relative bg-white/80 backdrop-blur-xl border rounded-3xl shadow-xl p-6">
//         {/* Header */}
//         <div className="flex items-center gap-3 mb-6">
//           <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 text-white shadow-lg">
//             <Bot size={22} />
//           </div>
//           <div>
//             <h2 className="text-xl font-bold">AI Assistant</h2>
//             <p className="text-sm text-gray-500">
//               Smart help for this task
//             </p>
//           </div>
//         </div>

//         {/* Actions */}
//         <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
//           <Action
//             title="Explain"
//             desc="Understand task"
//             icon={<AlertTriangle size={18} />}
//             active={active === "explain"}
//             onClick={() => askAI("explain")}
//           />
//           <Action
//             title="Rewrite"
//             desc="Improve wording"
//             icon={<Wand2 size={18} />}
//             active={active === "rewrite"}
//             onClick={() => askAI("rewrite")}
//           />
//           <Action
//             title="Priority"
//             desc="AI importance"
//             icon={<Sparkles size={18} />}
//             active={active === "priority"}
//             onClick={() => askAI("priority")}
//           />
//           <Action
//             title="Summary"
//             desc="Daily overview"
//             icon={<CalendarCheck size={18} />}
//             active={active === "daily-summary"}
//             onClick={() => askAI("daily-summary")}
//           />
//         </div>

//         {/* Output area */}
//         <div className="relative min-h-[160px] rounded-2xl border bg-gradient-to-br from-gray-50 to-gray-100 p-5 text-sm leading-relaxed">
//           {loading && (
//             <div className="flex items-center gap-3 text-purple-600 font-medium">
//               <Loader2 className="animate-spin" size={18} />
//               AI is thinking...
//             </div>
//           )}

//           {!loading && !output && (
//             <div className="flex flex-col items-center justify-center text-gray-400 h-full text-center">
//               <Bot size={28} className="mb-2 opacity-40" />
//               Ask AI to help you understand or improve this task
//             </div>
//           )}

//           {!loading && output && (
//             <div className="text-gray-800 whitespace-pre-line">
//               {output}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// /* Action Button */
// function Action({ title, desc, icon, onClick, active }) {
//   return (
//     <button
//       onClick={onClick}
//       className={`group relative rounded-2xl border p-4 text-left transition-all
//         ${
//           active
//             ? "bg-gradient-to-br from-purple-600 to-indigo-600 text-white shadow-lg scale-105"
//             : "bg-white hover:shadow-md hover:-translate-y-1"
//         }`}
//     >
//       <div
//         className={`mb-3 w-10 h-10 flex items-center justify-center rounded-xl
//           ${
//             active
//               ? "bg-white/20"
//               : "bg-purple-100 text-purple-600"
//           }`}
//       >
//         {icon}
//       </div>
//       <h4 className="font-semibold">{title}</h4>
//       <p
//         className={`text-xs mt-1 ${
//           active ? "text-purple-100" : "text-gray-500"
//         }`}
//       >
//         {desc}
//       </p>
//     </button>
//   );
// }



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
