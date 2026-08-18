import { create } from "zustand";
import axiosInstance from "../utils/axios";
import { toast } from "react-hot-toast";
const orderStore = create((set) => ({
  orderData: [],
  getAllOrderUser: async () => {
    try {
      const { data } = await axiosInstance.get("/order/getAllUser");

      if (data.success) {
        set({ orderData: data.data });
        toast.success(data.message);
      }
    } catch (error) {
      console.error("Found Error\t", error);
    }
  },
  getAllOrderAdmin: async () => {
    try {
      const { data } = await axiosInstance.get("/order/getAllAdmin");

      if (data.success) {
        set({ orderData: data.data });
        toast.success(data.message);
      }
    } catch (error) {
      console.error("Found Error\t", error);
      toast.error("Something Went Wrong");
    }
  },
}));

export default orderStore;
