// import { useState } from "react";
// import API from "../../api/axios";
// import { useNavigate } from "react-router-dom";
// import { FaEye, FaEyeSlash } from "react-icons/fa";

// export default function AdminLogin() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");

//     console.log("ADMIN LOGIN CLICKED");

//     try {
//       const res = await API.post("/auth/login", { email, password });
//       console.log("ADMIN LOGIN RESPONSE", res.data);

//       if (res.data.user.role !== "admin") {
//         setError("You are not an admin");
//         return;
//       }

//       localStorage.setItem("adminToken", res.data.token);
//       localStorage.setItem("adminId", res.data.user.id);

//       navigate("/admin/dashboard");
//     } catch (err) {
//       console.error(err);
//       setError(err.response?.data?.msg || "Login failed");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
//       <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
//         <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">
//           Admin Login
//         </h2>

//         {error && (
//           <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleLogin} className="space-y-4">
//           <div>
//             <label className="block mb-1 font-semibold">Email</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
              
//               className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"

//             />
//           </div>
//        {/* Password with Eye Icon */}
//           <div className="relative">
//             <label className="block mb-1 font-semibold">Password</label>
//             <input
//               type={showPassword ? "text" : "password"}
//               className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-400"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//                className="absolute right-3 top-9 cursor-pointer text-gray-500"
              
//             >
//               {showPassword ? <FaEyeSlash /> : <FaEye />}
//             </button>
//           </div>
       

//            <button
//             type="submit"

//             className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 rounded-lg transition"

//            >
//              Login
//            </button>
//          </form>
// <div className="mt-4 flex justify-between text-sm">
//           <a href="/admin/forgot-password" className="text-indigo-500 hover:underline">
//             Forgot Password?
//           </a>
//         </div>
//        </div>
//      </div>
//    );
//  }



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

      localStorage.setItem("adminToken", res.data.token);
      localStorage.setItem("adminId", res.data.user.id);

      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 px-4">

      {/* Animated background blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-500/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-1/3 -right-32 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-2000" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />

      {/* Login Card */}
      <div className="relative w-full max-w-md p-8 bg-white/95 backdrop-blur-lg rounded-xl shadow-2xl z-10">

        <h2 className="text-2xl font-bold mb-2 text-center text-indigo-600">
          Admin Login
        </h2>

        <p className="text-center text-sm text-gray-500 mb-6">
          AI Team Productivity Control Panel
        </p>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* Password */}
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
              className="absolute right-3 top-9 text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 rounded-lg transition"
          >
            Login
          </button>
        </form>

        <div className="mt-4 flex justify-between text-sm">
          <a
            href="/admin/forgot-password"
            className="text-indigo-500 hover:underline"
          >
            Forgot Password?
          </a>
        </div>
      </div>
    </div>
  );
}
