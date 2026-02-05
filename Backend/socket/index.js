//socket/index.js

const jwt = require("jsonwebtoken");

// const onlineUsers = new Map();

module.exports = (io, onlineUsers) => {
  io.use((socket, next) => {
    const token = socket.handshake.auth?.token;

    if (!token) {
      return next(new Error("No token"));
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.userId = decoded.id;
      next();
    } catch (err) {
      next(new Error("Invalid token"));
    }
  });

  io.on("connection", (socket) => {
    const userId = socket.userId;

    onlineUsers.set(userId, socket.id);
    console.log(" User online:", userId);
  io.emit("onlineCount", onlineUsers.size);

    socket.on("disconnect", () => {
      onlineUsers.delete(userId);
      console.log(" User offline:", userId);
      io.emit("onlineCount", onlineUsers.size);

    });
  });


  // return onlineUsers; 
};
