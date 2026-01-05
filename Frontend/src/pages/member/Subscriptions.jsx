import React from "react";
import API from "../../api/axios";

export default function SubscriptionTab({ user }) {
  const plans = [
    { id: "free", name: "Free", price: 0 },
    { id: "pro", name: "Pro", price: 100 },
    { id: "team", name: "Team", price: 1499 },
  ];

  const handleSubscribe = async (planId) => {
    if (planId === "free") return alert("You are already on Free plan");

    // 1️⃣ Create order
    const res = await API.post("/subscription/create-order", { planId });
    const { orderId, amount, currency } = res.data;

    // 2️⃣ Open Razorpay
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID, // front end only
      amount,
      currency,
      name: "My App",
      order_id: orderId,
      handler: async (response) => {
        await API.post("/subscription/verify", {
          planId,
          ...response,
        });
        alert("Subscription successful!");
      },
      prefill: { email: user.email, name: user.name },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {plans.map((p) => (
        <div key={p.id} className="p-6 bg-white shadow rounded-lg text-center">
          <h3 className="text-xl font-semibold">{p.name}</h3>
          <p className="text-2xl font-bold mt-2">₹{p.price}</p>
          <button
            onClick={() => handleSubscribe(p.id)}
            className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
          >
            Subscribe
          </button>
        </div>
      ))}
    </div>
  );
}
