import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import AdminLayout from "./AdminLayout";
import AdminDashboard from "./AdminDashboard";
import AdminReviews from "./AdminReviews";
import AdminGallery from "./AdminGallery";
import AdminStories from "./AdminStories";
import AdminServices from "./AdminServices";
import AdminUsers from "./AdminUsers";
import AdminContacts from "./AdminContacts";
import LoginView from "../LoginView";
import AdminSettings from "./AdminSettings";
import PendingApprovals from "./PendingApprovals";
import ManagerRequests from "./ManagerRequests";
import AuditLogs from "./AuditLogs";

export default function AdminView({ onNavigate }) {
  const { isAdmin, isManager, isAuthenticated, loading } = useAuth();
  const [activeTab, setActiveTab] = useState(isAdmin ? "dashboard" : "reviews");

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginView onNavigate={onNavigate} />;
  }

  if (!isAdmin && !isManager) {
    return (
      <div className="flex items-center justify-center h-screen px-4">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/40 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 border-2 border-red-200">
            🔒
          </div>
          <h2 className="text-xl font-black text-slate-950 dark:text-white mb-2">Access Denied</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Your account does not have administrator or manager privileges.</p>
          <button
            onClick={() => onNavigate("home")}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-black text-sm rounded-xl border-2 border-slate-950 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] cursor-pointer"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  const renderTab = () => {
    switch (activeTab) {
      case "dashboard": return isAdmin ? <AdminDashboard /> : <AdminReviews />;
      case "pending_approvals": return isAdmin ? <PendingApprovals /> : <AdminReviews />;
      case "manager_requests": return isManager ? <ManagerRequests /> : (isAdmin ? <AdminDashboard /> : <AdminReviews />);
      case "audit_logs": return isAdmin ? <AuditLogs /> : <AdminReviews />;
      case "reviews": return <AdminReviews />;
      case "gallery": return <AdminGallery />;
      case "stories": return <AdminStories />;
      case "services": return isAdmin ? <AdminServices /> : <AdminReviews />;
      case "users": return (isAdmin || isManager) ? <AdminUsers /> : <AdminReviews />;
      case "contacts": return isAdmin ? <AdminContacts /> : <AdminReviews />;
      case "settings": return isAdmin ? <AdminSettings /> : <AdminReviews />;
      default: return isAdmin ? <AdminDashboard /> : <AdminReviews />;
    }
  };

  return (
    <AdminLayout
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      onNavigatePublic={onNavigate}
    >
      {renderTab()}
    </AdminLayout>
  );
}
