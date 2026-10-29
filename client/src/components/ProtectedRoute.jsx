import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const token =
    localStorage.getItem("renewhub-token") ||
    sessionStorage.getItem("renewhub-token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;