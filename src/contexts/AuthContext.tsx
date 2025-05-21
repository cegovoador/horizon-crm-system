
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'finance' | 'inventory';
}

interface AuthContextType {
  currentUser: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string, rememberMe: boolean) => Promise<void>;
  logout: () => void;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in from localStorage
    const userData = localStorage.getItem("crm_user");
    if (userData) {
      setCurrentUser(JSON.parse(userData));
    }
    setIsLoading(false);
  }, []);

  // Mock users for demo purposes
  const mockUsers = [
    { id: "1", name: "Admin User", email: "admin@example.com", password: "admin123", role: "admin" as const },
    { id: "2", name: "Finance Manager", email: "finance@example.com", password: "finance123", role: "finance" as const },
    { id: "3", name: "Inventory Manager", email: "inventory@example.com", password: "inventory123", role: "inventory" as const },
  ];

  const login = async (email: string, password: string, rememberMe: boolean) => {
    setIsLoading(true);
    
    // Simulate API call with a delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      // Find user with matching credentials
      const user = mockUsers.find(
        (user) => user.email === email && user.password === password
      );
      
      if (!user) {
        throw new Error("Invalid email or password");
      }
      
      const { password: _, ...userWithoutPassword } = user;
      
      // Store user in state and localStorage if rememberMe is true
      setCurrentUser(userWithoutPassword);
      if (rememberMe) {
        localStorage.setItem("crm_user", JSON.stringify(userWithoutPassword));
      }
      
      toast.success("Login realizado com sucesso!");
    } catch (error) {
      toast.error("Credenciais inválidas. Tente novamente.");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("crm_user");
    toast.info("Você foi desconectado");
  };

  const resetPassword = async (email: string) => {
    setIsLoading(true);
    
    // Simulate API call with a delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      // Check if user exists with this email
      const user = mockUsers.find((user) => user.email === email);
      
      if (!user) {
        throw new Error("Email não encontrado");
      }
      
      // In a real app, this would send a password reset email
      // For demo purposes, we'll just show a success message
      toast.success("Link de recuperação enviado para seu email!");
    } catch (error) {
      toast.error("Email não encontrado");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    currentUser,
    isLoading,
    isAuthenticated: !!currentUser,
    login,
    logout,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
