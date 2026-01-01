
// // import { Menu } from "lucide-react";

// // export default function Header({ username, onLogout, onMenuClick }) {
// //   return (
// //     <div className="flex justify-between items-center bg-white shadow p-4">
// //       <div className="flex items-center gap-4">
// //         {/* Hamburger (mobile only) */}
// //         <button
// //           onClick={onMenuClick}
// //           className="lg:hidden"
// //         >
// //           <Menu size={24} />
// //         </button>

// //         <h1 className="text-xl font-bold">
// //           Welcome, {username}
// //         </h1>
// //       </div>

// //       <button
// //         onClick={onLogout}
// //         className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
// //       >
// //         Logout
// //       </button>
// //     </div>
// //   );
// // }


// import { Menu, Bell } from "lucide-react";
// import { useEffect, useState } from "react";
// import API from "../api/axios";

// export default function Header({ username, onLogout, onMenuClick }) {
//   const [requests, setRequests] = useState([]);
//   const [open, setOpen] = useState(false);

//   useEffect(() => {
//     API.get("/project-requests/my-invitations").then(res => {
//       setRequests(res.data || []);
//     });
//   }, []);

//   return (
//     <div className="flex justify-between items-center bg-white shadow p-4">
//       <div className="flex items-center gap-4">
//         <button onClick={onMenuClick} className="lg:hidden">
//           <Menu size={24} />
//         </button>
//         <h1 className="text-xl font-bold">Welcome, {username}</h1>
//       </div>

//       <div className="flex items-center gap-4 relative">
//         {/* 🔔 NOTIFICATION */}
//         <button onClick={() => setOpen(!open)} className="relative">
//           <Bell />
//           {requests.length > 0 && (
//             <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
//               {requests.length}
//             </span>
//           )}
//         </button>

//         {/* DROPDOWN */}
//         {open && (
//           <div className="absolute right-0 top-12 w-80 bg-white shadow-lg rounded p-3 z-50">
//             <h4 className="font-semibold mb-2">Join Requests</h4>

//             {requests.length === 0 && (
//               <p className="text-sm text-gray-500">No requests</p>
//             )}

//             {requests.map(r => (
//               <div key={r.id} className="flex justify-between items-center mb-2">
//                 {/* <span className="text-sm">{r.user.name}</span> */}
//                 <span className="text-sm">
//   Invitation to join <b>{r.project?.name}</b>
// </span>

//                 <div className="flex gap-2">
//                   <button
//                     onClick={() =>
//                       API.put(`/project-requests/${r.id}`, { action: "accept" })
//                     }
//                     className="bg-green-500 text-white px-2 rounded"
//                   >
//                     ✓
//                   </button>
//                   <button
//                     onClick={() =>
//                       API.put(`/project-requests/${r.id}`, { action: "decline" })
//                     }
//                     className="bg-red-500 text-white px-2 rounded"
//                   >
//                     ✕
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         <button
//           onClick={onLogout}
//           className="bg-red-500 text-white px-4 py-2 rounded"
//         >
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// }




import { Menu, Bell } from "lucide-react";
import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Header({ username, onLogout, onMenuClick ,   showNotifications = false
}) {
  const [requests, setRequests] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    API.get("/project-requests/my-invitations")
      .then(res => setRequests(res.data || []))
      .catch(() => setRequests([]));
  }, []);

  return (
    <div className="flex justify-between items-center bg-white shadow p-4">
      <div className="flex items-center gap-4">
        <button onClick={onMenuClick} className="lg:hidden">
          <Menu size={24} />
        </button>
        <h1 className="text-xl font-bold">Welcome, {username}</h1>
      </div>

      <div className="flex items-center gap-4 relative">
        {/* 🔔 Notification */}
       {/* <button onClick={() => setOpen(!open)} className="relative">
          <Bell />
          {requests.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
              {requests.length}
            </span>
          )}
        </button>
        */}
        {showNotifications && (
  <button onClick={() => setOpen(!open)} className="relative">
    <Bell />
    {requests.length > 0 && (
      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">
        {requests.length}
      </span>
    )}
  </button>
)}


        {/* Dropdown */}
        { showNotifications && open && (
          <div className="absolute right-0 top-12 w-80 bg-white shadow-lg rounded p-3 z-50">
            <h4 className="font-semibold mb-2">Invitations</h4>

            {requests.length === 0 && (
              <p className="text-sm text-gray-500">No invitations</p>
            )}

            {requests.map(r => (
              <div
                key={r.id}
                className="flex justify-between items-center mb-2"
              >
                <span className="text-sm">
                  Invitation to join <b>{r.project?.name}</b>
                </span>

                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      API.put(`/project-requests/${r.id}`, {
                        action: "accept",
                      }).then(() =>
                        setRequests(prev =>
                          prev.filter(x => x.id !== r.id)
                        )
                      )
                    }
                    className="bg-green-500 text-white px-2 rounded"
                  >
                    ✓
                  </button>

                  <button
                    onClick={() =>
                      API.put(`/project-requests/${r.id}`, {
                        action: "decline",
                      }).then(() =>
                        setRequests(prev =>
                          prev.filter(x => x.id !== r.id)
                        )
                      )
                    }
                    className="bg-red-500 text-white px-2 rounded"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={onLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
