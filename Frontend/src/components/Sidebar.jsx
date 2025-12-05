import { Link, useLocation } from "react-router-dom";

export default function Sidebar({ links }) {
  const location = useLocation();

  return (
    <div className="w-64 bg-white dark:bg-gray-800 shadow-md min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-6 text-indigo-600">Dashboard</h2>
      <ul>
        {links.map((link) => (
          <li key={link.name} className={`mb-2 rounded hover:bg-indigo-100 ${location.pathname === link.path ? 'bg-indigo-200 font-semibold' : ''}`}>
            <Link to={link.path} className="block px-4 py-2 text-blue-500 font-semibold">
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
