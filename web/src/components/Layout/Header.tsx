import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { FiMenu, FiLogOut, FiMail, FiChevronDown } from "react-icons/fi";

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="top-0 z-40 bg-transparent w-full">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left section */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleSidebar}
              className="lg:hidden p-2 rounded-xl border-none bg-white/70 hover:bg-slate-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-300"
              aria-label="Toggle sidebar"
            >
              <FiMenu className="w-5 h-5 text-slate-600" />
            </button>

            {/* Logo - show on mobile when sidebar is closed */}
            <div className="flex items-center gap-3 lg:hidden">
              <div className="w-8 h-8 bg-gradient-to-br from-slate-900 to-slate-700 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-sm">U</span>
              </div>
              <h1 className="text-lg font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                UPIVOT
              </h1>
            </div>
          </div>

          {/* Right section - User menu */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="bg-white border-gray-200 flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-300 group"
              aria-expanded={dropdownOpen}
              aria-haspopup="true"
            >
              <div className="flex items-center gap-3">
                <img
                  src={user?.picture || "/default-avatar.png"}
                  alt={`${user?.name || "User"} avatar`}
                  className="w-9 h-9 rounded-xl object-cover border-2 border-slate-200 group-hover:border-slate-300 transition-colors"
                />
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-semibold text-slate-900 leading-tight">
                    {user?.name || "User"}
                  </p>
                  <p className="text-xs text-slate-500 leading-tight">
                    {user?.email?.split("@")[0] || "user"}
                  </p>
                </div>
              </div>
              <FiChevronDown
                className={`w-4 h-4 text-slate-400 transition-transform duration-200 hidden sm:block ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 z-50 overflow-hidden">
                {/* User info section */}
                <div className="p-4 border-b border-slate-100 bg-gradient-to-r from-slate-50/50 to-transparent">
                  <div className="flex items-center">
                    <img
                      src={user?.picture || "/default-avatar.png"}
                      alt={`${user?.name || "User"} avatar`}
                      className="w-12 h-12 rounded-xl object-cover border-2 border-slate-200"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-900 text-sm truncate">
                        {user?.name || "User"}
                      </p>
                      <div className="flex items-center  justify-center gap-1 mt-1">
                        <FiMail className="w-3 h-3 text-slate-400" />
                        <p className="text-xs text-slate-500 truncate">
                          {user?.email || "user@example.com"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Menu items */}
                <div className="p-2">
                  <button
                    onClick={() => {
                      logout();
                      setDropdownOpen(false);
                    }}
                    className="bg-white/70 border-gray-300 flex items-center gap-3 w-full px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all duration-200 group"
                  >
                    <div className="p-1.5 rounded-lg bg-slate-100 group-hover:bg-red-100 transition-colors">
                      <FiLogOut className="w-4 h-4" />
                    </div>
                    <span>Sign out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
