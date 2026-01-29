// import axios from "axios";

// const API = axios.create({
//    baseURL: "http://localhost:5000/api",
  
// });

// API.interceptors.request.use((req) => {
//   // priority: admin token first
//   const adminToken = localStorage.getItem("adminToken");
//   const memberToken = localStorage.getItem("memberToken");
//   const token = adminToken || memberToken;
//     if (token) {
//     req.headers.Authorization = `Bearer ${token}`;
//   }
//   return req;
// });

// export default API;


import axios from "axios";

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  withCredentials: true,
});

API.interceptors.request.use((req) => {
  const adminToken = localStorage.getItem("adminToken");
  const memberToken = localStorage.getItem("memberToken");
  const token = adminToken || memberToken;

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;
