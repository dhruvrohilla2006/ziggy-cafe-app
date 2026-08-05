import { Navigate, Outlet } from "react-router";
import useAuthStore from "../stores/authStore";
import Spinner from "../component/Spinner";

export default function ProtectedRoute() {
  const { loading, authenticated } = useAuthStore();

  if (loading) return <Spinner />;

  return authenticated ? <Outlet /> : <Navigate to="/login" replace />;
}
