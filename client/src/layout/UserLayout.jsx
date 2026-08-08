import FloatingCart from "../component/FloatingCart";
import Sidebar from "../component/Sidebar";
import { Outlet } from "react-router";
import foodStore from "../stores/foodStore";
import { useEffect } from "react";
import cartStore from "../stores/cartStore";
import { useNavigate } from "react-router";

const Layout = () => {
  const { fetchAllFood } = foodStore();
  const { cartCount } = cartStore();
  const navigator = useNavigate();
  useEffect(() => {
    fetchAllFood();
  }, [fetchAllFood]);
  return (
    <div className="flex min-h-screen max-h-screen overflow-y-hidden">
      <Sidebar />
      <main className="flex-1 min-w-0 p-1">
        <Outlet />
      </main>
      <FloatingCart count={cartCount} onClick={() => navigator("cart")} />
    </div>
  );
};

export default Layout;
