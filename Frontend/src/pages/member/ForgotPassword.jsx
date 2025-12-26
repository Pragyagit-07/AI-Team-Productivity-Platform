// import { useState } from "react";
// import API from "../../api/axios";

// export default function MemberForgotPassword() {
//   const [email, setEmail] = useState("");
//   const [otp, setOtp] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [step, setStep] = useState(1);
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   const handleSendOTP = async (e) => {
//     e.preventDefault();
//     setError(""); setMessage("");

//     try {
//       const res = await API.post("/auth/forgot-password", { email });
//       setMessage(res.data.msg || "OTP sent to email");
//       setStep(2);
//     } catch (err) {
//       setError(err.response?.data?.msg || "Failed to send OTP");
//     }
//   };

//   const handleResetPassword = async (e) => {
//     e.preventDefault();
//     setError(""); setMessage("");

//     try {
//       const res = await API.post("/auth/reset-password", { email, otp, password: newPassword });
//       setMessage(res.data.msg || "Password reset successful");
//       setStep(1);
//       setEmail(""); setOtp(""); setNewPassword("");
//     } catch (err) {
//       setError(err.response?.data?.msg || "Failed to reset password");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
//         <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">
//           Forgot Password
//         </h2>

//         {message && <div className="bg-green-100 text-green-700 p-2 mb-4 rounded">{message}</div>}
//         {error && <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</div>}

//         {step === 1 ? (
//           <form onSubmit={handleSendOTP} className="space-y-4">
//             <div>
//               <label className="block mb-1 font-semibold">Email</label>
//               <input
//                 type="email"
//                 className="w-full border rounded px-3 py-2"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//               />
//             </div>
//             <button
//               type="submit"
//               className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 rounded"
//             >
//               Send OTP
//             </button>
//           </form>
//         ) : (
//           <form onSubmit={handleResetPassword} className="space-y-4">
//             <div>
//               <label className="block mb-1 font-semibold">OTP</label>
//               <input
//                 type="text"
//                 className="w-full border rounded px-3 py-2"
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value)}
//                 required
//               />
//             </div>
//             <div>
//               <label className="block mb-1 font-semibold">New Password</label>
//               <input
//                 type="password"
//                 className="w-full border rounded px-3 py-2"
//                 value={newPassword}
//                 onChange={(e) => setNewPassword(e.target.value)}
//                 required
//               />
//             </div>
//             <button
//               type="submit"
//               className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 rounded"
//             >
//               Reset Password
//             </button>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// }




import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function MemberForgotPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const res = await API.post("/auth/forgot-password", { email });
      setMessage(res.data.msg || "OTP sent to email");
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.msg || "Failed to send OTP");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const res = await API.post("/auth/reset-password", {
        email,
        otp,
        password: newPassword,
      });

      setMessage(res.data.msg || "Password reset successful");

      // ✅ Redirect to login after 2 seconds
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.msg || "Failed to reset password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">
          Forgot Password
        </h2>

        {message && (
          <div className="bg-green-100 text-green-700 p-2 mb-4 rounded">
            {message}
          </div>
        )}
        {error && (
          <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">
            {error}
          </div>
        )}

        {step === 1 ? (
          <form onSubmit={handleSendOTP} className="space-y-4">
            <div>
              <label className="block mb-1 font-semibold">Email</label>
              <input
                type="email"
                className="w-full border rounded px-3 py-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 rounded"
            >
              Send OTP
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div>
              <label className="block mb-1 font-semibold">OTP</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>

            {/* ✅ New Password with Eye Icon */}
            <div className="relative">
              <label className="block mb-1 font-semibold">
                New Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                className="w-full border rounded px-3 py-2 pr-10"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
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
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 rounded"
            >
              Reset Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
