import React from "react";
import { NavLink } from "react-router-dom";
import { FiHome, FiClock, FiX } from "react-icons/fi";

interface SidebarProps {
  isOpen: boolean;
  closeSidebar: () => void;
}

interface NavItem {
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  badge?: number;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, closeSidebar }) => {
  const navItems: NavItem[] = [
    { path: "/dashboard", icon: FiHome, label: "Dashboard" },
    { path: "/history", icon: FiClock, label: "History" },
  ];

  return (
    <>
      {/* Mobile overlay - only shows when sidebar is open on mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      {/* Sidebar - Different behavior for mobile vs desktop */}
      <aside
        className={`
          fixed lg:sticky left-0 top-0 h-screen w-60 
          bg-white border-r border-slate-200 shadow-xl 
          transform transition-transform duration-300 ease-in-out z-50
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-slate-900 to-slate-700 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-sm">U</span>
            </div>
            <h2 className="text-lg font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              UPIVOT
            </h2>
          </div>
          <button
            onClick={closeSidebar}
            className="p-2 rounded-xl hover:bg-slate-100 transition-colors duration-200 focus:outline-none lg:hidden bg-white/70 focus:ring-2 focus:ring-slate-300"
            aria-label="Close sidebar"
          >
            <FiX className="w-5 h-5 text-slate-600" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          <div className="mb-6">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    onClick={() => window.innerWidth < 1024 && closeSidebar()}
                    className={({ isActive }) =>
                      `group flex items-center gap-4 px-3 py-3 rounded-xl font-medium transition-all duration-200 ${
                        isActive
                          ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20"
                          : "text-slate-700 hover:bg-slate-100/80 hover:text-slate-900"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <div
                          className={`p-2 rounded-lg transition-colors ${
                            isActive
                              ? "bg-white/20"
                              : "bg-slate-100 group-hover:bg-slate-200"
                          }`}
                        >
                          <item.icon
                            className={`w-4 h-4 ${
                              isActive ? "text-white" : "text-slate-600"
                            }`}
                          />
                        </div>
                        <span>{item.label}</span>
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
