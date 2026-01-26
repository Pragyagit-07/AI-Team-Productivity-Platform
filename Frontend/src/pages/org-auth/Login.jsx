// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../../api/axios";

// export default function OrgUserLogin() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const res = await API.post("/org-auth/login", {
//         email,
//         password,
//       });

//       localStorage.setItem("orgToken", res.data.token);
//       localStorage.setItem("orgUser", JSON.stringify(res.data.user));

//       navigate("/org/dashboard");
//     } catch (err) {
//       setError(err.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <form
//         onSubmit={handleLogin}
//         className="bg-white p-8 rounded-lg shadow-md w-96"
//       >
//         <h2 className="text-2xl font-bold mb-4 text-center">
//           Organization Login
//         </h2>

//         {error && (
//           <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
//         )}

//         <input
//           type="email"
//           placeholder="Org user email"
//           className="w-full border p-2 mb-3 rounded"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full border p-2 mb-4 rounded"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />

//         <button className="w-full bg-blue-600 text-white py-2 rounded">
//           Login
//         </button>
//       </form>
//     </div>
//   );
// }


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import { FaEye, FaEyeSlash, FaBuilding } from "react-icons/fa";
import loginImage from "../../assets/member-login-time.webp"; // you can replace later

export default function OrgUserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await API.post("/org-auth/login", { email, password });

      localStorage.setItem("orgToken", res.data.token);
      localStorage.setItem("orgUser", JSON.stringify(res.data.user));

      navigate("/org/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-50 via-white to-blue-100">
      
      {/* LEFT — VISUAL */}
      <div className="hidden lg:flex w-1/2 items-center justify-center relative overflow-hidden">
        <img
          src={loginImage}
          alt="Organization workspace"
          className="w-[75%] animate-float"
        />
        <div className="absolute w-80 h-80 bg-blue-200 rounded-full blur-3xl opacity-40 animate-pulseSlow" />
      </div>

      {/* RIGHT — FORM */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 animate-slideIn">

          {/* Header */}
          <div className="flex items-center justify-center gap-2 mb-3">
            <FaBuilding className="text-blue-600 text-2xl" />
            <h1 className="text-3xl font-bold text-blue-600">
              Organization Login
            </h1>
          </div>

          <p className="text-sm text-gray-500 text-center mb-6">
            Access your organization workspace
          </p>

          {error && (
            <div className="bg-red-100 text-red-700 px-4 py-2 mb-4 rounded text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            
            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Work Email
              </label>
              <input
                type="email"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="orguser@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block text-sm font-medium mb-1">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter password"
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
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition transform hover:scale-[1.02]"
            >
              Login to Organization
            </button>
          </form>
        </div>
      </div>

      {/* Animations */}
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
