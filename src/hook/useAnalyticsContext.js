import { AnalyticsContext } from "../context/AnalyticsContext";
import { useContext } from "react";

const useAnalyticsContext = () => {
  const context = useContext(AnalyticsContext);

  if (!context) {
    throw new Error(
      "useAuthContext must be used within an AuthContextProvider"
    );
  }

  return context;
};

export { useAnalyticsContext };
