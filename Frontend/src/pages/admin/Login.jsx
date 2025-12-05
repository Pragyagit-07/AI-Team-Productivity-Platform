// import { useState } from "react";
// import API from "../../api/axios";
// import { useNavigate } from "react-router-dom";

// export default function AdminLogin() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const res = await API.post("/auth/login", { email, password });
//       if (res.data.user.role !== "admin") {
//         setError("You are not an admin");
//         return;
//       }
//       localStorage.setItem("token", res.data.token);
//       navigate("/admin/dashboard");
//     } catch (err) {
//       setError(err.response?.data?.msg || "Login failed");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
//         <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">
//           Admin Login
//         </h2>
//         {error && (
//           <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</div>
//         )}
//         <form onSubmit={handleLogin} className="space-y-4">
//           <div>
//             <label className="block mb-1 font-semibold">Email</label>
//             <input
//               type="email"
//               className="w-full border rounded px-3 py-2"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div>
//             <label className="block mb-1 font-semibold">Password</label>
//             <input
//               type="password"
//               className="w-full border rounded px-3 py-2"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 rounded"
//           >
//             Login
//           </button>
//         </form>
//         <div className="mt-4 text-center">
//           <a href="/admin/forgot-password" className="text-indigo-500 hover:underline">
//             Forgot Password?
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import API from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await API.post("/auth/login", { email, password });
      if (res.data.user.role !== "admin") {
        setError("You are not an admin");
        return;
      }
      localStorage.setItem("token", res.data.token);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">
          Admin Login
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block mb-1 font-semibold">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password with Eye Icon */}
          <div className="relative">
            <label className="block mb-1 font-semibold">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
               className="absolute right-3 top-9 cursor-pointer text-gray-500"
              
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 rounded-lg transition"
          >
            Login
          </button>
        </form>

        <div className="mt-4 flex justify-between text-sm">
          <a href="/admin/forgot-password" className="text-indigo-500 hover:underline">
            Forgot Password?
          </a>
        </div>
      </div>
    </div>
  );
}
