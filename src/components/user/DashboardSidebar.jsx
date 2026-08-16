import React from "react";
import { LayoutDashboard, FolderKanban, CreditCard, MessageSquare, Calendar, LogOut, Settings, X, ShieldCheck } from "lucide-react";

export default function DashboardSidebar({ activeTab, setActiveTab, onLogout, user, isMobileOpen, setIsMobileOpen, customNavItems }) {
  const defaultNavItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "projects", label: "My Projects", icon: FolderKanban },
    { id: "payments", label: "Payments", icon: CreditCard },
    { id: "messages", label: "Messages", icon: MessageSquare },
    { id: "schedules", label: "Schedules", icon: Calendar },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const navItems = customNavItems || defaultNavItems;

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 right-0 z-50 w-64 bg-bg-primary border-l border-border-primary flex flex-col transition-transform duration-300 ease-in-out
        lg:left-0 lg:right-auto lg:border-l-0 lg:border-r lg:translate-x-0 lg:relative
        ${isMobileOpen ? "translate-x-0" : "translate-x-full"}
      `}>
        
        {/* Logo area */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-border-primary shrink-0">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-accent-primary" />
            <span className="font-black text-lg text-text-primary tracking-tight">Portal</span>
          </div>
          <button onClick={() => setIsMobileOpen(false)} className="lg:hidden text-text-secondary hover:text-text-primary">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Brief */}
        <div className="p-6 border-b border-border-primary shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent-primary flex items-center justify-center text-accent-text font-black uppercase shadow-sm">
              {user?.fullName?.charAt(0) || "U"}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-text-primary truncate">{user?.fullName}</p>
              <p className="text-[10px] font-bold text-text-tertiary uppercase tracking-wider truncate">{user?.role || "Client"}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileOpen(false);
                }}
                className={`
                  w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer group
                  ${isActive 
                    ? "bg-accent-primary text-accent-text shadow-md shadow-accent-primary/20" 
                    : "text-text-secondary hover:bg-bg-secondary hover:text-text-primary"}
                `}
              >
                <item.icon className={`w-4.5 h-4.5 transition-transform group-hover:scale-110 ${isActive ? "" : "text-text-tertiary group-hover:text-text-primary"}`} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Footer actions */}
        <div className="p-4 border-t border-border-primary shrink-0">
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold text-rose-500 hover:bg-rose-500/10 transition-all cursor-pointer"
          >
            <LogOut className="w-4.5 h-4.5" />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}
