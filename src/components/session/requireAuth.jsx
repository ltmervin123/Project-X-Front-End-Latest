import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../hook/useAuthContext";

const RequireAuth = () => {
  const { user } = useAuthContext();

  return user && user.token ? <Outlet /> : <Navigate to="/login" />;
};

export default RequireAuth;
