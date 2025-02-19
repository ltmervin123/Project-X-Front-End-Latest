import { createContext, useReducer, useEffect, useMemo } from "react";

const AuthContext = createContext();

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload));
      return { user: action.payload };
    case "LOGOUT":
      localStorage.clear();
      return { user: null };
    default:
      return state;
  }
};

const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const contextValue = useMemo(
    () => ({ ...state, dispatch }),
    [state, dispatch]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
