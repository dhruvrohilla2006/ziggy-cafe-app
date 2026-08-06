import { LayoutDashboard, Users, Settings } from "lucide-react";

const adminSidebar = [
  {
    section: "Admin",
    links: [
      {
        key: "dashboard",
        label: "Dashboard",
        path: "/admin/dashboard",
        icon: LayoutDashboard,
      },
      {
        key: "users",
        label: "Users",
        path: "/admin/users",
        icon: Users,
      },
      {
        key: "settings",
        label: "Settings",
        path: "/admin/settings",
        icon: Settings,
      },
    ],
  },
];

export default adminSidebar;
