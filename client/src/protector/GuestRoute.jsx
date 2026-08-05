import { Navigate, Outlet } from "react-router";
import useAuthStore from "../stores/authStore.js";
import Spinner from "../component/Spinner.jsx";
import { useEffect } from "react";
export default function GuestRoute() {
  const { loading, authenticated, user, check } = useAuthStore();

  useEffect(() => {
    check();
  }, [check]);

  if (loading) return <Spinner />;

  if (authenticated) {
    const destination =
      user?.role.toUpperCase() === "ADMIN"
        ? "/admin/dashboard"
        : "/user/dashboard";
    return <Navigate to={destination} replace />;
  }

  return <Outlet />;
}
