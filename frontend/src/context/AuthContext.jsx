import { createContext, useEffect, useState } from "react";
import {
  clearStoredToken,
  clearStoredUser,
  getStoredToken,
  getStoredUser,
  setStoredToken,
  setStoredUser,
} from "../utils/storage";
import { normalizeRole } from "../utils/roles";

export const AuthContext = createContext(null);

const LOCAL_DEV_EMAIL = "admin@example.com";
const LOCAL_DEV_PASSWORD = "admin123";
const LOCAL_DEV_TOKEN = "local-dev-token";
const LOCAL_DEV_USER = {
  name: "Admin User",
  email: "admin@example.com",
  role: "Admin",
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getStoredUser());
  const [token, setToken] = useState(getStoredToken());
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    // TEMPORARY LOCAL AUTH FOR DEVELOPMENT - REPLACE WITH BACKEND AUTH LATER
    function bootstrap() {
      const storedToken = getStoredToken();
      const storedUser = getStoredUser();

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser({
          ...storedUser,
          role: normalizeRole(storedUser.role),
        });
      } else {
        clearStoredToken();
        clearStoredUser();
        setToken(null);
        setUser(null);
      }

      setAuthLoading(false);
    }

    bootstrap();
  }, []);

  async function login(credentials) {
    // TEMPORARY LOCAL AUTH FOR DEVELOPMENT - REPLACE WITH BACKEND AUTH LATER
    const email = credentials.email.trim().toLowerCase();
    const password = credentials.password;

    if (email !== LOCAL_DEV_EMAIL || password !== LOCAL_DEV_PASSWORD) {
      throw new Error("Invalid email or password");
    }

    setStoredToken(LOCAL_DEV_TOKEN);
    setStoredUser({
      ...LOCAL_DEV_USER,
      role: normalizeRole(LOCAL_DEV_USER.role),
    });
    setToken(LOCAL_DEV_TOKEN);
    setUser({
      ...LOCAL_DEV_USER,
      role: normalizeRole(LOCAL_DEV_USER.role),
    });

    return {
      ...LOCAL_DEV_USER,
      role: normalizeRole(LOCAL_DEV_USER.role),
    };
  }

  function logout() {
    // TEMPORARY LOCAL AUTH FOR DEVELOPMENT - REPLACE WITH BACKEND AUTH LATER
    clearStoredToken();
    clearStoredUser();
    setToken(null);
    setUser(null);
  }

  const value = {
    user,
    token,
    authLoading,
    isAuthenticated: Boolean(token),
    login,
    logout,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
