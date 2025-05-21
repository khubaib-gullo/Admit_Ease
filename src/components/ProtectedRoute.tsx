import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase"; // use shared instance
import { toast } from "sonner";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      console.log("Auth state:", firebaseUser);
      setUser(firebaseUser);
    });

    return () => unsubscribe();
  }, []);

  if (user === undefined) {
    return <div className="text-center p-8">Checking authentication...</div>;
  }

  if (!user) {
    toast.error("Please log in to apply.");
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
