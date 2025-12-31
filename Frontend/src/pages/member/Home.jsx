// import { useEffect, useState } from "react";
// import API from "../../api/axios";
// import {
//   Folder,
//   CheckCircle,
//   Clock,
//   Calendar as CalendarIcon,
// } from "lucide-react";

// export default function MemberDashboardHome() {
//   const [stats, setStats] = useState({
//     projects: 0,
//     tasksPending: 0,
//     tasksDone: 0,
//     upcomingTasks: 0,
//   });
//   const [projects, setProjects] = useState([]);
  

//   useEffect(() => {
//     loadStats();
//   }, []);

//   const loadStats = async () => {
//     try {
        
//                 const res = await API.get("/projects/with-tasks");
//                 const projectsData = res.data || [];
//                  setProjects(projectsData);

//       let tasksPending = 0;
//       let tasksDone = 0;
//       let upcomingTasks = 0;

//       projectsData.forEach((project) => {
//         project.tasks?.forEach((task) => {
//           if (task.status === "done") tasksDone++;
//           else tasksPending++;
//           if (new Date(task.dueDate) > new Date()) upcomingTasks++;
//         });
//       });

//       setStats({
//         projects: projectsData.length,
//         tasksPending,
//         tasksDone,
//         upcomingTasks,
//       });
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // Floating bubble colors
//   const bubbleColors = [
//     "from-pink-400 to-red-500",
//     "from-purple-400 to-indigo-500",
//     "from-yellow-400 to-orange-500",
//     "from-green-400 to-teal-500",
//     "from-blue-400 to-indigo-500",
//   ];

//   return (
//     <div className="p-6 min-h-screen bg-gray-100">
//       {/* Top Stats Bubbles */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
//         {/* Projects */}
//         <div className="relative flex items-center justify-center w-full h-40 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 shadow-xl hover:scale-105 transform transition">
//           <Folder size={48} className="text-white absolute top-4 left-4" />
//           <div className="flex flex-col items-center justify-center">
//             <span className="text-3xl font-bold text-white">{stats.projects}</span>
//             <span className="text-white text-sm mt-1">Projects</span>
//           </div>
//         </div>

//         {/* Pending Tasks */}
//         <div className="relative flex items-center justify-center w-full h-40 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-xl hover:scale-105 transform transition">
//           <Clock size={48} className="text-white absolute top-4 left-4" />
//           <div className="flex flex-col items-center justify-center">
//             <span className="text-3xl font-bold text-white">{stats.tasksPending}</span>
//             <span className="text-white text-sm mt-1">Pending</span>
//           </div>
//         </div>

//         {/* Completed Tasks */}
//         <div className="relative flex items-center justify-center w-full h-40 rounded-full bg-gradient-to-br from-green-400 to-green-600 shadow-xl hover:scale-105 transform transition">
//           <CheckCircle size={48} className="text-white absolute top-4 left-4" />
//           <div className="flex flex-col items-center justify-center">
//             <span className="text-3xl font-bold text-white">{stats.tasksDone}</span>
//             <span className="text-white text-sm mt-1">Completed</span>
//           </div>
//         </div>

//         {/* Upcoming Tasks */}
//         <div className="relative flex items-center justify-center w-full h-40 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 shadow-xl hover:scale-105 transform transition">
//           <CalendarIcon size={48} className="text-white absolute top-4 left-4" />
//           <div className="flex flex-col items-center justify-center">
//             <span className="text-3xl font-bold text-white">{stats.upcomingTasks}</span>
//             <span className="text-white text-sm mt-1">Upcoming</span>
//           </div>
//         </div>
//       </div>

//       {/* Floating Bubbles: Tasks per Project */}
//       <h3 className="text-xl font-semibold mb-4 text-gray-700">Project Task Overview</h3>
//       <div className="relative max-w-6xl mx-auto flex flex-wrap justify-center gap-6 mb-12">
//         {projects.map((project, i) => (
//           <div
//             key={project.id}
//             className={`w-28 h-28 rounded-full flex flex-col items-center justify-center shadow-lg transform hover:scale-110 transition bg-gradient-to-tr ${bubbleColors[i % bubbleColors.length]}`}
//           >
//             <span className="text-white font-bold text-lg">{project.tasks?.length || 0}</span>
//             <span className="text-white text-xs text-center">{project.name}</span>
//           </div>
//         ))}
//       </div>

//       {/* Mini Charts / Task Completion Bars per Project */}
//       <h3 className="text-xl font-semibold mb-4 text-gray-700">Task Completion</h3>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {projects.map((project) => {
//           const totalTasks = project.tasks?.length || 0;
//           const completedTasks = project.tasks?.filter((t) => t.status === "done").length || 0;
//           const progressPercent = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

//           return (
//             <div
//               key={project.id}
//               className="bg-white p-4 rounded-2xl shadow hover:shadow-lg transition transform hover:-translate-y-1"
//             >
//               <div className="text-sm font-semibold text-gray-600 mb-2">{project.name}</div>
//               <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
//                 <div
//                   className="bg-gradient-to-r from-green-400 to-teal-500 h-3 rounded-full"
//                   style={{ width: `${progressPercent}%` }}
//                 ></div>
//               </div>
//               <div className="text-xs text-gray-500">{completedTasks}/{totalTasks} tasks done</div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }




import { useEffect, useState } from "react";
import API from "../../api/axios";
import { motion } from "framer-motion";
import {
  Folder,
  CheckCircle,
  Clock,
  Calendar as CalendarIcon,
  Crown,
} from "lucide-react";

export default function MemberDashboardHome() {
  const [stats, setStats] = useState({
    projects: 0,
    tasksPending: 0,
    tasksDone: 0,
    upcomingTasks: 0,
  });

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const res = await API.get("/dashboard");
      const data = res.data;

      setStats({
        projects: data.projectsCount || 0,
        tasksPending: data.tasks?.todo || 0,
        tasksDone: data.tasks?.done || 0,
        upcomingTasks: data.tasks?.inprogress || 0,
      });

      setProjects(data.projects || []);
    } catch (err) {
      console.error("Dashboard error:", err);
    } finally {
      setLoading(false);
    }
  };

  const cards = [
    {
      label: "Projects",
      value: stats.projects,
      icon: Folder,
      color: "from-blue-400 to-blue-600",
    },
    {
      label: "Pending",
      value: stats.tasksPending,
      icon: Clock,
      color: "from-yellow-400 to-yellow-600",
    },
    {
      label: "Completed",
      value: stats.tasksDone,
      icon: CheckCircle,
      color: "from-green-400 to-green-600",
    },
    {
      label: "In Progress",
      value: stats.upcomingTasks,
      icon: CalendarIcon,
      color: "from-purple-400 to-purple-600",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-gray-100 space-y-12">

      {/* 🔥 TOP STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className={`relative h-36 rounded-3xl shadow-xl text-white bg-gradient-to-br ${card.color} flex items-center justify-center`}
            >
              <Icon className="absolute top-4 left-4 opacity-80" size={40} />
              <div className="text-center">
                <div className="text-3xl font-bold">{card.value}</div>
                <div className="text-sm mt-1">{card.label}</div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* 📌 PROJECT OVERVIEW */}
      <div>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Project Overview
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((project, i) => {
            const progress =
              project.tasksCount > 0
                ? (project.completedTasks / project.tasksCount) * 100
                : 0;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="bg-white rounded-2xl shadow-lg p-5 relative"
              >
                {/* TEAM LEAD BADGE */}
                {project.isTeamLead && (
                  <div className="absolute top-3 right-3 flex items-center gap-1 text-xs text-yellow-600 font-semibold">
                    <Crown size={14} />
                    Team Lead
                  </div>
                )}

                <h3 className="font-semibold text-gray-800 mb-1">
                  {project.name}
                </h3>

                {!project.isTeamLead && (
                  <p className="text-xs text-gray-500 mb-3">
                    Lead: {project.teamLead.name}
                  </p>
                )}

                {/* TASK COUNTS */}
                <div className="flex justify-between text-xs text-gray-600 mb-2">
                  <span>Pending: {project.pendingTasks}</span>
                  <span>In Progress: {project.inProgressTasks}</span>
                  <span>Done: {project.completedTasks}</span>
                </div>

                {/* PROGRESS BAR */}
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.6 }}
                    className="h-full bg-gradient-to-r from-green-400 to-teal-500"
                  />
                </div>

                <p className="text-xs text-gray-500 mt-2">
                  {project.completedTasks}/{project.tasksCount} tasks completed
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
