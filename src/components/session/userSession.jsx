import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuthContext } from "../../hook/useAuthContext";
import axios from "axios";
import { useLogout } from "../../hook/useLogout";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuthContext();
  const service = user?.service || null;
  const userId = user?.id || null;
  const accountType = user?.accountType || null;
  const API = process.env.REACT_APP_API_URL;
  const URL = `${API}/api/user/auth/verify-session`;
  const { logout } = useLogout();

  useEffect(() => {
    let isMounted = true;

    const validateSession = async () => {
      try {
        const response = await axios.post(
          URL,
          { service, userId, accountType },
          {
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${user.token}`,
            },
          }
        );
        sessionStorage.setItem("authenticated", true);
      } catch (err) {
        logout();
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    // Avoids unwanted call to verifyRefreshToken
    user?.token ? validateSession() : setIsLoading(false);

    return () => (isMounted = false);
  }, [user]);

  return <>{<Outlet />}</>;
};

export default PersistLogin;
