import { createContext, useReducer, useEffect, useMemo } from "react";

const AnalyticsContext = createContext();

const initialState = {
  analytics: JSON.parse(localStorage.getItem("analytics")) || [], 
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
      localStorage.removeItem("analytics");
      return {
        analytics: [action.payload, ...state.analytics],
      };
    default:
      return state;
  }
};

const AnalyticsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

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
