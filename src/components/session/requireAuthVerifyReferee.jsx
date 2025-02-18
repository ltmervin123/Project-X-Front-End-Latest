import { Navigate, Outlet } from "react-router-dom";
const RequireAuthVefifyReferee = () => {
  const token = localStorage.getItem("token");
  return token ? <Outlet /> : <Navigate to="/reference-expired-link" />;
};

export default RequireAuthVefifyReferee;
