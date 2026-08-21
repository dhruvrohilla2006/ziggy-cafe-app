import { Eye, ChevronDown, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import orderStore from "@/stores/orderStore";

const ORDER_STATUSES = [
  "pending",
  "accepted",
  "preparing",
  "out-for-delivery",
  "delivered",
  "cancelled",
  "rejected",
];

const getStatusStyle = (status) => {
  switch (status) {
    case "pending":
      return "bg-yellow-50 text-yellow-700 border-yellow-200";

    case "accepted":
      return "bg-blue-50 text-blue-700 border-blue-200";

    case "preparing":
      return "bg-orange-50 text-orange-700 border-orange-200";

    case "out-for-delivery":
      return "bg-purple-50 text-purple-700 border-purple-200";

    case "delivered":
      return "bg-green-50 text-green-700 border-green-200";

    case "cancelled":
    case "rejected":
      return "bg-red-50 text-red-700 border-red-200";

    default:
      return "bg-gray-50 text-gray-700 border-gray-200";
  }
};

const getStatusDot = (status) => {
  switch (status) {
    case "pending":
      return "bg-yellow-500";

    case "accepted":
      return "bg-blue-500";

    case "preparing":
      return "bg-orange-500";

    case "out-for-delivery":
      return "bg-purple-500";

    case "delivered":
      return "bg-green-500";

    case "cancelled":
    case "rejected":
      return "bg-red-500";

    default:
      return "bg-gray-400";
  }
};

const formatStatus = (status) => {
  return status.replaceAll("-", " ");
};

/* =========================================================
   STATUS DROPDOWN
========================================================= */

const StatusDropdown = ({ status, onChange }) => {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({
    top: 0,
    left: 0,
  });

  const buttonRef = useRef(null);

  const handleOpen = () => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();

    setPosition({
      top: rect.bottom + 4,
      left: rect.left,
    });

    setOpen((prev) => !prev);
  };

  const handleChange = (newStatus) => {
    setOpen(false);

    if (newStatus !== status) {
      onChange(newStatus);
    }
  };

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={handleOpen}
        className={`inline-flex items-center justify-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-medium capitalize shadow-sm transition focus:outline-none focus:ring-2 focus:ring-gray-200 ${getStatusStyle(
          status,
        )}`}
      >
        {formatStatus(status)}

        <ChevronDown
          size={14}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          className="fixed z-[9999] w-48 rounded-md border border-gray-200 bg-white shadow-lg"
          style={{
            top: position.top,
            left: position.left,
          }}
        >
          <ul className="p-1.5 text-sm font-medium">
            {ORDER_STATUSES.map((item) => (
              <li key={item}>
                <button
                  type="button"
                  onClick={() => handleChange(item)}
                  className={`inline-flex w-full items-center rounded-md px-3 py-2 text-left capitalize transition hover:bg-gray-100 ${
                    item === status ? "bg-gray-50" : ""
                  }`}
                >
                  <span
                    className={`mr-2 h-2 w-2 rounded-full ${getStatusDot(
                      item,
                    )}`}
                  />

                  <span
                    className={
                      item === status
                        ? "font-semibold text-gray-900"
                        : "text-gray-700"
                    }
                  >
                    {formatStatus(item)}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

/* =========================================================
   ORDER DETAILS MODAL
========================================================= */

const OrderDetailsModal = ({ order, onClose }) => {
  if (!order) return null;

  const totalItems =
    order.cartItems?.reduce((total, item) => total + item.quantity, 0) || 0;

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl overflow-hidden rounded-xl bg-white shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Order Details
            </h2>

            <p className="mt-0.5 text-xs text-gray-500">#{order._id}</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-2 border-gray-200 border-2 text-gray-500 hover:bg-red-500 hover:text-white "
          >
            <X size={20} />
          </button>
        </div>

        {/* Order Information */}
        <div className="border-b px-6 py-5">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {/* Customer */}
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                Customer
              </p>

              <p className="mt-1 font-medium text-gray-900">
                {order.userDetails?.name || "Unknown"}
              </p>

              <p className="text-sm text-gray-500">
                {order.userDetails?.email || "-"}
              </p>
            </div>

            {/* Order Date */}
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                Order Date
              </p>

              <p className="mt-1 font-medium text-gray-900">
                {new Date(order.createdAt).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </p>

              <p className="text-sm text-gray-500">
                {new Date(order.createdAt).toLocaleTimeString("en-IN", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>

            {/* Status */}
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                Status
              </p>

              <span
                className={`mt-2 inline-flex rounded-md border px-2.5 py-1 text-xs font-medium capitalize ${getStatusStyle(
                  order.status,
                )}`}
              >
                {formatStatus(order.status)}
              </span>
            </div>

            {/* Total Items */}
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                Total Items
              </p>

              <p className="mt-1 font-medium text-gray-900">
                {totalItems} {totalItems === 1 ? "item" : "items"}
              </p>
            </div>
          </div>
        </div>

        {/* Ordered Items */}
        <div className="px-6 py-5">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Ordered Items</h3>

            <span className="text-sm text-gray-500">
              {order.cartItems?.length || 0} products
            </span>
          </div>

          <div className="max-h-64 overflow-y-auto rounded-lg border">
            {order.cartItems?.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between border-b p-4 last:border-b-0"
              >
                {/* Food Information */}
                <div className="min-w-0">
                  <p className="font-medium text-gray-900">{item.name}</p>

                  <p className="mt-1 text-xs text-gray-500">
                    ₹{item.price} × {item.quantity}
                  </p>
                </div>

                {/* Subtotal */}
                <p className="ml-4 whitespace-nowrap font-medium text-gray-900">
                  ₹{item.subtotal?.toLocaleString("en-IN")}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Total */}
        <div className="border-t bg-gray-50 px-6 py-5">
          <div className="flex items-center justify-between">
            <span className="font-medium text-gray-700">Total Amount</span>

            <span className="text-xl font-semibold text-gray-900">
              ₹{order.totalCartValue?.toLocaleString("en-IN")}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-gray-300 text-white bg-red-800 px-4 py-2 text-sm font-medium  hover:bg-red-500"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

/* =========================================================
   ORDER PAGE
========================================================= */

const Order = () => {
  const { orderData, getAllOrderAdmin, changeOrderStatusAdmin } = orderStore();

  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    getAllOrderAdmin();
  }, [getAllOrderAdmin]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await changeOrderStatusAdmin(orderId, newStatus);

      getAllOrderAdmin()

      // Update the currently opened modal as well
      if (selectedOrder?._id === orderId) {
        setSelectedOrder((prev) => ({
          ...prev,
          status: newStatus,
        }));
      }
    } catch (error) {
      console.error("Failed to update order status:", error);
    }
  };

  const pendingOrders = orderData.filter(
    (order) => order.status === "pending",
  ).length;

  const totalRevenue = orderData.reduce(
    (total, order) => total + (order.totalCartValue || 0),
    0,
  );

  return (
    <>
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Orders</h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage and track all customer orders.
          </p>
        </div>

        {/* Stats */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-lg border bg-white p-4">
            <p className="text-sm text-gray-500">Total Orders</p>

            <p className="mt-1 text-2xl font-semibold text-gray-900">
              {orderData.length}
            </p>
          </div>

          <div className="rounded-lg border bg-white p-4">
            <p className="text-sm text-gray-500">Pending Orders</p>

            <p className="mt-1 text-2xl font-semibold text-yellow-600">
              {pendingOrders}
            </p>
          </div>

          <div className="rounded-lg border bg-white p-4">
            <p className="text-sm text-gray-500">Total Revenue</p>

            <p className="mt-1 text-2xl font-semibold text-green-600">
              ₹{totalRevenue.toLocaleString("en-IN")}
            </p>
          </div>
        </div>

        {/* Orders Table */}
        <div className="overflow-hidden rounded-lg border bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-gray-600">
                    Order
                  </th>

                  <th className="px-4 py-3 text-left font-medium text-gray-600">
                    Customer
                  </th>

                  <th className="px-4 py-3 text-left font-medium text-gray-600">
                    Items
                  </th>

                  <th className="px-4 py-3 text-left font-medium text-gray-600">
                    Date
                  </th>

                  <th className="px-4 py-3 text-left font-medium text-gray-600">
                    Status
                  </th>

                  <th className="px-4 py-3 text-right font-medium text-gray-600">
                    Total
                  </th>

                  <th className="px-4 py-3 text-right font-medium text-gray-600">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {orderData.length > 0 ? (
                  orderData.map((order) => {
                    const totalItems =
                      order.cartItems?.reduce(
                        (total, item) => total + item.quantity,
                        0,
                      ) || 0;

                    return (
                      <tr
                        key={order._id}
                        className="border-b last:border-b-0 hover:bg-gray-50"
                      >
                        {/* Order */}
                        <td className="px-4 py-4">
                          <p className="font-medium text-gray-900">
                            #{order._id.slice(-6).toUpperCase()}
                          </p>

                          <p className="mt-0.5 text-xs text-gray-400">
                            {order._id}
                          </p>
                        </td>

                        {/* Customer */}
                        <td className="px-4 py-4">
                          <p className="font-medium text-gray-900">
                            {order.userDetails?.name || "Unknown"}
                          </p>

                          <p className="mt-0.5 text-xs text-gray-500">
                            {order.userDetails?.email || "-"}
                          </p>
                        </td>

                        {/* Items */}
                        <td className="px-4 py-4">
                          <p className="font-medium text-gray-900">
                            {totalItems} {totalItems === 1 ? "item" : "items"}
                          </p>

                          <p className="mt-0.5 text-xs text-gray-500">
                            {order.cartItems?.length || 0} products
                          </p>
                        </td>

                        {/* Date */}
                        <td className="px-4 py-4 whitespace-nowrap">
                          <p className="text-gray-900">
                            {new Date(order.createdAt).toLocaleDateString(
                              "en-IN",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              },
                            )}
                          </p>

                          <p className="mt-0.5 text-xs text-gray-500">
                            {new Date(order.createdAt).toLocaleTimeString(
                              "en-IN",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              },
                            )}
                          </p>
                        </td>

                        {/* Status */}
                        <td className="px-4 py-4">
                          <StatusDropdown
                            status={order.status}
                            onChange={(newStatus) =>
                              handleStatusChange(order._id, newStatus)
                            }
                          />
                        </td>

                        {/* Total */}
                        <td className="px-4 py-4 text-right">
                          <span className="font-semibold text-gray-900">
                            ₹{order.totalCartValue?.toLocaleString("en-IN")}
                          </span>
                        </td>

                        {/* Action */}
                        <td className="px-4 py-4 text-right">
                          <button
                            type="button"
                            title="View order"
                            onClick={() => setSelectedOrder(order)}
                            className="inline-flex items-center justify-center rounded-md border border-gray-200 p-2 text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
                          >
                            <Eye size={16} />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan="7"
                      className="px-4 py-12 text-center text-gray-500"
                    >
                      No orders found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </>
  );
};

export default Order;
