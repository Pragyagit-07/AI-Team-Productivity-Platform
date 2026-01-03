// // import { useEffect, useState } from "react";
// // import API from "../../api/axios";
// // import { motion } from "framer-motion";
// // import {
// //   Folder,
// //   CheckCircle,
// //   Clock,
// //   Calendar as CalendarIcon,
// //   Crown,
// // } from "lucide-react";

// // export default function MemberDashboardHome() {
// //   const [stats, setStats] = useState({
// //     projects: 0,
// //     tasksPending: 0,
// //     tasksDone: 0,
// //     upcomingTasks: 0,
// //   });

// //   const [projects, setProjects] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     loadDashboard();
// //   }, []);

// //   const loadDashboard = async () => {
// //     try {
// //       const res = await API.get("/dashboard");
// //       const data = res.data;

// //       setStats({
// //         projects: data.projectsCount || 0,
// //         tasksPending: data.tasks?.todo || 0,
// //         tasksDone: data.tasks?.done || 0,
// //         upcomingTasks: data.tasks?.inprogress || 0,
// //       });

// //       setProjects(data.projects || []);
// //     } catch (err) {
// //       console.error("Dashboard error:", err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const cards = [
// //     {
// //       label: "Projects",
// //       value: stats.projects,
// //       icon: Folder,
// //       color: "from-blue-400 to-blue-600",
// //     },
// //     {
// //       label: "Pending",
// //       value: stats.tasksPending,
// //       icon: Clock,
// //       color: "from-yellow-400 to-yellow-600",
// //     },
// //     {
// //       label: "Completed",
// //       value: stats.tasksDone,
// //       icon: CheckCircle,
// //       color: "from-green-400 to-green-600",
// //     },
// //     {
// //       label: "In Progress",
// //       value: stats.upcomingTasks,
// //       icon: CalendarIcon,
// //       color: "from-purple-400 to-purple-600",
// //     },
// //   ];

// //   if (loading) {
// //     return (
// //       <div className="flex items-center justify-center h-[70vh]">
// //         <motion.div
// //           animate={{ rotate: 360 }}
// //           transition={{ repeat: Infinity, duration: 1 }}
// //           className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
// //         />
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="p-6 min-h-screen bg-gray-100 space-y-12">

// //       {/* 🔥 TOP STATS */}
// //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
// //         {cards.map((card, i) => {
// //           const Icon = card.icon;
// //           return (
// //             <motion.div
// //               key={card.label}
// //               initial={{ opacity: 0, y: 30 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               transition={{ delay: i * 0.1 }}
// //               whileHover={{ scale: 1.05 }}
// //               className={`relative h-36 rounded-3xl shadow-xl text-white bg-gradient-to-br ${card.color} flex items-center justify-center`}
// //             >
// //               <Icon className="absolute top-4 left-4 opacity-80" size={40} />
// //               <div className="text-center">
// //                 <div className="text-3xl font-bold">{card.value}</div>
// //                 <div className="text-sm mt-1">{card.label}</div>
// //               </div>
// //             </motion.div>
// //           );
// //         })}
// //       </div>

// //       {/* 📌 PROJECT OVERVIEW */}
// //       <div>
// //         <h2 className="text-xl font-semibold text-gray-700 mb-4">
// //           Project Overview
// //         </h2>

// //         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
// //           {projects.map((project, i) => {
// //             const progress =
// //               project.tasksCount > 0
// //                 ? (project.completedTasks / project.tasksCount) * 100
// //                 : 0;

// //             return (
// //               <motion.div
// //                 key={project.id}
// //                 initial={{ opacity: 0, y: 40 }}
// //                 animate={{ opacity: 1, y: 0 }}
// //                 transition={{ delay: i * 0.1 }}
// //                 whileHover={{ y: -6 }}
// //                 className="bg-white rounded-2xl shadow-lg p-5 relative"
// //               >
// //                 {/* TEAM LEAD BADGE */}
// //                 {project.isTeamLead && (
// //                   <div className="absolute top-3 right-3 flex items-center gap-1 text-xs text-yellow-600 font-semibold">
// //                     <Crown size={14} />
// //                     Team Lead
// //                   </div>
// //                 )}

// //                 <h3 className="font-semibold text-gray-800 mb-1">
// //                   {project.name}
// //                 </h3>

// //                 {!project.isTeamLead && (
// //                   <p className="text-xs text-gray-500 mb-3">
// //                     Lead: {project.teamLead.name}
// //                   </p>
// //                 )}

// //                 {/* TASK COUNTS */}
// //                 <div className="flex justify-between text-xs text-gray-600 mb-2">
// //                   <span>Pending: {project.pendingTasks}</span>
// //                   <span>In Progress: {project.inProgressTasks}</span>
// //                   <span>Done: {project.completedTasks}</span>
// //                 </div>

// //                 {/* PROGRESS BAR */}
// //                 <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
// //                   <motion.div
// //                     initial={{ width: 0 }}
// //                     animate={{ width: `${progress}%` }}
// //                     transition={{ duration: 0.6 }}
// //                     className="h-full bg-gradient-to-r from-green-400 to-teal-500"
// //                   />
// //                 </div>

// //                 <p className="text-xs text-gray-500 mt-2">
// //                   {project.completedTasks}/{project.tasksCount} tasks completed
// //                 </p>
// //               </motion.div>
// //             );
// //           })}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }


// import { useEffect, useState } from "react";
// import API from "../../api/axios";
// import { motion } from "framer-motion";
// import {
//   Folder,
//   CheckCircle,
//   Clock,
//   Calendar as CalendarIcon,
//   Crown,
// } from "lucide-react";

// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
// } from "recharts";

// export default function MemberDashboardHome() {
//   const [stats, setStats] = useState({
//     projects: 0,
//     tasksPending: 0,
//     tasksDone: 0,
//     upcomingTasks: 0,
//   });

//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadDashboard();
//   }, []);

//   const loadDashboard = async () => {
//     try {
//       const res = await API.get("/dashboard");
//       const data = res.data;

//       setStats({
//         projects: data.projectsCount || 0,
//         tasksPending: data.tasks?.todo || 0,
//         tasksDone: data.tasks?.done || 0,
//         upcomingTasks: data.tasks?.inprogress || 0,
//       });

//       setProjects(data.projects || []);
//     } catch (err) {
//       console.error("Dashboard error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const cards = [
//     {
//       label: "Projects",
//       value: stats.projects,
//       icon: Folder,
//       color: "from-blue-400 to-blue-600",
//     },
//     {
//       label: "Pending",
//       value: stats.tasksPending,
//       icon: Clock,
//       color: "from-yellow-400 to-yellow-600",
//     },
//     {
//       label: "Completed",
//       value: stats.tasksDone,
//       icon: CheckCircle,
//       color: "from-green-400 to-green-600",
//     },
//     {
//       label: "In Progress",
//       value: stats.upcomingTasks,
//       icon: CalendarIcon,
//       color: "from-purple-400 to-purple-600",
//     },
//   ];

//   const taskChartData = [
//     { name: "Pending", value: stats.tasksPending ,  },
//     { name: "In Progress", value: stats.upcomingTasks },
//     { name: "Completed", value: stats.tasksDone },
//   ];

//   const COLORS = ["#facc15", "#a855f7", "#22c55e"];

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-[70vh]">
//         <motion.div
//           animate={{ rotate: 360 }}
//           transition={{ repeat: Infinity, duration: 1 }}
//           className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full"
//         />
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 min-h-screen bg-red-100 space-y-12">

//       {/* 🔥 TOP STATS */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {cards.map((card, i) => {
//           const Icon = card.icon;
//           return (
//             <motion.div
//               key={card.label}
//               initial={{ opacity: 0, y: 40 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: i * 0.1 }}
//               whileHover={{ scale: 1.05 }}
//               className={`relative h-36 rounded-3xl shadow-xl text-white bg-gradient-to-br ${card.color} flex items-center justify-center`}
//             >
//               <Icon className="absolute top-4 left-4 opacity-80" size={40} />
//               <div className="text-center">
//                 <div className="text-3xl font-bold">{card.value}</div>
//                 <div className="text-sm mt-1">{card.label}</div>
//               </div>
//             </motion.div>
//           );
//         })}
//       </div>

//       {/* 📊 TASK ANALYTICS */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         {/* PIE CHART */}
//         <motion.div
//           initial={{ opacity: 0, x: -40 }}
//           animate={{ opacity: 1, x: 0 }}
//           className="bg-white rounded-2xl shadow p-6"
//         >
//           <h2 className="text-lg font-semibold text-gray-700 mb-4">
//             Task Status Overview
//           </h2>

//           <ResponsiveContainer width="100%" height={280}>
//             <PieChart>
//               <Pie
//                 data={taskChartData}
//                 dataKey="value"
//                 innerRadius={70}
//                 outerRadius={110}
//                 paddingAngle={5}
//               >
//                 {taskChartData.map((_, index) => (
//                   <Cell key={index} fill={COLORS[index]} />
//                 ))}
//               </Pie>
//               <Tooltip />
//             </PieChart>
//           </ResponsiveContainer>
//         </motion.div>

//         {/* BAR CHART */}
//         <motion.div
//           initial={{ opacity: 0, x: 40 }}
//           animate={{ opacity: 1, x: 0 }}
//           className="bg-white rounded-2xl shadow p-6"
//         >
//           <h2 className="text-lg font-semibold text-gray-700 mb-4">
//             Task Distribution
//           </h2>

//           <ResponsiveContainer width="100%" height={280}>
//             <BarChart data={taskChartData}>
//               <XAxis dataKey="name" />
//               <YAxis />
//               <Tooltip />
//               <Bar dataKey="value" radius={[5, 8, 0, 0]} />
//             </BarChart>
//           </ResponsiveContainer>
//         </motion.div>
//       </div>

//       {/* 📌 PROJECT OVERVIEW */}
//       <div>
//         <h2 className="text-xl font-semibold text-gray-700 mb-4">
//           Project Overview
//         </h2>

//         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 ">
//           {projects.map((project, i) => {
//             const progress =
//               project.tasksCount > 0
//                 ? (project.completedTasks / project.tasksCount) * 100
//                 : 0;

//             return (
//               <motion.div
//                 key={project.id}
//                 initial={{ opacity: 0, y: 40 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: i * 0.1 }}
//                 whileHover={{ y: -6 }}
//                 className="bg-white rounded-2xl shadow-lg p-5 relative"
//               >
//                 {project.isTeamLead && (
//                   <div className="absolute top-3 right-3 flex items-center gap-1 text-xs text-yellow-600 font-semibold">
//                     <Crown size={14} />
//                     Team Lead
//                   </div>
//                 )}

//                 <h3 className="font-semibold text-gray-800 mb-1">
//                   {project.name}
//                 </h3>

//                 {!project.isTeamLead && (
//                   <p className="text-xs text-gray-500 mb-3">
//                     Lead: {project.teamLead.name}
//                   </p>
//                 )}

//                 <div className="flex justify-between text-xs text-gray-600 mb-2">
//                   <span>Pending: {project.pendingTasks}</span>
//                   <span>In Progress: {project.inProgressTasks}</span>
//                   <span>Done: {project.completedTasks}</span>
//                 </div>

//                 <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
//                   <motion.div
//                     initial={{ width: 0 }}
//                     animate={{ width: `${progress}%` }}
//                     transition={{ duration: 0.6 }}
//                     className="h-full bg-gradient-to-r from-green-400 to-teal-500"
//                   />
//                 </div>

//                 <p className="text-xs text-gray-500 mt-2">
//                   {project.completedTasks}/{project.tasksCount} tasks completed
//                 </p>
//               </motion.div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }







import { useEffect, useState } from "react";
import API from "../../api/axios";
import { motion } from "framer-motion";
import { Folder, CheckCircle, Clock, Calendar as CalendarIcon, Crown } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

export default function MemberDashboardHome() {
  const [stats, setStats] = useState({
    projects: 0,
    tasksPending: 0,
    tasksDone: 0,
    tasksInProgress: 0,
  });
  const [projects, setProjects] = useState([]);
  const [taskHistory, setTaskHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const PIE_COLORS = ["#FF6384", "#36A2EB", "#FFCE56"];

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
        tasksInProgress: data.tasks?.inprogress || 0,
      });

      setProjects(
        (data.projects || []).map((p) => ({
          ...p,
          sparkline:
            p.taskHistory || [
              { day: "Mon", completed: 0 },
              { day: "Tue", completed: 0 },
              { day: "Wed", completed: 0 },
              { day: "Thu", completed: 0 },
              { day: "Fri", completed: 0 },
              { day: "Sat", completed: 0 },
              { day: "Sun", completed: 0 },
            ],
        }))
      );

      setTaskHistory(data.taskHistory || [
        { date: "Mon", tasks: 2 },
        { date: "Tue", tasks: 4 },
        { date: "Wed", tasks: 5 },
        { date: "Thu", tasks: 7 },
        { date: "Fri", tasks: 6 },
        { date: "Sat", tasks: 8 },
        { date: "Sun", tasks: 10 },
      ]);
    } catch (err) {
      console.error("Dashboard load error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  const cards = [
    { label: "Projects", value: stats.projects, icon: Folder, color: "from-blue-400 to-blue-600" },
    { label: "Pending", value: stats.tasksPending, icon: Clock, color: "from-yellow-400 to-yellow-600" },
    { label: "Completed", value: stats.tasksDone, icon: CheckCircle, color: "from-green-400 to-green-600" },
    { label: "In Progress", value: stats.tasksInProgress, icon: CalendarIcon, color: "from-purple-400 to-purple-600" },
  ];

  return (
    <div className="p-4 md:p-6 min-h-screen bg-gray-100 space-y-10">

      {/* Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className={`relative h-36 rounded-3xl shadow-xl text-white bg-gradient-to-br ${card.color} flex items-center justify-center`}
            >
              <Icon className="absolute top-4 left-4 opacity-70" size={36} />
              <div className="text-center">
                <div className="text-3xl font-bold">{card.value}</div>
                <div className="text-sm mt-1">{card.label}</div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Weekly Task Trend (Line Chart) */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Weekly Task Trend</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={taskHistory}>
            <XAxis dataKey="date" stroke="#8884d8" />
            <YAxis stroke="#8884d8" />
            <Tooltip />
            <Line type="monotone" dataKey="tasks" stroke="#4f46e5" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 7 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Projects */}
      <div>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Projects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((project, i) => {
            const progress = project.tasksCount > 0 ? (project.completedTasks / project.tasksCount) * 100 : 0;
            const pieData = [
              { name: "Pending", value: project.pendingTasks },
              { name: "In Progress", value: project.inProgressTasks },
              { name: "Done", value: project.completedTasks },
            ];

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="bg-white rounded-2xl shadow-lg p-5 relative flex flex-col gap-3"
              >
                {project.isTeamLead && (
                  <div className="absolute top-3 right-3 flex items-center gap-1 text-xs text-yellow-600 font-semibold">
                    <Crown size={14} /> Team Lead
                  </div>
                )}

                <h3 className="font-semibold text-gray-800">{project.name}</h3>
                {!project.isTeamLead && <p className="text-xs text-gray-500 mb-2">Lead: {project.teamLead.name}</p>}

                {/* Pie Chart always visible */}
                <div className="w-full h-28">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={25} outerRadius={45} paddingAngle={3} label>
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Mini Sparkline chart */}
          
                {/* Progress Bar */}
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mt-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.8 }}
                    className="h-full bg-gradient-to-r from-green-400 to-teal-500"
                  />
                </div>

                <p className="text-xs text-gray-500 mt-1">{project.completedTasks}/{project.tasksCount} tasks completed</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
