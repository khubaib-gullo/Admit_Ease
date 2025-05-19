import React from "react";
import { getAuth } from "firebase/auth";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";


const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    toast.error("Please log in to apply.");
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;


//   return user ? <>{children}</> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
