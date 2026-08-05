import { create } from "zustand";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axios";

const authStore = create((set, get) => ({
  authRole: null,
  authenticated: false,
  user: {
    id: 123456789,
    name: "John Doe",
    role: "user",
  },
  login: async (payload) => {
    try {
      await axiosInstance.post("/auth/login", payload);
      const { data } = await axiosInstance.get("/auth/check");

      if (data.success) {
        set((state) => ({
          authRole: data.user.role,
          user: data.user,
          authenticated: state.authenticated ? false : true,
        }));
      }
    } catch (err) {
      console.error("Found a Error\t", err);
      toast.error("Unexpected Error");
    } finally {
      toast.success("Login Successful");
    }
  },
  logout: async () => {},
  check: async () => {
    try {
      // await axiosInstance.post("/auth/login", payload);
      const { data } = await axiosInstance.get("/auth/check");

      if (data.success) {
        set((state) => ({
          authRole: data.user.role,
          user: data.user,
          authenticated: state.authenticated ? false : true,
        }));
      }
    } catch (err) {
      console.error("Found a Error\t", err);
      toast.error("Unexpected Error");
    } finally {
      toast.success("Login Successful");
    }
  },
  register: async () => {
    try {
    } catch (err) {
      console.error("Found a Error\t", err);
    } finally {
    }
  },
}));

export default authStore;
