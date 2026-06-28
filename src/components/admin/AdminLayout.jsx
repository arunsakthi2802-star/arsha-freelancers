import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  LayoutDashboard, Star, Images, BookOpen, Briefcase, Users,
  MessageSquare, LogOut, Menu, X, ChevronRight, Shield, Home, Settings,
  Clock, ShieldAlert, FileText
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const allNavItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, roles: ["admin"] },
  { id: "pending_approvals", label: "Permission Control", icon: ShieldAlert, roles: ["admin"] },
  { id: "manager_requests", label: "My Requests", icon: Clock, roles: ["manager"] },
  { id: "reviews", label: "Reviews", icon: Star, roles: ["admin", "manager"] },
  { id: "gallery", label: "Gallery", icon: Images, roles: ["admin", "manager"] },
  { id: "stories", label: "Stories", icon: BookOpen, roles: ["admin", "manager"] },
  { id: "services", label: "Services", icon: Briefcase, roles: ["admin"] },
  { id: "users", label: "Users", icon: Users, roles: ["admin"] },
  { id: "contacts", label: "Enquiries", icon: MessageSquare, roles: ["admin"] },
  { id: "audit_logs", label: "Audit Logs", icon: FileText, roles: ["admin"] },
  { id: "settings", label: "Settings", icon: Settings, roles: ["admin"] },
];

export default function AdminLayout({ activeTab, setActiveTab, onNavigatePublic, children }) {
  const { user, logout, isAdmin, isManager } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = allNavItems.filter((item) => {
    if (isAdmin) return item.roles.includes("admin");
    if (isManager) return item.roles.includes("manager");
    return false;
  });

  const handleLogout = () => {
    logout();
    onNavigatePublic("home");
  };

  const Sidebar = ({ mobile = false }) => (
    <div className={`${mobile ? "h-full" : "h-screen sticky top-0"} flex flex-col bg-slate-950 text-white border-r-2 border-slate-800`} style={{ width: mobile ? "100%" : "240px" }}>
      {/* Logo */}
      <div className="px-5 py-5 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Shield className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-xs font-black text-white">Arsha Admin</p>
            <p className="text-[9px] text-slate-400 font-medium">Dashboard</p>
          </div>
        </div>
        {mobile && (
          <button onClick={() => setSidebarOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* User info */}
      <div className="px-5 py-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white text-xs font-black border border-slate-700">
            {user?.fullName?.charAt(0) || "A"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-black text-white truncate">{user?.fullName || "Admin"}</p>
            <p className="text-[9px] text-slate-400 font-medium truncate">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => { setActiveTab(id); setSidebarOpen(false); }}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === id
                ? "bg-blue-600 text-white shadow-lg"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
            id={`admin-nav-${id}`}
          >
            <Icon className="w-4 h-4 flex-shrink-0" />
            <span>{label}</span>
            {activeTab === id && <ChevronRight className="w-3 h-3 ml-auto" />}
          </button>
        ))}
      </nav>

      {/* Footer actions */}
      <div className="px-3 py-4 border-t border-slate-800 space-y-1">
        <button
          onClick={() => onNavigatePublic("home")}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-800 transition-all cursor-pointer"
          id="admin-back-to-site"
        >
          <Home className="w-4 h-4" />
          Back to Website
        </button>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-red-400 hover:text-white hover:bg-red-600 transition-all cursor-pointer"
          id="admin-logout-btn"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden bg-slate-100 dark:bg-slate-950">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex flex-shrink-0">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/60" onClick={() => setSidebarOpen(false)} />
            <motion.div
              initial={{ x: -240 }}
              animate={{ x: 0 }}
              exit={{ x: -240 }}
              className="relative z-10 w-60 h-full"
            >
              <Sidebar mobile />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center gap-3 px-4 py-3 bg-white dark:bg-slate-900 border-b-2 border-slate-200 dark:border-slate-800 flex-shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 text-slate-500 hover:text-slate-950 dark:hover:text-white cursor-pointer"
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-sm font-black text-slate-950 dark:text-white capitalize">
              {navItems.find((n) => n.id === activeTab)?.label || "Dashboard"}
            </h2>
            <p className="text-[10px] text-slate-400 font-medium hidden sm:block">
              Arsha Freelancers Admin Panel
            </p>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
