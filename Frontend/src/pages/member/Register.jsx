// import { useState } from "react";
// import API from "../../api/axios";
// import { useNavigate, Link } from "react-router-dom";

// export default function MemberRegister() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [error, setError] = useState("");
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setError(""); 
//     setMessage("");

//     if (password !== confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }

//     try {
//       const res = await API.post("/auth/register", { name, email, password });
//       setMessage("Registration successful! Redirecting to login...");
//       setTimeout(() => navigate("/login"), 2000);
//     } catch (err) {
//       setError(err.response?.data?.msg || "Registration failed");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
//         <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">
//           Member Registration
//         </h2>

//         {message && <div className="bg-green-100 text-green-700 p-2 mb-4 rounded">{message}</div>}
//         {error && <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</div>}

//         <form onSubmit={handleRegister} className="space-y-4">
//           <div>
//             <label className="block mb-1 font-semibold">Full Name</label>
//             <input
//               type="text"
//               className="w-full border rounded px-3 py-2"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//             />
//           </div>
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
//           <div>
//             <label className="block mb-1 font-semibold">Confirm Password</label>
//             <input
//               type="password"
//               className="w-full border rounded px-3 py-2"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 rounded"
//           >
//             Register
//           </button>
//         </form>

//         <div className="mt-4 text-center">
//           <Link to="/login" className="text-indigo-500 hover:underline">
//             Already have an account? Login
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }



import { useState } from "react";
import API from "../../api/axios";
import { useNavigate, Link } from "react-router-dom";

export default function MemberRegister() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await API.post("/auth/register", { name, email, password });
      setMessage("Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-indigo-50 via-white to-indigo-100">

      {/* LEFT — FORM */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 animate-slideLeft">

          <h2 className="text-3xl font-bold text-center text-indigo-600 mb-2">
            Member Registration
          </h2>
          <p className="text-sm text-gray-500 text-center mb-6">
            Create your account & start managing projects
          </p>

          {message && (
            <div className="bg-green-100 text-green-700 px-4 py-2 mb-4 rounded">
              {message}
            </div>
          )}
          {error && (
            <div className="bg-red-100 text-red-700 px-4 py-2 mb-4 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block mb-1 font-semibold">Full Name</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

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

            <div>
              <label className="block mb-1 font-semibold">Password</label>
              <input
                type="password"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-semibold">Confirm Password</label>
              <input
                type="password"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 rounded-lg transition transform hover:scale-[1.02]"
            >
              Register
            </button>
          </form>

          <div className="mt-4 text-center text-sm">
            <Link to="/login" className="text-indigo-500 hover:underline">
              Already have an account? Login
            </Link>
          </div>
        </div>
      </div>

      {/* RIGHT — IMAGE */}
      <div className="hidden lg:flex w-1/2 items-center justify-center relative overflow-hidden">
        <img
          // src="/src/assets/member-register-gear.png"
          src= "/src/assets/images.png"
          alt="Productivity illustration"
          className="w-[75%] animate-floatSlow"
        />

        {/* soft glow */}
        <div className="absolute w-80 h-80 bg-indigo-200 rounded-full blur-3xl opacity-40 animate-pulseSlow" />
      </div>

      {/* ANIMATIONS */}
      <style>
        {`
          @keyframes slideLeft {
            from { opacity: 0; transform: translateX(-40px); }
            to { opacity: 1; transform: translateX(0); }
          }
          .animate-slideLeft {
            animation: slideLeft 0.8s ease forwards;
          }

          @keyframes floatSlow {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-18px); }
          }
          .animate-floatSlow {
            animation: floatSlow 6s ease-in-out infinite;
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
