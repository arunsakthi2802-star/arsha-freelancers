import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "../../context/AuthContext";
import { getAllProjects } from "../../api/projects.api";
import { getAllTasks } from "../../api/tasks.api";
import { getAllPayments } from "../../api/payments.api";
import { Briefcase, KanbanSquare, Activity, CreditCard, MessageSquare, LayoutDashboard } from "lucide-react";
import LoginView from "../../components/LoginView";

import DashboardSidebar from "../../components/user/DashboardSidebar";
import DashboardTopbar from "../../components/user/DashboardTopbar";
import ManagerProjects from "../../components/manager/ManagerProjects";
import ManagerTasks from "../../components/manager/ManagerTasks";
import ManagerPayments from "../../components/manager/ManagerPayments";
import ManagerMessages from "../../components/manager/ManagerMessages";

export default function ManagerDashboard({ onNavigate, theme, setTheme, darkMode }) {
  const { user, logout, isManager, isAdmin, isAuthenticated, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  
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
      if (projRes?.success) setProjectsCount(projRes.data.length);
      if (taskRes?.success) setTasksCount(taskRes.data.length);
      if (payRes?.success) setPaymentsCount(payRes.data.length);
    } catch (error) {
      console.error("Failed to fetch manager data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
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
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "projects", label: "All Projects", icon: Briefcase },
    { id: "tasks", label: "Team Tasks", icon: KanbanSquare },
    { id: "payments", label: "Payments", icon: CreditCard },
    { id: "messages", label: "Messages", icon: MessageSquare },
  ];

  const renderContent = () => {
    if (loading && activeTab === "overview") {
      return (
        <div className="flex justify-center items-center h-[60vh]">
          <div className="w-10 h-10 border-4 border-accent-primary border-t-transparent rounded-full animate-spin" />
        </div>
      );
    }

    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-8">
            <div className="glass-card p-8 rounded-[2rem] border border-border-primary relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent-primary/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3"></div>
              <h1 className="text-3xl font-black text-text-primary mb-2 relative z-10">Manager Portal</h1>
              <p className="text-text-secondary font-medium relative z-10">Welcome back, {user?.fullName}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="glass-card p-6 rounded-2xl border border-border-primary hover-card">
                <div className="w-12 h-12 bg-bg-secondary rounded-xl flex items-center justify-center mb-4 text-accent-primary border border-border-primary">
                  <Briefcase className="w-6 h-6" />
                </div>
                <h3 className="text-text-secondary font-bold text-sm uppercase tracking-widest mb-1">Total Projects</h3>
                <p className="text-4xl font-black text-text-primary">{projectsCount}</p>
              </div>
              
              <div className="glass-card p-6 rounded-2xl border border-border-primary hover-card">
                <div className="w-12 h-12 bg-bg-secondary rounded-xl flex items-center justify-center mb-4 text-purple-500 border border-border-primary">
                  <KanbanSquare className="w-6 h-6" />
                </div>
                <h3 className="text-text-secondary font-bold text-sm uppercase tracking-widest mb-1">Active Tasks</h3>
                <p className="text-4xl font-black text-text-primary">{tasksCount}</p>
              </div>
              
              <div className="glass-card p-6 rounded-2xl border border-border-primary hover-card">
                <div className="w-12 h-12 bg-bg-secondary rounded-xl flex items-center justify-center mb-4 text-emerald-500 border border-border-primary">
                  <CreditCard className="w-6 h-6" />
                </div>
                <h3 className="text-text-secondary font-bold text-sm uppercase tracking-widest mb-1">Total Invoices</h3>
                <p className="text-4xl font-black text-text-primary">{paymentsCount}</p>
              </div>
            </div>
          </div>
        );
      case "projects":
        return <ManagerProjects />;
      case "tasks":
        return <ManagerTasks />;
      case "payments":
        return <ManagerPayments />;
      case "messages":
        return (
          <div className="h-[80vh] min-h-[500px]">
             <ManagerMessages />
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
