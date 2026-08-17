import { useEffect } from "react";
import AuthStore from "../stores/authStore";
import { Navigate } from "react-router";

const Logout = () => {
  const { logout } = AuthStore();

  useEffect(() => {
    logout();
  }, [logout]);
  return <Navigate to="/" />;
};

export default Logout;
