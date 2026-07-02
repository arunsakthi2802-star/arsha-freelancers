import React, { useState } from "react";
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

export default function AdminPortal({ onNavigate }) {
  const { user, logout, isAdmin, isAuthenticated, loading } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [legacyTab, setLegacyTab] = useState("reviews");

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-slate-50 dark:bg-slate-900">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginView onNavigate={onNavigate} />;
  }

  /*
  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center h-screen px-4 bg-slate-50 dark:bg-slate-900">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/40 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 border-2 border-red-200">
            🔒
          </div>
          <h2 className="text-xl font-black text-slate-950 dark:text-white mb-2">Access Denied</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Your account does not have administrator privileges.</p>
          <button
            onClick={() => onNavigate("home")}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-black text-sm rounded-xl cursor-pointer"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }
  */

  const handleLogout = () => {
    logout();
    onNavigate("home");
  };

  const navItems = [
    { id: "overview", label: "Global Overview", icon: LayoutDashboard },
    { id: "projects", label: "Projects Management", icon: Briefcase },
    { id: "users", label: "User Management", icon: Users },
    { id: "payments", label: "Payment Management", icon: CreditCard },
    { id: "messages", label: "Message Management", icon: MessageSquare },
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

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-slate-950 border-r border-slate-800 p-6 flex flex-col text-white">
        <div className="mb-10 flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-black">Admin Portal</h1>
            <p className="text-xs text-slate-400 mt-1">{user?.fullName}</p>
          </div>
        </div>
        
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                activeTab === item.id 
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20" 
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>
        
        <div className="pt-6 border-t border-slate-800 space-y-2">
          <button 
            onClick={() => onNavigate("home")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <Home className="w-5 h-5" />
            Back to Website
          </button>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === "overview" && (
          <div className="p-6 md:p-10">
            <AdminDashboard />
          </div>
        )}
        
        {activeTab === "users" && (
          <div className="h-full">
            <AdminUsers />
          </div>
        )}

        {activeTab === "projects" && (
          <div className="h-full p-6 md:p-10">
            <AdminProjects />
          </div>
        )}

        {activeTab === "payments" && (
          <div className="h-full p-6 md:p-10">
            <ManagerPayments />
          </div>
        )}

        {activeTab === "messages" && (
          <div className="h-full p-6 md:p-10">
            <ManagerMessages />
          </div>
        )}

        {activeTab === "schedules" && (
          <div className="h-full p-6 md:p-10">
            <AdminSchedules />
          </div>
        )}

        {activeTab === "cms" && (
          <div className="p-6 md:p-10 flex flex-col h-full">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">Website Content Management</h2>
            <div className="flex space-x-2 border-b border-slate-200 dark:border-slate-800 mb-6 overflow-x-auto">
              {legacyTabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setLegacyTab(tab.id)}
                  className={`px-4 py-2 font-bold text-sm whitespace-nowrap transition-colors border-b-2 ${
                    legacyTab === tab.id
                      ? "border-blue-600 text-blue-600 dark:text-blue-400"
                      : "border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="flex-1 bg-white dark:bg-slate-900 rounded-2xl">
              {legacyTab === "reviews" && <AdminReviews />}
              {legacyTab === "gallery" && <AdminGallery />}
              {legacyTab === "stories" && <AdminStories />}
              {legacyTab === "services" && <AdminServices />}
              {legacyTab === "contacts" && <AdminContacts />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
