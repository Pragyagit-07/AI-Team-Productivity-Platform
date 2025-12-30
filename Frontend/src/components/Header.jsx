
import { Menu } from "lucide-react";

export default function Header({ username, onLogout, onMenuClick }) {
  return (
    <div className="flex justify-between items-center bg-white shadow p-4">
      <div className="flex items-center gap-4">
        {/* Hamburger (mobile only) */}
        <button
          onClick={onMenuClick}
          className="lg:hidden"
        >
          <Menu size={24} />
        </button>

        <h1 className="text-xl font-bold">
          Welcome, {username}
        </h1>
      </div>

      <button
        onClick={onLogout}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}
