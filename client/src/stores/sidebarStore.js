import { create } from "zustand";
import userSidebar from "../lib/userSidebar";
import adminSidebar from "../lib/adminSidebar";

const sidebars = {
  user: userSidebar,
  admin: adminSidebar,
};

const useSidebarStore = create((set) => ({
  role: "user",

  collapsed: false,

  links: sidebars.user,

  setRole: (role) => {
    // console.log(sidebars);
    // console.log("Sidebar Role\t" + role);
    // console.log("Sidebar Links\t" + Object.keys(sidebars[role]));
    set({
      role,
      links: sidebars[role] || [],
    });
  },

  toggleSidebar: () =>
    set((state) => ({
      collapsed: !state.collapsed,
    })),
}));

export default useSidebarStore;
