// // import { useState } from "react";
// // import API from "../../api/axios";
// // import { useNavigate, Link } from "react-router-dom";

// // export default function MemberLogin() {
// //   const [email, setEmail] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [error, setError] = useState("");
// //   const navigate = useNavigate();

// //   const handleLogin = async (e) => {
// //     e.preventDefault();
// //     setError("");

// //     try {
// //       const res = await API.post("/auth/login", { email, password });
// //       localStorage.setItem("token", res.data.token);
// //       navigate("/dashboard");
// //     } catch (err) {
// //       setError(err.response?.data?.msg || "Login failed");
// //     }
// //   };

// //   return (
// //     <div className="flex items-center justify-center min-h-screen bg-gray-100">
// //       <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
// //         <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">
// //           Member Login
// //         </h2>
// //         {error && (
// //           <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</div>
// //         )}
// //         <form onSubmit={handleLogin} className="space-y-4">
// //           <div>
// //             <label className="block mb-1 font-semibold">Email</label>
// //             <input
// //               type="email"
// //               className="w-full border rounded px-3 py-2"
// //               value={email}
// //               onChange={(e) => setEmail(e.target.value)}
// //               required
// //             />
// //           </div>
// //           <div>
// //             <label className="block mb-1 font-semibold">Password</label>
// //             <input
// //               type="password"
// //               className="w-full border rounded px-3 py-2"
// //               value={password}
// //               onChange={(e) => setPassword(e.target.value)}
// //               required
// //             />
// //           </div>
// //           <button
// //             type="submit"
// //             className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 rounded"
// //           >
// //             Login
// //           </button>
// //         </form>
// //         <div className="mt-4 text-center space-y-2">
// //           <Link to="/register" className="text-indigo-500 hover:underline block">
// //             Register
// //           </Link>
// //           <Link to="/forgot-password" className="text-indigo-500 hover:underline block">
// //             Forgot Password?
// //           </Link>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }




// import { useState } from "react";
// import API from "../../api/axios";
// import { useNavigate, Link } from "react-router-dom";

// export default function MemberLogin() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const res = await API.post("/auth/login", { email, password });
//       localStorage.setItem("token", res.data.token);
//       navigate("/dashboard");
//     } catch (err) {
//       setError(err.response?.data?.msg || "Login failed");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
     

//       {/* Login Card */}
//       <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-xl">
//         <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">
//           Member Login
//         </h1>

//         {error && (
//           <div className="bg-red-100 text-red-700 px-4 py-2 mb-4 rounded">
//             {error}
//           </div>
//         )}

//         <form onSubmit={handleLogin} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium mb-1">Email</label>
//             <input
//               type="email"
//               className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-1">Password</label>
//             <input
//               type="password"
//               className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
//               placeholder="Enter your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 rounded-lg transition"
//           >
//             Login
//           </button>
//         </form>

//         <div className="mt-4 flex justify-between text-sm">
//           <Link to="/register" className="text-indigo-500 hover:underline">
//             Register
//           </Link>
//           <Link to="/forgot-password" className="text-indigo-500 hover:underline">
//             Forgot Password?
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }



import { useState } from "react";
import API from "../../api/axios";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function MemberLogin() {
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
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      {/* Login Card */}
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-xl">
        <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">
          Member Login
        </h1>

        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 mb-4 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="absolute right-3 top-9 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 rounded-lg transition"
          >
            Login
          </button>
        </form>

        <div className="mt-4 flex justify-between text-sm">
          <Link to="/register" className="text-indigo-500 hover:underline">
            Register
          </Link>
          <Link to="/forgot-password" className="text-indigo-500 hover:underline">
            Forgot Password?
          </Link>
        </div>
      </div>
    </div>
  );
}
