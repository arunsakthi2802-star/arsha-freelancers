import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useAuth } from "../../context/AuthContext";
import { getMyProjects } from "../../api/projects.api";
import { getMyPayments } from "../../api/payments.api";
import { getMySchedules } from "../../api/schedules.api";

import LoginView from "../../components/LoginView";
import DashboardSidebar from "../../components/user/DashboardSidebar";
import DashboardTopbar from "../../components/user/DashboardTopbar";
import DashboardOverview from "../../components/user/DashboardOverview";
import DashboardProjects from "../../components/user/DashboardProjects";
import DashboardSettings from "../../components/user/DashboardSettings";
import UserMessages from "../../components/user/UserMessages";

export default function UserDashboard({ onNavigate, theme, setTheme, darkMode }) {
  const { user, logout, isAuthenticated, loading: authLoading, refreshProfile } = useAuth();
  
  const [activeTab, setActiveTab] = useState("overview");
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  
  const [projects, setProjects] = useState([]);
  const [payments, setPayments] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [projRes, payRes, schedRes] = await Promise.all([
          getMyProjects(),
          getMyPayments(),
          getMySchedules()
        ]);
        if (projRes?.success) setProjects(projRes.data);
        if (payRes?.success) setPayments(payRes.data);
        if (schedRes?.success) setSchedules(schedRes.data);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

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

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-[60vh]">
          <div className="w-10 h-10 border-4 border-accent-primary border-t-transparent rounded-full animate-spin" />
        </div>
      );
    }

    switch (activeTab) {
      case "overview":
        return <DashboardOverview user={user} projects={projects} payments={payments} schedules={schedules} />;
      case "projects":
        return <DashboardProjects projects={projects} />;
      case "settings":
        return <DashboardSettings user={user} refreshProfile={refreshProfile} />;
      case "messages":
        return (
          <div className="h-[80vh] min-h-[500px]">
            <UserMessages />
          </div>
        );
      case "payments":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-text-primary">Payment History</h2>
            {payments.length === 0 ? (
              <div className="glass-card rounded-[2rem] p-12 text-center border border-border-primary">
                <p className="text-text-secondary">No payment history found.</p>
              </div>
            ) : (
              <div className="glass-card rounded-[2rem] border border-border-primary overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[600px]">
                    <thead>
                      <tr className="bg-bg-secondary border-b border-border-primary">
                        <th className="p-4 text-xs font-bold uppercase tracking-widest text-text-tertiary">Date</th>
                        <th className="p-4 text-xs font-bold uppercase tracking-widest text-text-tertiary">Amount</th>
                        <th className="p-4 text-xs font-bold uppercase tracking-widest text-text-tertiary">Type</th>
                        <th className="p-4 text-xs font-bold uppercase tracking-widest text-text-tertiary">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payments.map(p => (
                        <tr key={p._id} className="border-b border-border-primary last:border-0 hover:bg-bg-secondary/50 transition-colors">
                          <td className="p-4 text-sm font-medium text-text-secondary">
                            {new Date(p.createdAt).toLocaleDateString()}
                          </td>
                          <td className="p-4 text-sm font-black text-text-primary">₹{p.amount}</td>
                          <td className="p-4 text-sm font-medium text-text-secondary capitalize">{p.type}</td>
                          <td className="p-4">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                              p.status === 'completed' 
                                ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' 
                                : 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                            }`}>
                              {p.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        );
      case "schedules":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-text-primary">Upcoming Schedules</h2>
            {schedules.length === 0 ? (
              <div className="glass-card rounded-[2rem] p-12 text-center border border-border-primary">
                <p className="text-text-secondary">You have no upcoming schedules.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {schedules.map((s) => (
                  <div key={s._id} className="glass-card p-6 rounded-2xl border border-border-primary relative overflow-hidden group">
                    <div className={`absolute top-0 right-0 w-2 h-full ${
                      s.status === 'completed' ? 'bg-emerald-500' :
                      s.status === 'cancelled' ? 'bg-rose-500' :
                      'bg-accent-primary'
                    }`}></div>
                    <div className="mb-4">
                      <span className="inline-block px-2.5 py-1 bg-bg-secondary text-text-secondary text-[10px] rounded-md uppercase font-black tracking-widest mb-2 border border-border-primary">
                        {s.type}
                      </span>
                      <h3 className="font-bold text-lg text-text-primary leading-tight">{s.title}</h3>
                    </div>
                    {s.description && (
                      <p className="text-sm text-text-secondary mb-6 font-medium">{s.description}</p>
                    )}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3 text-sm font-bold text-text-primary">
                        <div className="p-2 rounded-lg bg-bg-secondary border border-border-primary">
                          <span className="text-accent-primary">📅</span>
                        </div>
                        {new Date(s.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })}
                      </div>
                      <div className="flex items-center gap-3 text-sm font-bold text-text-primary">
                        <div className="p-2 rounded-lg bg-bg-secondary border border-border-primary">
                          <span className="text-purple-500">⏰</span>
                        </div>
                        {s.time}
                      </div>
                    </div>
                    <div className="pt-4 border-t border-border-primary flex justify-between items-center mt-auto">
                      <span className="text-[10px] font-bold text-text-tertiary uppercase tracking-widest">By: {s.createdBy?.fullName || 'Admin'}</span>
                      <span className={`text-[10px] font-black uppercase tracking-widest ${
                        s.status === 'completed' ? 'text-emerald-500' :
                        s.status === 'cancelled' ? 'text-rose-500' :
                        'text-amber-500'
                      }`}>
                        {s.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
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
