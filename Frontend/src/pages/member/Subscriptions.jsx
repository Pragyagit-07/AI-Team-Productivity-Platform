// import React from "react";
// import API from "../../api/axios";

// export default function SubscriptionTab({ user }) {
//   const plans = [
//     { id: "free", name: "Free", price: 0 },
//     { id: "pro", name: "Pro", price: 100 },
//     { id: "team", name: "Team", price: 1499 },
//   ];

//   const handleSubscribe = async (planId) => {
//     if (planId === "free") return alert("You are already on Free plan");

//     // 1️⃣ Create order
//     const res = await API.post("/subscription/create-order", { planId });
//     const { orderId, amount, currency } = res.data;

//     // 2️⃣ Open Razorpay
//     const options = {
//       key: process.env.REACT_APP_RAZORPAY_KEY_ID, // front end only
//       amount,
//       currency,
//       name: "My App",
//       order_id: orderId,
//       handler: async (response) => {
//         await API.post("/subscription/verify", {
//           planId,
//           ...response,
//         });
//         alert("Subscription successful!");
//       },
//       prefill: { email: user.email, name: user.name },
//     };

//     const rzp = new window.Razorpay(options);
//     rzp.open();
//   };

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//       {plans.map((p) => (
//         <div key={p.id} className="p-6 bg-white shadow rounded-lg text-center">
//           <h3 className="text-xl font-semibold">{p.name}</h3>
//           <p className="text-2xl font-bold mt-2">₹{p.price}</p>
//           <button
//             onClick={() => handleSubscribe(p.id)}
//             className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
//           >
//             Subscribe
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// }


import React from "react";
import API from "../../api/axios";
import { motion } from "framer-motion";
import { Check, Crown, Users, Zap } from "lucide-react";

export default function SubscriptionTab({ user }) {
  const plans = [
    {
      id: "free",
      name: "Free",
      price: "₹0",
      icon: Zap,
      gradient: "from-gray-200 to-gray-300",
      features: [
        "Basic project management",
        "Limited tasks",
        "Community support",
      ],
      disabled: true,
    },
    {
      id: "pro",
      name: "Pro",
      price: "₹100 / month",
      icon: Crown,
      gradient: "from-indigo-500 to-purple-600",
      features: [
        "Unlimited projects",
        "Advanced task analytics",
        "Priority support",
        "AI assistance (basic)",
      ],
      highlight: true,
    },
    {
      id: "team",
      name: "Team",
      price: "₹1499 / month",
      icon: Users,
      gradient: "from-emerald-500 to-teal-600",
      features: [
        "Team collaboration",
        "Role-based access",
        "Organization dashboard",
        "AI assistance (advanced)",
      ],
    },
  ];

  const handleSubscribe = async (planId) => {
  try {
    const res = await API.post("/subscription/create-order", { planId });

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: res.data.amount,
      currency: res.data.currency,
      name: "AI Team Productivity Platform",
      order_id: res.data.orderId,
      handler: async (response) => {
        await API.post("/subscription/verify", { planId, ...response });
        alert("Subscription activated");
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (err) {
    console.error("Payment error:", err.response?.data || err.message);
    alert("Payment failed");
  }
};


  // const handleSubscribe = async (planId) => {
  //   if (planId === "free") {
  //     alert("You are already on Free plan");
  //     return;
  //   }

  //   const res = await API.post("/subscription/create-order", { planId });
  //   const { orderId, amount, currency } = res.data;
  //   console.log(import.meta.env.VITE_RAZORPAY_KEY_ID);


  //   const options = {
  //     // key: process.env.REACT_APP_RAZORPAY_KEY_ID,
  //     key: import.meta.env.VITE_RAZORPAY_KEY_ID,

  //     amount,
  //     currency,
  //     name: "AI Team Productivity Platform",
  //     order_id: orderId,
  //     handler: async (response) => {
  //       await API.post("/subscription/verify", {
  //         planId,
  //         ...response,
  //       });
  //       alert("Subscription activated successfully ");
  //     },
  //     prefill: {
  //       email: user.email,
  //       name: user.name,
  //     },
  //     theme: { color: "#4f46e5" },
  //   };

  //   const rzp = new window.Razorpay(options);
  //   rzp.open();
  // };

  return (
    <div className="space-y-6">
      {plans.map((plan, index) => {
        const Icon = plan.icon;

        return (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 }}
            whileHover={{ scale: 1.02 }}
            className={`relative overflow-hidden rounded-3xl shadow-xl bg-gradient-to-r ${plan.gradient}`}
          >
            {plan.highlight && (
              <span className="absolute top-4 right-4 bg-yellow-400 text-black text-xs font-semibold px-3 py-1 rounded-full">
                Most Popular
              </span>
            )}

            <div className="bg-white/90 backdrop-blur-md p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              
              {/* LEFT */}
              <div className="flex items-start gap-5">
                <div className="p-4 rounded-2xl bg-white shadow-md">
                  <Icon className="text-indigo-600" size={32} />
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-800">
                    {plan.name}
                  </h3>
                  <p className="text-lg font-semibold text-indigo-600 mt-1">
                    {plan.price}
                  </p>

                  <ul className="mt-4 space-y-2 text-sm text-gray-700">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check className="text-green-500" size={16} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* RIGHT */}
              <div className="w-full md:w-auto">
                <button
                  disabled={plan.disabled}
                  onClick={() => handleSubscribe(plan.id)}
                  className={`w-full md:w-44 py-3 rounded-xl font-semibold transition
                    ${
                      plan.disabled
                        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                        : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg"
                    }`}
                >
                  {plan.disabled ? "Current Plan" : "Upgrade Now"}
                </button>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
