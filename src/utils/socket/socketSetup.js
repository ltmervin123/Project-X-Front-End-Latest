import { io } from "socket.io-client";

const API = process.env.REACT_APP_API_URL;

export const socket = io(API, {
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 3000,
  transports: ["websocket"],
});

export const connectSocket = () => {
  const token = localStorage.getItem("token") || null;

  if (!token) {
    console.error("No token found in localStorage. Socket connection aborted.");
    return;
  }

  if (!socket.connected) {
    socket.auth = { token };
    socket.connect();
  }
};

export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
  }
};
