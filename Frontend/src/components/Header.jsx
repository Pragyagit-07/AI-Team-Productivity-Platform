export default function Header({ username, onLogout }) {
  return (
    <div className="flex justify-between items-center bg-white dark:bg-gray-100 shadow p-4">
      <h1 className="text-xl font-bold">Welcome, {username}</h1>
      <button onClick={onLogout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
        Logout
      </button>
    </div>
  );
}
