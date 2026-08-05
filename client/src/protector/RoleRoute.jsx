import { Outlet, Navigate } from "react-router";
import useAuthStore from "../stores/authStore";
import Spinner from "../component/Spinner";
const RoleRoute = ({ role }) => {
  const { authRole } = useAuthStore();

  console.log(authRole);

  if (authRole == null || authRole == undefined)
    return <Navigate to="/" replace />;

  if (role.toUpperCase() === authRole.toUpperCase()) {
    return <Outlet />;
  }
  return <Navigate to="/404" replace />;
};

export default RoleRoute;
