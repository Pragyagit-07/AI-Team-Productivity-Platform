import { useEffect, useState } from "react";
import API from "../../api/axios";
import {  
  Trash2,
  Edit3,
  FileText,
  MessageSquare,
  PlusCircle,
  Folder,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ACTION_UI = {
  task_created: { icon: PlusCircle, bubble: "bg-blue-500 text-white" },
  task_updated: { icon: Edit3, bubble: "bg-yellow-500 text-white" },
  task_deleted: { icon: Trash2, bubble: "bg-red-500 text-white" },
  project_updated: { icon: Folder, bubble: "bg-indigo-500 text-white" },
  project_deleted: { icon: Trash2, bubble: "bg-rose-500 text-white" },
  comment_added: { icon: MessageSquare, bubble: "bg-green-500 text-white" },
  file_uploaded: { icon: FileText, bubble: "bg-purple-500 text-white" },
};

export default function Activity() {
  const [activities, setActivities] = useState([]);
  
  useEffect(() => {
    loadActivities();
  }, []);

  const loadActivities = async () => {
    try {
      
      const res = await API.get("/activity");
      setActivities(res.data);
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <div className="p-6 min-h-screen bg-gray-100">
     <div className="relative max-w-4xl mx-auto">
        {/* Timeline line */}
        <div className="hidden md:block absolute left-5 top-0 bottom-0 w-px bg-gray-300" />
           <AnimatePresence>
          <div className="space-y-8">
            {activities.length === 0 && (
              <p className="text-center text-gray-500 mt-10">No activity yet</p>
            )}

            {activities.map((a, index) => {
              const ui = ACTION_UI[a.action] || ACTION_UI.task_updated;
              const Icon = ui.icon;

              return (
                <motion.div
                  key={a.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="flex flex-col md:flex-row md:items-start gap-4 relative"
                >
                  {/* Bubble */}
                  <div className="absolute md:relative -left-2 md:left-0 -top-1 md:top-0 flex items-center justify-center w-12 h-12 rounded-full shadow-lg animate-pulse">
                    <div className={`w-12 h-12 flex items-center justify-center rounded-full ${ui.bubble}`}>
                      <Icon size={20} />
                    </div>
                  </div>

                  {/* Card */}
                  <div className="flex-1 bg-white rounded-2xl p-4 shadow-md hover:shadow-xl transition duration-200 ml-10 md:ml-16">
                    <p className="text-sm text-gray-800 font-semibold">
                      {a.User?.name || "Someone"}{" "}
                      <span className="font-normal">{a.description}</span>
                    </p>
                    {a.Task && (
                      <p className="text-xs text-gray-500 mt-1">
                        Task: <span className="font-medium">{a.Task.title}</span>
                      </p>
                    )}
                    <p className="text-xs text-gray-400 mt-2">
                      {new Date(a.createdAt).toLocaleString()}
                    </p>
                   </div>
                </motion.div>
              );
            })}
          </div>
        </AnimatePresence>
      </div>
    </div>
  );
}
