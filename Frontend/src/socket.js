// src/socket.js
import { io } from "socket.io-client";
const socket = io(import.meta.env.VITE_API_URL, {

// io("http://localhost:5000", {
  // autoConnect: false,   
  auth: {
    token: localStorage.getItem("memberToken")
  }
});

export default socket;
