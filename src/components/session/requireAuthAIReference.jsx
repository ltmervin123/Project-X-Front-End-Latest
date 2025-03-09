import { Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useAuthContext } from "../../hook/useAuthContext";
import {
  socket,
  connectSocket,
  disconnectSocket,
} from "../../utils/socket/socketSetup";
const SERVICE = "AI_REFERENCE";

const RequireAuthAIReference = () => {
  const { user } = useAuthContext();

  useEffect(() => {
    connectSocket(user.token);

    const companyId = user.id;
    //Company must create a room in order to receive the emitted reference check submit event
    socket.emit("joinRoom", { companyId });
    return () => {
      socket.removeAllListeners();
      disconnectSocket();
    };
  }, [user]);

  return user && user.token && user.service === SERVICE ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

export default RequireAuthAIReference;
