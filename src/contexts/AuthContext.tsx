import React, { createContext, useContext, useState, useCallback } from "react";
import { AuthState, User } from "@/types";
import { authService } from "@/services/authService";

interface AuthContextType extends AuthState {
  loginClient: (email: string) => Promise<boolean>;
  loginAdmin: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: false,
  });

  const loginClient = useCallback(async (email: string) => {
    setState((s) => ({ ...s, isLoading: true }));
    const user = await authService.loginClient(email);
    if (user) {
      setState({ user, isAuthenticated: true, isLoading: false });
      return true;
    }
    setState((s) => ({ ...s, isLoading: false }));
    return false;
  }, []);

  const loginAdmin = useCallback(async (email: string, password: string) => {
    setState((s) => ({ ...s, isLoading: true }));
    const user = await authService.loginAdmin(email, password);
    if (user) {
      setState({ user, isAuthenticated: true, isLoading: false });
      return true;
    }
    setState((s) => ({ ...s, isLoading: false }));
    return false;
  }, []);

  const logout = useCallback(() => {
    setState({ user: null, isAuthenticated: false, isLoading: false });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, loginClient, loginAdmin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
