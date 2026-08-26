import { useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  CalendarDays,
  ChevronDown,
  Clock3,
  IndianRupee,
  MoreHorizontal,
  PackageCheck,
  ShoppingBag,
  Star,
  TrendingUp,
  Users,
  XCircle,
} from "lucide-react";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

/* -------------------------------------------------------------------------- */
/* MOCK DATA                                                                  */
/* -------------------------------------------------------------------------- */

const dashboardData = {
  today: {
    orders: 42,
    sales: 12480,
    customers: 37,
    averageOrder: 297,
    cancelled: 3,
  },

  month: {
    sales: 284650,
    orders: 967,
  },

  mostOrdered: {
    name: "Paneer Tikka",
    category: "Starter",
    quantity: 128,
    revenue: 31872,
    rating: 4.8,
  },

  sales: {
    today: [
      { name: "10 AM", sales: 850 },
      { name: "11 AM", sales: 1200 },
      { name: "12 PM", sales: 1850 },
      { name: "1 PM", sales: 2200 },
      { name: "2 PM", sales: 1650 },
      { name: "3 PM", sales: 950 },
      { name: "4 PM", sales: 750 },
      { name: "5 PM", sales: 1100 },
      { name: "6 PM", sales: 1930 },
    ],

    week: [
      { name: "Mon", sales: 8200 },
      { name: "Tue", sales: 10400 },
      { name: "Wed", sales: 7600 },
      { name: "Thu", sales: 12800 },
      { name: "Fri", sales: 14600 },
      { name: "Sat", sales: 18200 },
      { name: "Sun", sales: 12480 },
    ],

    month: [
      { name: "Week 1", sales: 62400 },
      { name: "Week 2", sales: 71800 },
      { name: "Week 3", sales: 68900 },
      { name: "Week 4", sales: 81550 },
    ],
  },

  orderStatus: [
    { name: "Delivered", value: 52 },
    { name: "Preparing", value: 21 },
    { name: "Pending", value: 14 },
    { name: "Cancelled", value: 8 },
    { name: "Rejected", value: 5 },
  ],

  recentOrders: [
    {
      id: "#ORD-1042",
      customer: "Rahul Sharma",
      items: "2 Items",
      amount: 540,
      status: "preparing",
      time: "2 min ago",
    },
    {
      id: "#ORD-1041",
      customer: "Aman Gupta",
      items: "4 Items",
      amount: 890,
      status: "delivered",
      time: "12 min ago",
    },
    {
      id: "#ORD-1040",
      customer: "Priya Singh",
      items: "1 Item",
      amount: 249,
      status: "pending",
      time: "18 min ago",
    },
    {
      id: "#ORD-1039",
      customer: "Rohit Kumar",
      items: "3 Items",
      amount: 720,
      status: "delivered",
      time: "31 min ago",
    },
    {
      id: "#ORD-1038",
      customer: "Neha Verma",
      items: "5 Items",
      amount: 1120,
      status: "out-for-delivery",
      time: "42 min ago",
    },
  ],
};

/* -------------------------------------------------------------------------- */
/* HELPERS                                                                    */
/* -------------------------------------------------------------------------- */

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

const statusStyles = {
  pending: "bg-amber-50 text-amber-700 border border-amber-100",
  preparing: "bg-blue-50 text-blue-700 border border-blue-100",
  delivered: "bg-emerald-50 text-emerald-700 border border-emerald-100",
  "out-for-delivery": "bg-purple-50 text-purple-700 border border-purple-100",
  cancelled: "bg-red-50 text-red-700 border border-red-100",
};

const statusLabels = {
  pending: "Pending",
  preparing: "Preparing",
  delivered: "Delivered",
  "out-for-delivery": "Out for delivery",
  cancelled: "Cancelled",
};

/* -------------------------------------------------------------------------- */
/* STAT CARD                                                                  */
/* -------------------------------------------------------------------------- */

function StatCard({
  title,
  value,
  icon: Icon,
  change,
  positive = true,
  subtitle,
}) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_2px_8px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(15,23,42,0.08)]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>

          <p className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
            {value}
          </p>
        </div>

        <div className="rounded-xl bg-orange-50 p-3 text-orange-500 transition-transform duration-300 group-hover:scale-105">
          <Icon size={20} />
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <span
          className={`flex items-center gap-0.5 text-xs font-semibold ${
            positive ? "text-emerald-600" : "text-red-500"
          }`}
        >
          {positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}

          {change}
        </span>

        <span className="text-xs text-slate-400">{subtitle}</span>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* STATUS BADGE                                                               */
/* -------------------------------------------------------------------------- */

function StatusBadge({ status }) {
  return (
    <span
      className={`whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-medium ${
        statusStyles[status] || "bg-slate-50 text-slate-600"
      }`}
    >
      {statusLabels[status] || status}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* DASHBOARD                                                                  */
/* -------------------------------------------------------------------------- */

export default function Dashboard() {
  const [range, setRange] = useState("week");
  const [rangeOpen, setRangeOpen] = useState(false);

  const chartData = useMemo(() => dashboardData.sales[range], [range]);

  const rangeLabels = {
    today: "Today",
    week: "This Week",
    month: "This Month",
  };

  return (
    <div className="w-full max-h-screen overflow-y-auto bg-slate-50 p-4 sm:p-6">
      {/* HEADER */}

      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-orange-500" />

            <span className="text-xs font-semibold uppercase tracking-wider text-orange-500">
              Restaurant Overview
            </span>
          </div>

          <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
            Dashboard
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Monitor your restaurant's performance and orders.
          </p>
        </div>

        {/* RANGE SELECTOR */}

        <div className="relative">
          <button
            onClick={() => setRangeOpen((prev) => !prev)}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:shadow"
          >
            <CalendarDays size={16} className="text-slate-400" />

            {rangeLabels[range]}

            <ChevronDown
              size={15}
              className={`text-slate-400 transition-transform ${
                rangeOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {rangeOpen && (
            <div className="absolute right-0 z-30 mt-2 w-40 overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl">
              {Object.entries(rangeLabels).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => {
                    setRange(key);
                    setRangeOpen(false);
                  }}
                  className={`w-full rounded-lg px-3 py-2 text-left text-sm transition ${
                    range === key
                      ? "bg-orange-50 font-semibold text-orange-600"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* STATS */}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Today's Orders"
          value={dashboardData.today.orders}
          icon={ShoppingBag}
          change="+12.5%"
          subtitle="vs yesterday"
        />

        <StatCard
          title="Today's Sales"
          value={formatCurrency(dashboardData.today.sales)}
          icon={IndianRupee}
          change="+8.4%"
          subtitle="vs yesterday"
        />

        <StatCard
          title="Monthly Sales"
          value={formatCurrency(dashboardData.month.sales)}
          icon={TrendingUp}
          change="+14.2%"
          subtitle="vs last month"
        />

        <StatCard
          title="Average Order"
          value={formatCurrency(dashboardData.today.averageOrder)}
          icon={BarChart3}
          change="+4.8%"
          subtitle="vs last week"
        />
      </div>

      {/* CHARTS */}

      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-3">
        {/* SALES */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_2px_8px_rgba(15,23,42,0.04)] xl:col-span-2">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-slate-900">Sales Overview</h2>

              <p className="mt-1 text-xs text-slate-400">
                Revenue generated during {rangeLabels[range].toLowerCase()}
              </p>
            </div>

            <div className="rounded-lg bg-emerald-50 p-2 text-emerald-600">
              <TrendingUp size={18} />
            </div>
          </div>

          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{
                  top: 10,
                  right: 10,
                  left: -15,
                  bottom: 0,
                }}
              >
                <defs>
                  <linearGradient
                    id="salesGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#f97316" stopOpacity={0.25} />

                    <stop offset="100%" stopColor="#f97316" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  vertical={false}
                  stroke="#e2e8f0"
                  strokeDasharray="4 4"
                />

                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fontSize: 12,
                    fill: "#94a3b8",
                  }}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fontSize: 12,
                    fill: "#94a3b8",
                  }}
                  tickFormatter={(value) =>
                    value >= 1000
                      ? `₹${(value / 1000).toFixed(0)}k`
                      : `₹${value}`
                  }
                />

                <Tooltip
                  formatter={(value) => [formatCurrency(value), "Sales"]}
                  cursor={{
                    stroke: "#f97316",
                    strokeDasharray: "4 4",
                  }}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid #e2e8f0",
                    background: "#ffffff",
                    boxShadow: "0 8px 30px rgba(15,23,42,0.08)",
                  }}
                />

                <Area
                  type="monotone"
                  dataKey="sales"
                  stroke="#f97316"
                  strokeWidth={2.5}
                  fill="url(#salesGradient)"
                  dot={false}
                  activeDot={{
                    r: 5,
                    fill: "#f97316",
                    stroke: "#fff",
                    strokeWidth: 2,
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ORDER STATUS */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_2px_8px_rgba(15,23,42,0.04)]">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-slate-900">Order Status</h2>

              <p className="mt-1 text-xs text-slate-400">
                Current order distribution
              </p>
            </div>

            <PackageCheck size={18} className="text-slate-400" />
          </div>

          <div className="relative mt-3 h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dashboardData.orderStatus}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={62}
                  outerRadius={85}
                  paddingAngle={3}
                  stroke="none"
                >
                  {dashboardData.orderStatus.map((_, index) => (
                    <Cell
                      key={index}
                      fill={
                        ["#22c55e", "#3b82f6", "#f59e0b", "#ef4444", "#94a3b8"][
                          index
                        ]
                      }
                    />
                  ))}
                </Pie>

                <Tooltip formatter={(value) => [`${value}%`, "Orders"]} />
              </PieChart>
            </ResponsiveContainer>

            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-slate-900">
                {dashboardData.today.orders}
              </span>

              <span className="text-xs text-slate-400">Orders</span>
            </div>
          </div>

          <div className="space-y-3">
            {dashboardData.orderStatus.map((item, index) => {
              const colors = [
                "bg-emerald-500",
                "bg-blue-500",
                "bg-amber-500",
                "bg-red-500",
                "bg-slate-400",
              ];

              return (
                <div
                  key={item.name}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${colors[index]}`}
                    />

                    <span className="text-slate-600">{item.name}</span>
                  </div>

                  <span className="font-semibold text-slate-800">
                    {item.value}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* MOST ORDERED + RECENT ORDERS */}

      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* MOST ORDERED */}

        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_2px_8px_rgba(15,23,42,0.04)]">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-slate-900">
                Most Ordered Item
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                Your best selling dish
              </p>
            </div>

            <div className="rounded-xl bg-amber-50 p-2.5 text-amber-500">
              <Star size={18} fill="currentColor" />
            </div>
          </div>

          <div className="mt-6 flex items-center gap-4">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-orange-50 text-4xl">
              🍛
            </div>

            <div className="min-w-0">
              <h3 className="truncate text-lg font-bold text-slate-900">
                {dashboardData.mostOrdered.name}
              </h3>

              <p className="text-sm capitalize text-slate-400">
                {dashboardData.mostOrdered.category}
              </p>

              <div className="mt-1 flex items-center gap-1 text-sm text-amber-500">
                <Star size={13} fill="currentColor" />

                {dashboardData.mostOrdered.rating}
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-slate-50 p-3">
              <p className="text-xs text-slate-400">Ordered</p>

              <p className="mt-1 font-bold text-slate-900">
                {dashboardData.mostOrdered.quantity}
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-3">
              <p className="text-xs text-slate-400">Revenue</p>

              <p className="mt-1 font-bold text-slate-900">
                {formatCurrency(dashboardData.mostOrdered.revenue)}
              </p>
            </div>
          </div>
        </div>

        {/* RECENT ORDERS */}

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_2px_8px_rgba(15,23,42,0.04)] lg:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <div>
              <h2 className="font-semibold text-slate-900">Recent Orders</h2>

              <p className="mt-1 text-xs text-slate-400">
                Latest orders from your customers
              </p>
            </div>

            <button className="text-sm font-medium text-orange-500 transition hover:text-orange-600">
              View all
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px]">
              <thead>
                <tr className="border-b border-slate-100 text-left text-xs uppercase tracking-wide text-slate-400">
                  <th className="px-5 py-3 font-medium">Order</th>
                  <th className="px-5 py-3 font-medium">Customer</th>
                  <th className="px-5 py-3 font-medium">Items</th>
                  <th className="px-5 py-3 font-medium">Amount</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">Time</th>
                  <th />
                </tr>
              </thead>

              <tbody>
                {dashboardData.recentOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-slate-50 transition hover:bg-slate-50"
                  >
                    <td className="px-5 py-4 text-sm font-semibold text-slate-900">
                      {order.id}
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-50 text-xs font-bold text-orange-600">
                          {order.customer
                            .split(" ")
                            .map((word) => word[0])
                            .join("")}
                        </div>

                        <span className="text-sm font-medium text-slate-700">
                          {order.customer}
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-500">
                      {order.items}
                    </td>

                    <td className="px-5 py-4 text-sm font-semibold text-slate-800">
                      {formatCurrency(order.amount)}
                    </td>

                    <td className="px-5 py-4">
                      <StatusBadge status={order.status} />
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5 whitespace-nowrap text-xs text-slate-400">
                        <Clock3 size={13} />
                        {order.time}
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <button className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700">
                        <MoreHorizontal size={17} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* BOTTOM SUMMARY */}

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_2px_8px_rgba(15,23,42,0.04)]">
          <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
            <Users size={20} />
          </div>

          <div>
            <p className="text-xs text-slate-400">Today's Customers</p>

            <p className="mt-1 text-xl font-bold text-slate-900">
              {dashboardData.today.customers}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_2px_8px_rgba(15,23,42,0.04)]">
          <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
            <PackageCheck size={20} />
          </div>

          <div>
            <p className="text-xs text-slate-400">Monthly Orders</p>

            <p className="mt-1 text-xl font-bold text-slate-900">
              {dashboardData.month.orders}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_2px_8px_rgba(15,23,42,0.04)]">
          <div className="rounded-xl bg-red-50 p-3 text-red-500">
            <XCircle size={20} />
          </div>

          <div>
            <p className="text-xs text-slate-400">Cancelled Today</p>

            <p className="mt-1 text-xl font-bold text-slate-900">
              {dashboardData.today.cancelled}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
