import { useAuthContext } from "./useAuthContext";
import { useAnalyticsContext } from "./useAnalyticsContext";
export const useLogout = () => {
  const { dispatch: dispatchLogout } = useAuthContext();
  const { dispatch: dispatchClearAnalytics } = useAnalyticsContext();

  const logout = () => {
    dispatchLogout({ type: "LOGOUT" });
    dispatchClearAnalytics({ type: "CLEAR_ANALYTICS" });
  };

  return { logout };
};
