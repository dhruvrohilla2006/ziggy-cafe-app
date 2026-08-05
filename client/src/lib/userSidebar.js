import {
  LayoutDashboard,
  Box,
  Building2,
  ArrowLeftRight,
  FileText,
  User,
  Users,
  History,
  Settings,
} from "lucide-react";

export const sidebarConfig = [
  {
    section: "Overview",
    links: [
      {
        key: "dashboard",
        label: "Dashboard",
        href: "dashboard",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    section: "Actions",
    links: [
      {
        key: "orderHistory",
        label: "Order History",
        href: "order-history",
        icon: Box,
      },
      {
        key: "cart",
        label: "Cart",
        href: "cart",
        icon: Building2,
      },
      {
        key: "explore-menu",
        label: "Explore Menu",
        href: "explore-menu",
        icon: ArrowLeftRight,
      },
    ],
  },
  {
    section: "User",
    links: [
      {
        key: "address",
        label: "Address Details",
        href: "address",
        icon: Users,
      },
      {
        key: "payment-method",
        label: "Payment Method",
        href: "payment-method",
        icon: History,
      },
      {
        key: "setting",
        label: "Setting",
        href: "setting",
        icon: Settings,
      },
      {
        key: "profile",
        label: "Profile",
        href: "profile",
        icon: User,
      },
    ],
  },
];
