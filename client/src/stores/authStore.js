import { create } from "zustand";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axios";

const authStore = create((set) => ({
  loading: false,
  loadingMsg: "Loading Data",
  authRole: null,
  authenticated: false,
  user: {
    id: 123456789,
    name: "John Doe",
    role: "user",
  },
  login: async (payload) => {
    try {
      // set({ loading: true, loadingMsg: "Logging User" });
      await axiosInstance.post("/auth/login", payload);
      const { data } = await axiosInstance.get("/auth/check");

      if (data.success) {
        set({
          authRole: data.user.role,
          user: data.user,
          authenticated: true,
        });

        // toast.success("Loging Successfull");
      }
    } catch (err) {
      // set({ loading: false, loadingMsg: "Logging User" });
      console.error("Found a Error\t", err);
      toast.error("Unexpected Error");
    } finally {
      toast.success("Login Successful");
      // set({ loading: false, loadingMsg: "Logging User" });
    }
  },
  logout: async () => {
    try {
      // set({ loading: true, loadingMsg: "Logging Out User" });
      const { data } = await axiosInstance.get("/auth/logout");
      console.log(data);
      set({
        authRole: null,
        authenticated: false,
        user: {
          id: 0,
          name: "",
          role: "",
        },
      });
    } catch (err) {
      console.error(err);
      toast.error("Unexpected Error");
      // set({ loading: false, loadingMsg: "Logging Out User" });
    } finally {
      // set({ loading: false, loadingMsg: "Logging Out User" });
      toast.success("Logout Succesfuly");
    }
  },
  check: async () => {
    try {
      // await axiosInstance.post("/auth/login", payload);
      const { data } = await axiosInstance.get("/auth/check");

      if (data.success) {
        set({
          authRole: data?.user?.role,
          user: data.user,
          authenticated: true,
        });
        toast.success("Login Successful");
      }
    } catch (err) {
      console.error("Found a Error\t", err);
      toast.error("Unexpected Error");
    } finally {
      // toast.success("Login Successful");
    }
  },
  // register: async () => {
  //   try {
  //   } catch (err) {
  //     console.error("Found a Error\t", err);
  //   } finally {
  //   }
  // },
}));

export default authStore;
