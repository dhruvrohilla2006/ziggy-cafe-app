import orderStore from "../../stores/orderStore";
import {
  CheckCircle2,
  ChevronDown,
  Clock,
  Flame,
  Receipt,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";

const STATUS_STYLES = {
  pending: {
    label: "Pending",
    icon: Clock,
    dot: "bg-amber-500",
    text: "text-amber-700",
    bg: "bg-amber-50",
    ring: "ring-amber-200",
  },
  delivered: {
    label: "Delivered",
    icon: CheckCircle2,
    dot: "bg-emerald-500",
    text: "text-emerald-700",
    bg: "bg-emerald-50",
    ring: "ring-emerald-200",
  },
  cancelled: {
    label: "Cancelled",
    icon: Clock,
    dot: "bg-rose-500",
    text: "text-rose-700",
    bg: "bg-rose-50",
    ring: "ring-rose-200",
  },
};

function formatDate(iso) {
  const d = new Date(iso);
  return (
    d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }) +
    " · " +
    d.toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" })
  );
}

function OrderCard({ order }) {
  const [open, setOpen] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  const { fetchOrder, cancelOrderUser } = orderStore();
  const status = STATUS_STYLES[order.status] || STATUS_STYLES.pending;
  const StatusIcon = status.icon;
  const itemCount = order.cartItems.reduce((sum, i) => sum + i.quantity, 0);

  const handleCancel = async (e) => {
    e.stopPropagation(); // don't toggle the accordion
    if (cancelling) return;
    setCancelling(true);
    try {
      await cancelOrderUser(order._id);
    } catch (err) {
      console.error("Failed to cancel order", err);
    } finally {
      setCancelling(false);
      await fetchOrder();
    }
  };

  return (
    <div className="rounded-2xl border border-stone-200 bg-white shadow-sm overflow-hidden transition-shadow hover:shadow-md">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <div className="flex items-center gap-4 min-w-0">
          <div className="shrink-0 w-11 h-11 rounded-xl bg-orange-50 flex items-center justify-center">
            <Flame className="w-5 h-5 text-orange-500" strokeWidth={2} />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-stone-900 text-[15px]">
                Order #{order._id.slice(-6).toUpperCase()}
              </span>
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${status.bg} ${status.text} ring-1 ${status.ring}`}
              >
                <StatusIcon className="w-3 h-3" strokeWidth={2.5} />
                {status.label}
              </span>
            </div>
            <p className="text-sm text-stone-500 mt-0.5">
              {formatDate(order.createdAt)} · {itemCount} item
              {itemCount !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span className="font-semibold text-stone-900 tabular-nums">
            ₹{order.totalCartValue}
          </span>
          <ChevronDown
            className={`w-4 h-4 text-stone-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </div>
      </button>

      <div
        className={`grid transition-all duration-300 ease-in-out ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-dashed border-stone-200 px-5 py-4">
            <ul className="space-y-2.5">
              {order.cartItems.map((item) => (
                <li
                  key={item._id}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center gap-2 text-stone-700">
                    <span className="w-5 h-5 rounded-md bg-stone-100 text-stone-500 text-xs font-medium flex items-center justify-center shrink-0">
                      {item.quantity}
                    </span>
                    <span className="capitalize">{item.name}</span>
                  </div>
                  <span className="text-stone-500 tabular-nums">
                    ₹{item.subtotal}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-sm">
              <span className="text-stone-500">
                {order.status === "delivered" ? "Delivered" : "Last updated"}{" "}
                {formatDate(order.updatedAt)}
              </span>
              <span className="font-semibold text-stone-900">
                Total ₹{order.totalCartValue}
              </span>
            </div>

            {order.status === "pending" && (
              <div className="mt-3 flex justify-end">
                <button
                  onClick={handleCancel}
                  disabled={cancelling}
                  className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium text-rose-600 bg-rose-50 hover:bg-rose-100 ring-1 ring-rose-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <XCircle className="w-4 h-4" strokeWidth={2} />
                  {cancelling ? "Cancelling…" : "Cancel Order"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OrderHistory() {
  const { fetchOrder, orderData } = orderStore();

  useEffect(() => {
    fetchOrder().then((value) => console.log(value));
  }, []);

  if (orderData.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center bg-stone-50">
        <div className="text-center">
          <Receipt className="w-10 h-10 text-stone-300 mx-auto mb-3" />
          <p className="text-stone-500 text-sm">No orders yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-stone-50 py-8 px-4">
      <div className="max-w-xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-stone-900">Order History</h1>
          <p className="text-sm text-stone-500 mt-1">
            {orderData.length} order{orderData.length !== 1 ? "s" : ""} placed
          </p>
        </div>

        <div className="space-y-3">
          {orderData.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))}
        </div>
      </div>
    </div>
  );
}
