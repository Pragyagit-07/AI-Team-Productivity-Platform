// import { useState } from "react";
// import API from "../../api/axios";
// import { useNavigate, Link } from "react-router-dom";
// import { FaEye, FaEyeSlash } from "react-icons/fa";

// export default function MemberLogin() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const res = await API.post("/auth/login", { email, password });
//       localStorage.setItem("memberToken", res.data.token);
//           localStorage.setItem("memberId", res.data.user.id); 

//       navigate("/dashboard");
//     } catch (err) {
//       setError(err.response?.data?.msg || "Login failed");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
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

//           <div className="relative">
//             <label className="block text-sm font-medium mb-1">Password</label>
//             <input
//               type={showPassword ? "text" : "password"}
//               className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
//               placeholder="Enter your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//             <span
//               className="absolute right-3 top-9 cursor-pointer text-gray-500"
//               onClick={() => setShowPassword(!showPassword)}
//             >
//               {showPassword ? <FaEyeSlash /> : <FaEye />}
//             </span>
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
      localStorage.setItem("memberToken", res.data.token);
      localStorage.setItem("memberId", res.data.user.id);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-indigo-50 via-white to-indigo-100">
      
      {/* LEFT SIDE — IMAGE / PRODUCTIVITY VISUAL */}
      <div className="hidden lg:flex w-1/2 items-center justify-center relative overflow-hidden">
        <img
          src="/src/assets/member-login-time.webp"
          alt="Productivity illustration"
          className="w-[80%] animate-float"
        />

        {/* Floating clock glow */}
        <div className="absolute w-72 h-72 bg-indigo-200 rounded-full blur-3xl opacity-40 animate-pulseSlow" />
      </div>

      {/* RIGHT SIDE — LOGIN FORM */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 animate-slideIn">

          <h1 className="text-3xl font-bold text-indigo-600 text-center mb-2">
            Member Login
          </h1>
          <p className="text-sm text-gray-500 text-center mb-6">
            Track tasks • Manage time • Boost productivity
          </p>

          {error && (
            <div className="bg-red-100 text-red-700 px-4 py-2 mb-4 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
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

            {/* Password */}
            <div className="relative">
              <label className="block text-sm font-medium mb-1">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-400"
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

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 rounded-lg transition transform hover:scale-[1.02]"
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

      {/* ANIMATIONS */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-15px); }
          }
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }

          @keyframes slideIn {
            from { opacity: 0; transform: translateX(40px); }
            to { opacity: 1; transform: translateX(0); }
          }
          .animate-slideIn {
            animation: slideIn 0.8s ease forwards;
          }

          @keyframes pulseSlow {
            0%, 100% { opacity: 0.35; }
            50% { opacity: 0.6; }
          }
          .animate-pulseSlow {
            animation: pulseSlow 5s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
}
