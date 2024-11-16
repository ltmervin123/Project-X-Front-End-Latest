import { createContext, useReducer, useEffect, useMemo } from "react";

const AnalyticsContext = createContext();

const initialState = {
  analytics: JSON.parse(localStorage.getItem("analytics")) || null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "SET_ANALYTICS":
      localStorage.setItem("analytics", JSON.stringify(action.payload));
      return { analytics: action.payload };
    case "CLEAR_ANALYTICS":
      localStorage.removeItem("analytics");
      return { analytics: null };

    case "CREATE_ANALYTICS":
      return {
        analytics: [action.payload, ...state.analytics],
      };
    default:
      return state;
  }
};

const AnalyticsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Log current state changes for debugging
  useEffect(() => {
    console.log("Analytics:", state);
  }, [state]);

  const contextValue = useMemo(
    () => ({ ...state, dispatch }),
    [state, dispatch]
  );

  return (
    <AnalyticsContext.Provider value={contextValue}>
      {children}
    </AnalyticsContext.Provider>
  );
};

export { AnalyticsContext, AnalyticsContextProvider };
