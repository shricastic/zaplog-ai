import React from "react";
import { Navigate } from "react-router";
import { useAuth } from "@/hooks/AuthContext";

const ProtectedRoute = ({ children }: React.PropsWithChildren) => {
  const { user } = useAuth(); // Get authentication state

  if (!navigator.onLine) {
    return <Navigate to="*" replace />;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
