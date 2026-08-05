import { create } from "zustand";
import { userSidebar } from "../config/userSidebar";
import { adminSidebar } from "../config/adminSidebar";

const sidebars = {
  user: userSidebar,
  admin: adminSidebar,
};

const useSidebarStore = create((set) => ({
  role: "user",

  collapsed: false,

  links: sidebars.user,

  setRole: (role) =>
    set({
      role,
      links: sidebars[role] || [],
    }),

  toggleSidebar: () =>
    set((state) => ({
      collapsed: !state.collapsed,
    })),
}));

export default useSidebarStore;
