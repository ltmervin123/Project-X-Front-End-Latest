import { Navigate, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useAuthContext } from "../../hook/useAuthContext";
import {
  connectSocket,
  disconnectSocket,
} from "../../utils/socket/socketSetup";
const SERVICE = "AI_REFERENCE";

const RequireAuthAIReference = () => {
  const { user } = useAuthContext();

  useEffect(() => {
    connectSocket(user.token);

    return () => {
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
