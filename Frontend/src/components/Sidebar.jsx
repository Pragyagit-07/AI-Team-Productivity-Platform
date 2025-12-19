// import { Link, useLocation } from "react-router-dom";

// export default function Sidebar({ links }) {
//   const location = useLocation();

//   return (
//     <div className="w-64 bg-white dark:bg-gray-800 shadow-md min-h-screen p-4">
//       <h2 className="text-2xl font-bold mb-6 text-indigo-600">Dashboard</h2>
//       <ul>
//         {links.map((link) => (
//           <li key={link.name} className={`mb-2 rounded hover:bg-indigo-100 ${location.pathname === link.path ? 'bg-indigo-200 font-semibold' : ''}`}>
//             <Link to={link.path} className="block px-4 py-2 text-blue-500 font-semibold">
//               {link.name}
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }


import { Link, useLocation } from "react-router-dom";

export default function Sidebar({ links, isOpen, onClose }) {
  const location = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <div
        className={`
          fixed md:static z-50
          w-64 bg-white dark:bg-gray-800 shadow-md min-h-screen p-4
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <h2 className="text-2xl font-bold mb-6 text-indigo-600">
          Dashboard
        </h2>

        <ul>
          {links.map((link) => (
            <li
              key={link.name}
              className={`mb-2 rounded hover:bg-indigo-100 ${
                location.pathname === link.path
                  ? "bg-indigo-200 font-semibold"
                  : ""
              }`}
            >
              <Link
                to={link.path}
                onClick={onClose} // close sidebar on mobile click
                className="block px-4 py-2 text-blue-500 font-semibold"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

