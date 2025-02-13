import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../hook/useAuthContext";
const SERVICE = "MOCK_AI";

const RequireAuthMockAI = () => {
  const { user } = useAuthContext();

  return user && user.token && user.service === SERVICE ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

export default RequireAuthMockAI;
