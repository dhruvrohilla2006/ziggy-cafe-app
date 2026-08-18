import Home from "../pages/Home";
import { BrowserRouter, Routes as Router, Route } from "react-router";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProtectedRoute from "../protector/ProtectedRoute";
import RoleRoute from "../protector/RoleRoute";
import UserDashboard from "../pages/user/Dashboard";
import GuestRoute from "../protector/GuestRoute";
import AdminDashboard from "../pages/admin/Dashboard";
import UserLayout from "../layout/UserLayout";
import AdminLayout from "../layout/AdminLayout";
import Profile from "../pages/user/Profile";
import ExploreMenu from "../pages/user/ExploreMenu";
import CartPage from "../pages/user/Cart";
import All from "../pages/admin/menu/All";
import New from "../pages/admin/menu/New";
import Update from "../pages/admin/menu/Update";
import Logout from "../pages/Logout";
import AdminOrder from "../pages/admin/menu/Order";

export default function AppRouter() {
  return (
    <>
      <BrowserRouter>
        <Router>
          <Route path="/" element={<Home />} />
          <Route element={<GuestRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route path="/404" element={<h1>404 Not Found</h1>} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<Register />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/user" element={<RoleRoute role="user" />}>
              <Route element={<UserLayout />}>
                <Route path="dashboard" element={<UserDashboard />} />
                <Route path="order-history" element={<h1>Order History</h1>} />
                <Route path="cart" element={<CartPage />} />
                <Route path="explore-menu" element={<ExploreMenu />} />
                <Route path="address" element={<h1>User Address</h1>} />
                <Route
                  path="payment-method"
                  element={<h1>User Payment Method</h1>}
                />
                <Route path="setting" element={<h1>User Setting</h1>} />
                <Route path="profile" element={<Profile />} />
              </Route>
            </Route>
            <Route path="/admin" element={<RoleRoute role="admin" />}>
              <Route element={<AdminLayout />}>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="menu/new" element={<New />} />
                <Route path="menu/all" element={<All />} />
                <Route path="menu/update/:id" element={<Update />} />
                <Route path="orders" element={<AdminOrder />} />
                <Route path="settings" element={<h1>settings</h1>} />
              </Route>
            </Route>
          </Route>
        </Router>
      </BrowserRouter>
    </>
  );
}
