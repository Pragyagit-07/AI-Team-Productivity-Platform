import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import socket from "../../socket";
import API from "../../api/axios"; 

export default function MemberDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [onlineCount, setOnlineCount] = useState(0);
const [memberName, setMemberName] = useState("");


  const links = [
    {name: "Home", path: "/dashboard"},
    { name: "Projects", path: "/dashboard/projects" },
    { name: "Tasks", path: "/dashboard/tasks" },
    { name: "Calender", path: "/dashboard/calender"},
    { name: "Activity", path: "/dashboard/activity" },
    { name: "Subscriptions", path: "/dashboard/subscriptions" },
    { name: "AI Assistant", path: "/dashboard/ai" },
    { name: "Profile Setting", path: "/dashboard/profile" },
  ];
useEffect(() => {
  if (!socket.connected) {
    socket.connect();
  }

  // socket.on("user-online", (userId) => {
    // setOnlineUsers((prev) =>
      // prev.includes(userId) ? prev : [...prev, userId]
    // );
  // });

  // socket.on("user-offline", (userId) => {
    // setOnlineUsers((prev) => prev.filter((id) => id !== userId));
  // });
socket.on("online-count", (count) => {
  setOnlineCount(count);
});


  return () => {
    // socket.off("user-online");
    // socket.off("user-offline");
      socket.off("online-count");

  };
}, []);

useEffect(() => {
  API.get("/auth/me")
    .then(res => {
      setMemberName(res.data.name);
    })
    .catch(err => {
      console.error("ME ERROR:", err.response?.data);
      setMemberName("Member");
    });
}, []);


  const handleLogout = () => {
    // for socket
    socket.disconnect();
   localStorage.removeItem("memberToken");
   localStorage.removeItem("memberId");
    window.location.href = "/login";
  };
  

  return (
    
    <div className="flex min-h-screen w-full overflow-x-auto">
          <Sidebar
        links={links}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col">
        <Header
          // username="member"
            username={memberName}


          onLogout={handleLogout}
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
            showNotifications={true}
              // onlineCount={onlineUsers.length}
              onlineCount={onlineCount}


        />

       
        <main className="p-4 sm:p-6 bg-gray-100 flex-1 overflow-y-auto overflow-x-auto">

          {/* <Outlet />*/}
           <Outlet context={{ onlineUsers }} />
                   </main>
      </div>
    </div>
  );
}


