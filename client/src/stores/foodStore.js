// src/store/foodStore.js
import { create } from "zustand";
import axiosInstance from "../utils/axios";

const foodStore = create((set) => ({
  allFood: [],
  loading: false,

  fetchAllFood: async () => {
    try {
      set({ loading: true });
      const { data } = await axiosInstance.get("/food/getAll");
      if (data.success) set({ allFood: data.data });
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },

  addFood: async (formData) => {
    try {
      const { data } = await axiosInstance.post("/food/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (data.success) {
        set((state) => ({ allFood: [data.data, ...state.allFood] }));
        return { success: true };
      }
      return { success: false, message: data.message };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: error?.response?.data?.message || "Failed to create food",
      };
    }
  },

  deleteFood: async (id) => {
    try {
      const { data } = await axiosInstance.delete(`/food/deleteOne/${id}`);
      if (data.success) {
        set((state) => ({
          allFood: state.allFood.filter((f) => f._id !== id),
        }));
        return { success: true };
      }
      return { success: false, message: data.message };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: error?.response?.data?.message || "Failed to delete food",
      };
    }
  },

  getFoodById: async (id) => {
    try {
      const { data } = await axiosInstance.get(`/food/getOne/${id}`);
      if (data.success) return { success: true, data: data.data };
      return { success: false, message: data.message };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: error?.response?.data?.message || "Failed to fetch food",
      };
    }
  },

  updateFood: async (id, payload) => {
    try {
      const { data } = await axiosInstance.put(`/food/update/${id}`, payload);
      if (data.success) {
        set((state) => ({
          allFood: state.allFood.map((f) => (f._id === id ? data.data : f)),
        }));
        return { success: true, data: data.data };
      }
      return { success: false, message: data.message };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: error?.response?.data?.message || "Failed to update food",
        errors: error?.response?.data?.errors, // zod field errors if your validate middleware sends them
      };
    }
  },
}));

export default foodStore;
