// src/pages/admin/menu/AllMenus.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router";
import toast from "react-hot-toast";
import foodStore from "@/stores/foodStore";
import { Pencil, Trash2 } from "lucide-react";

export default function AllMenus() {
  const { allFood, loading, fetchAllFood, deleteFood } = foodStore();
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchAllFood();
  }, [fetchAllFood]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this menu item?")) return;
    setDeletingId(id);
    const res = await deleteFood(id);
    setDeletingId(null);
    res.success
      ? toast.success("Menu item deleted")
      : toast.error(res.message || "Delete failed");
  };

  if (loading) return <div className="p-6">Loading menus...</div>;

  if (!allFood.length) {
    return (
      <div className="p-6 text-center text-gray-500">
        No menu items yet.{" "}
        <Link to="/admin/menu/new" className="text-blue-600 underline">
          Add one
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">All Menus</h1>
        <Link
          to="/admin/menu/new"
          className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm"
        >
          + New Menu
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="p-3">Image</th>
              <th className="p-3">Name</th>
              <th className="p-3">Category</th>
              <th className="p-3">Price</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {allFood.map((food) => (
              <tr key={food._id} className="border-t">
                <td className="p-3">
                  <img
                    src={food.images?.[0]?.url}
                    alt={food.name}
                    className="w-12 h-12 object-cover rounded-md"
                  />
                </td>
                <td className="p-3">{food.name}</td>
                <td className="p-3">{food.category}</td>
                <td className="p-3">₹{food.price}</td>
                <td className="p-3 text-right space-x-4">
                  <Link
                    to={`/admin/menu/update/${food._id}`}
                    className="inline-flex items-center gap-1 text-blue-600"
                  >
                    <Pencil size={16} />
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(food._id)}
                    disabled={deletingId === food._id}
                    className="inline-flex items-center gap-1 text-red-600 disabled:opacity-50"
                  >
                    {deletingId === food._id ? null : <Trash2 size={16} />}
                    {deletingId === food._id ? "Deleting..." : "Delete"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
