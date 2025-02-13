import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../hook/useAuthContext";
const SERVICE = "AI_REFERENCE";

const RequireAuthAIReference = () => {
  const { user } = useAuthContext();

  return user && user.token && user.service === SERVICE ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

export default RequireAuthAIReference;
