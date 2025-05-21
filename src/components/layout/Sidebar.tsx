import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import {
  LayoutDashboard,
  User,
  FileText,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "../../hooks/use-mobile";

const Sidebar: React.FC = () => {
  const { logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useIsMobile();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const toggleMobileSidebar = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    logout();
  };

  const navItems = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
      path: "/dashboard",
    },
    {
      name: "Edit Profile",
      icon: <User className="w-5 h-5" />,
      path: "/edit-profile",
    },
    {
      name: "Admission Form",
      icon: <FileText className="w-5 h-5" />,
      path: "/admission-form",
    },
  ];

  const sidebarClasses = cn(
    "bg-admitease-dark text-white flex flex-col h-screen transition-all duration-300 z-20",
    collapsed && !isMobile ? "w-20" : "w-64",
    isMobile ? "fixed" : "relative",
    isMobile && !mobileOpen ? "-translate-x-full" : "translate-x-0"
  );

  return (
    <>
      {/* Mobile menu trigger */}
      {isMobile && (
        <button
          onClick={toggleMobileSidebar}
          className="fixed top-4 left-4 z-30 p-2 rounded-md bg-admitease-primary text-white"
        >
          <Menu className="w-5 h-5" />
        </button>
      )}

      <div className={sidebarClasses}>
        <div className="p-4 border-b border-admitease-dark flex items-center justify-between">
          <h1
            className={cn(
              "font-bold text-lg",
              collapsed && !isMobile ? "hidden" : "block"
            )}
          >
            AdmItEase
          </h1>
          {!isMobile && (
            <button
              onClick={toggleSidebar}
              className="p-1 rounded-md hover:bg-admitease-light"
            >
              {collapsed ? (
                <ChevronRight className="w-5 h-5" />
              ) : (
                <ChevronLeft className="w-5 h-5" />
              )}
            </button>
          )}
        </div>

        <div className="flex flex-col flex-grow">
          <nav className="py-6 flex-grow">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center py-3 px-4 transition-colors",
                        isActive
                          ? "bg-admitease-light text-white"
                          : "text-gray-300 hover:bg-admitease-light/30",
                        collapsed && !isMobile
                          ? "justify-center"
                          : "justify-start"
                      )
                    }
                    onClick={() => isMobile && setMobileOpen(false)}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {(!collapsed || isMobile) && <span>{item.name}</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-auto">
            <button
              onClick={handleLogout}
              className={cn(
                "flex items-center py-3 px-4 w-full text-gray-300 hover:bg-admitease-light/30 transition-colors",
                collapsed && !isMobile ? "justify-center" : "justify-start"
              )}
            >
              <LogOut className="w-5 h-5" />
              {(!collapsed || isMobile) && <span className="ml-3">Logout</span>}
            </button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isMobile && mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-10"
          onClick={() => setMobileOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
