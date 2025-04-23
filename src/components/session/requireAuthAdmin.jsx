import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../../hook/useAuthContext";
const SERVICE = "AI_REFERENCE";

const RequireAuthAdmin = () => {
  const { user } = useAuthContext();

  return user &&
    user.token &&
    user.service === SERVICE &&
    user.accountType === "admin" ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

export default RequireAuthAdmin;
