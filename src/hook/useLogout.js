import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = () => {
    // Clear the user from the local storage
    localStorage.removeItem("user");

    // Dispatch the user data to context or handle login state
    dispatch({ type: "LOGOUT" });
  };

  return logout;
};
