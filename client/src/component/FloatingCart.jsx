import { ShoppingCart } from "lucide-react";

export default function FloatingCart({ count = 0, onClick }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gray-600 text-white shadow-lg transition hover:bg-gray-800 hover:scale-105 active:scale-95"
      aria-label="Shopping Cart"
    >
      <ShoppingCart size={24} />

      {count > 0 && (
        <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </button>
  );
}
