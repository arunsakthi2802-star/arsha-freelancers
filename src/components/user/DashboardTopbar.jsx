import React, { useState, useEffect, useRef } from "react";
import { Menu, Bell, X, CheckCircle2, AlertCircle, Info } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import ThemeSwitcher from "../ThemeSwitcher";

const mockNotifications = [
  { id: 1, title: "Project Update", message: "Your literature survey has been uploaded.", type: "success", time: "2m ago", unread: true },
  { id: 2, title: "Payment Received", message: "Invoice #1024 has been paid successfully.", type: "info", time: "1h ago", unread: true },
  { id: 3, title: "Action Required", message: "Please review the latest mockups.", type: "warning", time: "2h ago", unread: false },
];

export default function DashboardTopbar({ setIsMobileOpen, activeTab, theme, setTheme, darkMode }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);
  const dropdownRef = useRef(null);

  const getPageTitle = () => {
    switch(activeTab) {
      case "overview": return "Overview";
      case "projects": return "Projects";
      case "payments": return "Payments";
      case "messages": return "Messages";
      case "schedules": return "Schedules";
      case "settings": return "Settings";
      case "users": return "Users";
      case "cms": return "Content Management";
      case "tasks": return "Tasks";
      default: return "Dashboard";
    }
  };

  const unreadCount = notifications.filter(n => n.unread).length;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  return (
    <header className="h-16 border-b border-border-primary bg-bg-primary/80 backdrop-blur-md sticky top-0 z-30 px-4 sm:px-6 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-3">
        <button 
          onClick={() => setIsMobileOpen(true)}
          className="lg:hidden p-2 -ml-2 text-text-secondary hover:text-text-primary hover:bg-bg-secondary rounded-lg transition-colors cursor-pointer"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-black text-text-primary tracking-tight capitalize">{getPageTitle()}</h1>
      </div>
      
      <div className="flex items-center gap-4 relative" ref={dropdownRef}>
        
        {/* Notifications Trigger */}
        <button 
          onClick={() => setShowNotifications(!showNotifications)}
          className="relative p-2 text-text-secondary hover:text-text-primary hover:bg-bg-secondary rounded-full transition-colors cursor-pointer"
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-bg-primary animate-pulse shadow-[0_0_8px_rgba(244,63,94,0.6)]"></span>
          )}
        </button>

        {/* Notifications Dropdown */}
        <AnimatePresence>
          {showNotifications && (
            <motion.div 
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute top-full mt-2 right-0 w-80 sm:w-96 glass-card border border-border-primary rounded-2xl shadow-xl overflow-hidden z-50 origin-top-right"
            >
              <div className="p-4 border-b border-border-primary flex items-center justify-between bg-bg-secondary/50">
                <h3 className="font-bold text-text-primary">Notifications</h3>
                {unreadCount > 0 && (
                  <button 
                    onClick={markAllAsRead}
                    className="text-xs font-bold text-accent-primary hover:text-accent-primary/80 transition-colors cursor-pointer"
                  >
                    Mark all read
                  </button>
                )}
              </div>
              
              <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center text-text-secondary">
                    <Bell className="w-8 h-8 mx-auto mb-3 opacity-20" />
                    <p className="text-sm">You're all caught up!</p>
                  </div>
                ) : (
                  <div className="divide-y divide-border-primary">
                    {notifications.map(notif => (
                      <div 
                        key={notif.id} 
                        className={`p-4 flex gap-3 transition-colors hover:bg-bg-secondary ${notif.unread ? 'bg-accent-primary/5' : ''}`}
                      >
                        <div className="shrink-0 mt-1">
                          {notif.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                          {notif.type === 'warning' && <AlertCircle className="w-5 h-5 text-amber-500" />}
                          {notif.type === 'info' && <Info className="w-5 h-5 text-blue-500" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-bold truncate ${notif.unread ? 'text-text-primary' : 'text-text-secondary'}`}>
                            {notif.title}
                          </p>
                          <p className="text-xs text-text-secondary mt-0.5 line-clamp-2">
                            {notif.message}
                          </p>
                          <p className="text-[10px] font-bold text-text-tertiary mt-2 uppercase tracking-wider">
                            {notif.time}
                          </p>
                        </div>
                        {notif.unread && (
                          <div className="w-2 h-2 rounded-full bg-accent-primary shrink-0 mt-1.5 shadow-[0_0_6px_var(--color-accent-primary)]"></div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ThemeSwitcher component */}
        <ThemeSwitcher theme={theme} setTheme={setTheme} darkMode={darkMode} />
      </div>
    </header>
  );
}
