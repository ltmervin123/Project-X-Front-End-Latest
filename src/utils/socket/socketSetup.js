import { io } from "socket.io-client";

const API = process.env.REACT_APP_API_URL;

export const socket = io(API, {
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 3000,
  transports: ["websocket"],
});

export const connectSocket = (token) => {
  if (!token) {
    return;
  }

  if (!socket.connected) {
    socket.auth = { token };
    socket.connect();
    console.log("Socket connected");
  }
};

export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
    console.log("Socket disconnected");
  }
};
