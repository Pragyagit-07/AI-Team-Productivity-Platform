

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Folder, CheckCircle, Clock, Calendar as CalendarIcon } from "lucide-react";

// export default function MemberDashboardHome() {
//   const [stats, setStats] = useState({
//     projects: 0,
//     tasksPending: 0,
//     tasksDone: 0,
//     upcomingTasks: 0,
//   });

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     loadStats();
//   }, []);

//   const loadStats = async () => {
//     try {
//       const resProjects = await axios.get(`${import.meta.env.VITE_API_URL}/projects`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const projects = resProjects.data.projects || [];
//       let tasksPending = 0;
//       let tasksDone = 0;
//       let upcomingTasks = 0;

//       projects.forEach((p) => {
//         p.tasks?.forEach((t) => {
//           if (t.status === "done") tasksDone++;
//           else tasksPending++;
//           if (new Date(t.dueDate) > new Date()) upcomingTasks++;
//         });
//       });

//       setStats({ projects: projects.length, tasksPending, tasksDone, upcomingTasks });
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // Floating bubble colors & gradients
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

//       {/* Floating Bubble Area */}
//       <div className="relative max-w-6xl mx-auto flex flex-wrap justify-center gap-6">
//         {[...Array(12)].map((_, i) => (
//           <div
//             key={i}
//             className={`w-24 h-24 rounded-full flex items-center justify-center shadow-lg animate-bounce hover:scale-110 transform transition bg-gradient-to-tr ${bubbleColors[i % bubbleColors.length]}`}
//             style={{ animationDelay: `${i * 100}ms` }}
//           >
//             <span className="text-white font-bold text-lg">
//               {Math.floor(Math.random() * 10) + 1}
//             </span>
//           </div>
//         ))}
//       </div>

//       {/* Optional Mini Charts / Placeholders */}
//       <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {[...Array(3)].map((_, i) => (
//           <div
//             key={i}
//             className="bg-white p-4 rounded-2xl shadow hover:shadow-lg transition transform hover:-translate-y-1"
//           >
//             <div className="h-3 w-3 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 mb-2" />
//             <div className="h-4 bg-gray-300 rounded w-1/2 mb-1" />
//             <div className="h-4 bg-gray-200 rounded w-1/3" />
//             <div className="h-2 bg-gray-100 rounded w-3/4 mt-2" />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import axios from "axios";
import {
  Folder,
  CheckCircle,
  Clock,
  Calendar as CalendarIcon,
} from "lucide-react";

export default function MemberDashboardHome() {
  const [stats, setStats] = useState({
    projects: 0,
    tasksPending: 0,
    tasksDone: 0,
    upcomingTasks: 0,
  });
  const [projects, setProjects] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const resProjects = await axios.get(
        `${import.meta.env.VITE_API_URL}/projects`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const projectsData = resProjects.data.projects || [];
      setProjects(projectsData);

      let tasksPending = 0;
      let tasksDone = 0;
      let upcomingTasks = 0;

      projectsData.forEach((project) => {
        project.tasks?.forEach((task) => {
          if (task.status === "done") tasksDone++;
          else tasksPending++;
          if (new Date(task.dueDate) > new Date()) upcomingTasks++;
        });
      });

      setStats({
        projects: projectsData.length,
        tasksPending,
        tasksDone,
        upcomingTasks,
      });
    } catch (err) {
      console.error(err);
    }
  };

  // Floating bubble colors
  const bubbleColors = [
    "from-pink-400 to-red-500",
    "from-purple-400 to-indigo-500",
    "from-yellow-400 to-orange-500",
    "from-green-400 to-teal-500",
    "from-blue-400 to-indigo-500",
  ];

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      {/* Top Stats Bubbles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {/* Projects */}
        <div className="relative flex items-center justify-center w-full h-40 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 shadow-xl hover:scale-105 transform transition">
          <Folder size={48} className="text-white absolute top-4 left-4" />
          <div className="flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-white">{stats.projects}</span>
            <span className="text-white text-sm mt-1">Projects</span>
          </div>
        </div>

        {/* Pending Tasks */}
        <div className="relative flex items-center justify-center w-full h-40 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-xl hover:scale-105 transform transition">
          <Clock size={48} className="text-white absolute top-4 left-4" />
          <div className="flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-white">{stats.tasksPending}</span>
            <span className="text-white text-sm mt-1">Pending</span>
          </div>
        </div>

        {/* Completed Tasks */}
        <div className="relative flex items-center justify-center w-full h-40 rounded-full bg-gradient-to-br from-green-400 to-green-600 shadow-xl hover:scale-105 transform transition">
          <CheckCircle size={48} className="text-white absolute top-4 left-4" />
          <div className="flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-white">{stats.tasksDone}</span>
            <span className="text-white text-sm mt-1">Completed</span>
          </div>
        </div>

        {/* Upcoming Tasks */}
        <div className="relative flex items-center justify-center w-full h-40 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 shadow-xl hover:scale-105 transform transition">
          <CalendarIcon size={48} className="text-white absolute top-4 left-4" />
          <div className="flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-white">{stats.upcomingTasks}</span>
            <span className="text-white text-sm mt-1">Upcoming</span>
          </div>
        </div>
      </div>

      {/* Floating Bubbles: Tasks per Project */}
      <h3 className="text-xl font-semibold mb-4 text-gray-700">Project Task Overview</h3>
      <div className="relative max-w-6xl mx-auto flex flex-wrap justify-center gap-6 mb-12">
        {projects.map((project, i) => (
          <div
            key={project.id}
            className={`w-28 h-28 rounded-full flex flex-col items-center justify-center shadow-lg transform hover:scale-110 transition bg-gradient-to-tr ${bubbleColors[i % bubbleColors.length]}`}
          >
            <span className="text-white font-bold text-lg">{project.tasks?.length || 0}</span>
            <span className="text-white text-xs text-center">{project.name}</span>
          </div>
        ))}
      </div>

      {/* Mini Charts / Task Completion Bars per Project */}
      <h3 className="text-xl font-semibold mb-4 text-gray-700">Task Completion</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => {
          const totalTasks = project.tasks?.length || 0;
          const completedTasks = project.tasks?.filter((t) => t.status === "done").length || 0;
          const progressPercent = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

          return (
            <div
              key={project.id}
              className="bg-white p-4 rounded-2xl shadow hover:shadow-lg transition transform hover:-translate-y-1"
            >
              <div className="text-sm font-semibold text-gray-600 mb-2">{project.name}</div>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                <div
                  className="bg-gradient-to-r from-green-400 to-teal-500 h-3 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
              <div className="text-xs text-gray-500">{completedTasks}/{totalTasks} tasks done</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
