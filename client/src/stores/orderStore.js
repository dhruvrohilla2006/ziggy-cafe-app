import { create } from "zustand";
import axiosInstance from "../utils/axios";
import { toast } from "react-hot-toast";


const orderStore = create((set) => ({
  orderData: [],
  checkoutLoading: false,
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
  changeOrderStatusAdmin: async (id, newStatus) => {
    try {
      const { data } = await axiosInstance.post(`/order/status/${id}`, {
        status: newStatus,
      });

      console.log(data);

      if (data.success) {
        toast.success(data.message);
      }
    } catch (error) {
      console.error("Found Error\t", error);
      toast.error("Something Went Wrong");
    }
  },
  createOrderUser: async (OrderData) => {
    try {
      set({ checkoutLoading: true });

      let total = OrderData.reduce(
        (total, obj) => total + obj.price * obj.quantity,
        0,
      );
      console.log("total \t", total);
      let cartItems = OrderData.map((obj) => ({
        itemTotal: obj.quantity * obj.price,
        itemId: obj._id,
        quantity: obj.quantity,
      }));

      const { data } = await axiosInstance.post("/order/create", {
        cartItems,
        cartTotal: total,
      });

      if (data.success) {
        toast.success(data.message);
      }
    } catch (error) {
      console.error("Found Error\t", error);
      toast.error("Something Went Wrong");
    } finally {
      set({ checkoutLoading: false });
    }
  },
}));

export default orderStore;
