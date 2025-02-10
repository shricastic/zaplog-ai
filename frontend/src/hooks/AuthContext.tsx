import { environment } from "@/env";
import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate  } from "react-router";

// Define the AuthContext type
interface AuthContextType {
  user: any; // Replace 'any' with your user type (e.g., User)
  login: (userData: any) => void;
  logout: () => void;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(localStorage.getItem("zaplog-token") ? true : null);
  // const navigate = useNavigate();


  useEffect(() => {
    // Check localStorage or sessionStorage for an existing user
    const storedUser = localStorage.getItem("zaplog-token");
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);



  const login = async (userData: any) => {
    if(userData){
        setUser(true);
    }
    localStorage.setItem("zaplog-token", userData);
  };

  const logout = () => {
    setUser(false);
    localStorage.removeItem("zaplog-token");
    // navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
