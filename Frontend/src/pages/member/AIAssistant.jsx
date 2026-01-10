import API from "../../api/axios";
import { useState } from "react";

export default function AIAssistant({ taskId }) {
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async (type) => {
    try {
      setLoading(true);
      const res = await API.post("/ai-assistant/task", {
        taskId,
        type,
      });
      setOutput(res.data.aiResult);
    } catch (err) {
      alert(err.response?.data?.msg || "AI failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-bold mb-2">AI Assistance</h3>

      <div className="flex gap-2 flex-wrap">
        <button onClick={() => askAI("explain")}>Explain</button>
        <button onClick={() => askAI("rewrite")}>Rewrite</button>
        <button onClick={() => askAI("priority")}>Priority</button>
        <button onClick={() => askAI("daily-summary")}>Daily Summary</button>
      </div>

      {loading && <p>Thinking...</p>}
      {output && <div className="mt-3 p-3 bg-gray-100 rounded">{output}</div>}
    </div>
  );
}
