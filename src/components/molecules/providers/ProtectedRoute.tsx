// src/components/ProtectedRoute.js
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const ProtectedRoute = ({ children }: any) => {
  // @ts-ignore
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a loader
  }

  return isAuthenticated() ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
