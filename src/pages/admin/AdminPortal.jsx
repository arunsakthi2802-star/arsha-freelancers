import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "../../context/AuthContext";
import { Shield, LayoutDashboard, Users, Database, LogOut, Home, CreditCard, MessageSquare, Calendar, Briefcase } from "lucide-react";
import AdminDashboard from "../../components/admin/AdminDashboard";
import AdminProjects from "../../components/admin/AdminProjects";
import AdminUsers from "../../components/admin/AdminUsers";
import AdminReviews from "../../components/admin/AdminReviews";
import AdminGallery from "../../components/admin/AdminGallery";
import AdminStories from "../../components/admin/AdminStories";
import AdminServices from "../../components/admin/AdminServices";
import AdminContacts from "../../components/admin/AdminContacts";
import ManagerPayments from "../../components/manager/ManagerPayments";
import ManagerMessages from "../../components/manager/ManagerMessages";
import AdminSchedules from "../../components/admin/AdminSchedules";
import LoginView from "../../components/LoginView";

import DashboardSidebar from "../../components/user/DashboardSidebar";
import DashboardTopbar from "../../components/user/DashboardTopbar";

export default function AdminPortal({ onNavigate, theme, setTheme, darkMode }) {
  const { user, logout, isAdmin, isAuthenticated, loading } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [legacyTab, setLegacyTab] = useState("reviews");
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-bg-primary">
        <div className="w-10 h-10 border-4 border-accent-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginView onNavigate={onNavigate} />;
  }

  const handleLogout = () => {
    logout();
    onNavigate("home");
  };

  const navItems = [
    { id: "overview", label: "Global Overview", icon: LayoutDashboard },
    { id: "projects", label: "Projects", icon: Briefcase },
    { id: "users", label: "Users", icon: Users },
    { id: "payments", label: "Payments", icon: CreditCard },
    { id: "messages", label: "Messages", icon: MessageSquare },
    { id: "schedules", label: "Schedules", icon: Calendar },
    { id: "cms", label: "Website CMS", icon: Database },
  ];

  const legacyTabs = [
    { id: "reviews", label: "Reviews" },
    { id: "gallery", label: "Gallery" },
    { id: "stories", label: "Stories" },
    { id: "services", label: "Services" },
    { id: "contacts", label: "Enquiries" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <AdminDashboard />;
      case "projects":
        return <AdminProjects />;
      case "users":
        return <AdminUsers />;
      case "payments":
        return <ManagerPayments />;
      case "messages":
        return (
          <div className="h-[80vh] min-h-[500px]">
            <ManagerMessages />
          </div>
        );
      case "schedules":
        return <AdminSchedules />;
      case "cms":
        return (
          <div className="space-y-6">
            <div className="glass-card p-6 rounded-[2rem] border border-border-primary">
              <h2 className="text-2xl font-black text-text-primary mb-6">Content Management</h2>
              <div className="flex flex-wrap gap-2 mb-8 border-b border-border-primary pb-4">
                {legacyTabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setLegacyTab(tab.id)}
                    className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                      legacyTab === tab.id 
                        ? "bg-accent-primary text-accent-text shadow-md shadow-accent-primary/20" 
                        : "bg-bg-secondary text-text-secondary hover:bg-border-primary hover:text-text-primary"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              <div className="min-h-[500px]">
                {legacyTab === "reviews" && <AdminReviews />}
                {legacyTab === "gallery" && <AdminGallery />}
                {legacyTab === "stories" && <AdminStories />}
                {legacyTab === "services" && <AdminServices />}
                {legacyTab === "contacts" && <AdminContacts />}
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-bg-primary flex flex-col md:flex-row relative">
      
      {/* Decorative background blobs for the entire dashboard */}
      <div className="fixed top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-accent-primary/5 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10%] left-[-5%] w-[600px] h-[600px] rounded-full bg-purple-500/5 blur-[150px] pointer-events-none" />

      {/* Sidebar */}
      <DashboardSidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onLogout={handleLogout} 
        user={user} 
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
        customNavItems={navItems}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden relative z-10">
        <DashboardTopbar 
          setIsMobileOpen={setIsMobileOpen} 
          activeTab={activeTab}
          theme={theme}
          setTheme={setTheme}
          darkMode={darkMode}
        />
        
        <main className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-8 md:p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -15, filter: 'blur(8px)' }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-7xl mx-auto"
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
      
    </div>
  );
}
