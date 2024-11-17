import { useAuthContext } from "./useAuthContext";
import { useAnalyticsContext } from "./useAnalyticsContext";
export const useLogout = () => {
  const { dispatch: dispatchLogout } = useAuthContext();
  const { dispatch: dispatchClearAnalytics } = useAnalyticsContext();

  const logout = () => {
    // Clear the user from the local storage
    // localStorage.removeItem("user");

    // Dispatch the user data to context or handle login state
    dispatchLogout({ type: "LOGOUT" });

    // Clear the analytics from the local storage
    // localStorage.removeItem("analytics");
    dispatchClearAnalytics({ type: "CLEAR_ANALYTICS" });
  };

  return { logout };
};
