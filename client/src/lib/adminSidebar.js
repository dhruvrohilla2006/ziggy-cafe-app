import {
  LayoutDashboard,
  Users,
  Settings,
  Hamburger,
  Plus,
  SquarePen,
  SquareArrowRightExit,
} from "lucide-react";

const adminSidebar = [
  {
    section: "Admin",
    links: [
      {
        key: "dashboard",
        label: "Dashboard",
        href: "/admin/dashboard",
        icon: LayoutDashboard,
      },
      {
        key: "orders",
        label: "Orders",
        href: "/admin/orders",
        icon: Users,
      },
      {
        key: "all-menu",
        label: "All Menu",
        href: "/admin/menu/all",
        icon: Hamburger,
      },
      {
        key: "new-menu",
        label: "Upload New Menu",
        href: "/admin/menu/new",
        icon: Plus,
      },

      {
        key: "settings",
        label: "Settings",
        href: "/admin/settings",
        icon: Settings,
      },
      {
        key: "logout",
        label: "Logout",
        href: "/logout",
        icon: SquareArrowRightExit,
      },
    ],
  },
];

export default adminSidebar;
