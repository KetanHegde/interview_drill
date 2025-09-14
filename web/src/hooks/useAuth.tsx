import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { User, AuthContextType } from "../types/auth";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async (): Promise<void> => {
    try {
      const response = await fetch("/api/me", {
        credentials: "include",
      });
      if (response.ok) {
        const userData: User = await response.json();
        setUser(userData);
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Auth check failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const login = (): void => {
    window.location.href = "/auth/google";
  };

  const logout = async (): Promise<void> => {
    try {
      const response = await fetch("/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        setUser(null);
      } else {
        throw new Error("Backend logout failed");
      }
    } catch (error) {
      console.error("Logout failed:", error);
      setUser(null);
      window.location.href = "/";
    }
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
