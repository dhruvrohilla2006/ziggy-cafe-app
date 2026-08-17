import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { ChevronLeft, ChevronRight, Menu, User, X } from "lucide-react";
import clsx from "clsx";
// import { sidebarConfig } from "../lib/userSidebar";
import AuthStore from "../stores/authStore";
import useSidebarStore from "../stores/sidebarStore";

export default function Sidebar() {
  const location = useLocation();
  const pathnameArray = location.pathname.split("/");
  const pathname = pathnameArray[pathnameArray.length - 1];
  console.log(pathname);
  const { user } = AuthStore();
  const { links } = useSidebarStore();

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile drawer when route changes
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (href) => pathname === href;

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-3 left-3 z-30 p-2 rounded-md border bg-white"
      >
        <Menu size={18} />
      </button>

      {/* Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={clsx(
          "flex flex-col border-r bg-white h-screen transition-all duration-200 z-50",
          collapsed ? "w-16" : "w-60",
          "fixed md:relative",
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-14 px-3 border-b">
          {!collapsed && (
            <span className="text-sm font-semibold inline-flex gap-4 items-end">
              <User />
              {user.name.toUpperCase()}
            </span>
          )}

          <button
            onClick={() => setCollapsed((prev) => !prev)}
            className="hidden md:flex p-1.5 rounded hover:bg-gray-100"
          >
            {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>

          <button
            onClick={() => setMobileOpen(false)}
            className="md:hidden p-1.5 rounded hover:bg-gray-100"
          >
            <X size={16} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-2">
          {links.map((group) => (
            <div key={group.section} className="mb-3">
              {!collapsed && (
                <p className="text-[11px] uppercase tracking-wide text-gray-400 px-2 py-1">
                  {group.section}
                </p>
              )}

              {group.links.map((link) => {
                const Icon = link.icon;
                const active = isActive(link.href);

                return (
                  <Link
                    key={link.key}
                    to={link.href}
                    className={clsx(
                      "flex items-center gap-3 px-2.5 py-2 rounded-md text-sm my-0.5",
                      active
                        ? "bg-gray-2`00 border-gray-600 border-2 text-gray-800 font-medium"
                        : "text-gray-600 hover:bg-gray-100",
                    )}
                  >
                    <Icon size={18} className="shrink-0" />
                    {!collapsed && <span>{link.label}</span>}
                  </Link>
                );
              })}
            </div>
          ))}
          {/* <div>
            <span
              onClick={() => logout()}
              className={
                "flex items-center gap-3 px-2.5 py-2 rounded-md text-sm my-0.5  hover:bg-gray-100 bg-gray-50 hover:border-gray-200  text-gray-800 font-medium"
              }
            >
              <SquareArrowRightExit color="#880d1e" />
              <span>Logout</span>
            </span>
          </div> */}
        </nav>
      </aside>
    </>
  );
}
