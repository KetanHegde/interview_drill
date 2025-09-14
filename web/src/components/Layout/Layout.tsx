import React, { useState, ReactNode } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = (): void => setSidebarOpen(!sidebarOpen);
  const closeSidebar = (): void => setSidebarOpen(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100/50">
      {/* Background pattern */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(148,163,184,0.15)_1px,transparent_0)] [background-size:24px_24px] pointer-events-none" />

      {/* Layout container */}
      <div className="relative flex min-h-screen">
        {/* Sidebar - only affects layout on desktop */}
        <div className="hidden lg:block">
          <Sidebar isOpen={sidebarOpen} closeSidebar={closeSidebar} />
        </div>

        {/* Mobile sidebar - rendered separately to not affect layout */}
        <div className="lg:hidden">
          <Sidebar isOpen={sidebarOpen} closeSidebar={closeSidebar} />
        </div>

        {/* Main content area - full width on mobile, adjusted on desktop */}
        <div className="flex-1 flex flex-col min-w-0 w-full lg:w-auto">
          <Header toggleSidebar={toggleSidebar} />

          {/* Main content */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto w-full">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
