import { Navigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

export default function ProtectedRoute({ children, requiredRole }) {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/login" />; // Not logged in

  if (requiredRole && user.role !== requiredRole)
    return <Navigate to="/unauthorized" />;

  return children;
}
