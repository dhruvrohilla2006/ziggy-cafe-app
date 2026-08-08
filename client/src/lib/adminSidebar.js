import {
  LayoutDashboard,
  Users,
  Settings,
  Hamburger,
  Plus,
  SquarePen,
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
        key: "edit-menu",
        label: "Update Menu",
        href: "/admin/menu/update",
        icon: SquarePen,
      },
      {
        key: "settings",
        label: "Settings",
        href: "/admin/settings",
        icon: Settings,
      },
    ],
  },
];

export default adminSidebar;
