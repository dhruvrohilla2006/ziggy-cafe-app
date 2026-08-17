// src/pages/admin/menu/UpdateMenu.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";
import foodStore from "@/stores/foodStore";

const categoryEnum = [
  "all",
  "breakfast",
  "lunch",
  "dinner",
  "brunch",
  "beverage",
  "dessert",
  "sweet",
];

const foodTypeEnum = [
  "all",
  "veg",
  "non-veg",
  "gluten-free",
  "dairy-free",
  "vegan",
  "dairy",
];

const NAME_REGEX = /^[A-Za-z\s'-]+$/;

export default function UpdateMenu() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getFoodById, updateFood } = foodStore();

  const [form, setForm] = useState(null); // null until loaded
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    (async () => {
      const res = await getFoodById(id);
      if (res.success) {
        setForm({
          name: res.data.name ?? "",
          price: res.data.price ?? "",
          description: res.data.description ?? "",
          isAvailable: res.data.isAvailable ?? true,
          category: res.data.category ?? "",
          foodType: res.data.foodType ?? "",
        });
      } else {
        toast.error(res.message || "Failed to load item");
        navigate("/admin/menu/all");
      }
      setLoading(false);
    })();
  }, [id, getFoodById, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = () => {
    const next = {};

    if (form.name) {
      if (form.name.trim().length < 10)
        next.name = "Minimum length is 10 characters";
      else if (form.name.length > 200)
        next.name = "Max length for name is 200 characters";
      else if (!NAME_REGEX.test(form.name))
        next.name =
          "Name can only contain letters, spaces, apostrophes, and hyphens";
    }

    if (form.price !== "" && form.price !== null) {
      const p = Number(form.price);
      if (Number.isNaN(p) || p < 1) next.price = "Minimum price is 1";
      else if (p > 9999) next.price = "Maximum price is 9999";
    }

    if (form.description) {
      if (form.description.trim().length < 100)
        next.description = "Minimum length is 100 characters";
      else if (form.description.length > 500)
        next.description = "Max length is 500 characters";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    // strict schema on the backend — only send fields that have a value
    const payload = Object.fromEntries(
      Object.entries(form).filter(
        ([, v]) => v !== "" && v !== null && v !== undefined,
      ),
    );
    payload.price = Number(payload.price);

    setSubmitting(true);
    const res = await updateFood(id, payload);
    setSubmitting(false);

    if (res.success) {
      toast.success("Menu item updated");
      navigate("/admin/menu/all");
    } else {
      if (res.errors) setErrors(res.errors);
      toast.error(res.message || "Failed to update menu item");
    }
  };

  if (loading || !form) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-2xl">
      <h1 className="text-xl font-semibold mb-6">Update Menu Item</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 text-sm"
          />
          {errors.name && (
            <p className="text-red-600 text-xs mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Description{" "}
            <span className="text-gray-400">(min 100 characters)</span>
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            className="w-full border rounded-md px-3 py-2 text-sm"
          />
          <p className="text-xs text-gray-400 mt-1">
            {form.description.length} chars
          </p>
          {errors.description && (
            <p className="text-red-600 text-xs mt-1">{errors.description}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Price</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 text-sm"
              min="1"
              max="9999"
            />
            {errors.price && (
              <p className="text-red-600 text-xs mt-1">{errors.price}</p>
            )}
          </div>

          <div className="flex items-end pb-2">
            <label className="inline-flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                name="isAvailable"
                checked={form.isAvailable}
                onChange={handleChange}
              />
              Available
            </label>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 text-sm"
            >
              <option value="">Select category</option>
              {categoryEnum.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Food Type</label>
            <select
              name="foodType"
              value={form.foodType}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 text-sm"
            >
              <option value="">Select type</option>
              {foodTypeEnum.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="px-5 py-2 bg-blue-600 text-white rounded-md text-sm disabled:opacity-50"
        >
          {submitting ? "Updating..." : "Update Menu Item"}
        </button>
      </form>
    </div>
  );
}
