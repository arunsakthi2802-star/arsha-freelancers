import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { getAllProjects } from "../../api/projects.api";
import { getAllTasks } from "../../api/tasks.api";
import { getAllPayments } from "../../api/payments.api";
import { Briefcase, KanbanSquare, Activity, LogOut, CreditCard, MessageSquare } from "lucide-react";
import LoginView from "../../components/LoginView";

// Import Manager Components
import ManagerProjects from "../../components/manager/ManagerProjects";
import ManagerTasks from "../../components/manager/ManagerTasks";
import ManagerPayments from "../../components/manager/ManagerPayments";
import ManagerMessages from "../../components/manager/ManagerMessages";

export default function ManagerDashboard({ onNavigate }) {
  const { user, logout, isManager, isAdmin, isAuthenticated, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  
  const [projectsCount, setProjectsCount] = useState(0);
  const [tasksCount, setTasksCount] = useState(0);
  const [paymentsCount, setPaymentsCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [projRes, taskRes, payRes] = await Promise.all([
        getAllProjects(),
        getAllTasks(),
        getAllPayments()
      ]);
      if (projRes.success) setProjectsCount(projRes.data.length);
      if (taskRes.success) setTasksCount(taskRes.data.length);
      if (payRes.success) setPaymentsCount(payRes.data.length);
    } catch (error) {
      console.error("Failed to fetch manager data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
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
  if (!isManager && !isAdmin) {
    return (
      <div className="flex items-center justify-center h-screen px-4 bg-slate-50 dark:bg-slate-900">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/40 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 border-2 border-red-200">
            🔒
          </div>
          <h2 className="text-xl font-black text-slate-950 dark:text-white mb-2">Access Denied</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Your account does not have manager privileges.</p>
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
    { id: "overview", label: "Overview", icon: Activity },
    { id: "projects", label: "Projects", icon: Briefcase },
    { id: "tasks", label: "Tasks", icon: KanbanSquare },
    { id: "payments", label: "Payments", icon: CreditCard },
    { id: "messages", label: "Messages", icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-slate-900 dark:bg-slate-950 border-r border-slate-800 p-6 flex flex-col text-white">
        <div className="mb-10">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl font-black">Manager Portal</h1>
          <p className="text-sm text-slate-400 mt-1">{user?.fullName}</p>
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
        
        <div className="pt-6 border-t border-slate-800">
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
      <div className="flex-1 p-6 md:p-10 overflow-y-auto">
        {loading && activeTab === "overview" ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            {activeTab === "overview" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Manager Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                    <h3 className="text-slate-500 dark:text-slate-400 font-medium">Total Projects</h3>
                    <p className="text-4xl font-black mt-2 text-slate-900 dark:text-white">
                      {projectsCount}
                    </p>
                  </div>
                  <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                    <h3 className="text-slate-500 dark:text-slate-400 font-medium">Total Tasks</h3>
                    <p className="text-4xl font-black mt-2 text-slate-900 dark:text-white">
                      {tasksCount}
                    </p>
                  </div>
                  <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                    <h3 className="text-slate-500 dark:text-slate-400 font-medium">Total Invoices</h3>
                    <p className="text-4xl font-black mt-2 text-slate-900 dark:text-white">
                      {paymentsCount}
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === "projects" && <ManagerProjects />}
            {activeTab === "tasks" && <ManagerTasks />}
            {activeTab === "payments" && <ManagerPayments />}
            {activeTab === "messages" && <ManagerMessages />}
          </>
        )}
      </div>
    </div>
  );
}
