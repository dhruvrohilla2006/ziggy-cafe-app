import { Navigate, Outlet } from "react-router";
import useAuthStore from "../stores/authStore.js";
import Spinner from "../component/Spinner.jsx";
import { useEffect } from "react";
import sideBarStore from "../stores/sidebarStore.js";

export default function GuestRoute() {
  const { setRole } = sideBarStore();
  const { loading, authenticated, user, check } = useAuthStore();

  useEffect(() => {
    check();
    setRole(user.role);
  }, [check, user.role, setRole]);

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
