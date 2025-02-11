import { createContext, useContext, useEffect, useReducer } from "react";

export const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        user: action.payload.user,
        role: action.payload.role,
        token: action.payload.token,
      };
    case "LOGOUT":
      return {
        user: null,
        role: null,
        token: null,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    role: null,
    token: null,
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedRole = localStorage.getItem("role");
    const storedToken = localStorage.getItem("token");

    console.log("LocalStorage Data:", { storedUser, storedRole, storedToken });

    const parsedUser = storedUser ? JSON.parse(storedUser) : null;

    if (parsedUser && storedRole && storedToken) {
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: { user: parsedUser, role: storedRole, token: storedToken },
      });
    }
  }, []);

  useEffect(() => {
    if (state.user && state.token) {
      localStorage.setItem("user", JSON.stringify(state.user));
      localStorage.setItem("role", state.role);
      localStorage.setItem("token", state.token);
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("role");
      localStorage.removeItem("token");
    }
  }, [state.user, state.role, state.token]);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Safe Custom Hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthContextProvider");
  }
  return context;
};
