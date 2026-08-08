import Sidebar from "../component/Sidebar";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 min-w-0 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
