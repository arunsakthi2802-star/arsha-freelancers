import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { LayoutDashboard, FolderKanban, CreditCard, MessageSquare, LogOut, Calendar, User, Code, FileText, ExternalLink, History } from "lucide-react";
import { getMyProjects } from "../../api/projects.api";
import { getMyPayments } from "../../api/payments.api";
import { getMySchedules } from "../../api/schedules.api";
import UserMessages from "../../components/user/UserMessages";
import LoginView from "../../components/LoginView";

export default function UserDashboard({ onNavigate }) {
  const { user, logout, isAuthenticated, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  
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
        if (projRes.success) setProjects(projRes.data);
        if (payRes.success) setPayments(payRes.data);
        if (schedRes.success) setSchedules(schedRes.data);
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
      <div className="flex items-center justify-center h-screen bg-slate-50 dark:bg-slate-900">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
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
    { id: "projects", label: "My Projects", icon: FolderKanban },
    { id: "payments", label: "Payments", icon: CreditCard },
    { id: "messages", label: "Messages", icon: MessageSquare },
    { id: "schedules", label: "My Schedule", icon: Calendar },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 p-6 flex flex-col">
        <div className="mb-10">
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">User Portal</h1>
          <p className="text-sm text-slate-500">Welcome, {user?.fullName}</p>
        </div>
        
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-colors ${
                activeTab === item.id 
                  ? "bg-blue-600 text-white" 
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>
        
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-10 overflow-y-auto">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            {activeTab === "overview" && (
              <div className="space-y-8">
                {/* Welcome & User Details Card */}
                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 md:p-10 text-white shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400/20 rounded-full blur-2xl translate-y-1/3 -translate-x-1/4"></div>
                  
                  <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
                    <div>
                      <h2 className="text-3xl md:text-4xl font-black mb-2">Welcome back, {user?.fullName?.split(' ')[0]}! 👋</h2>
                      <div className="mb-3">
                        <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-lg text-white font-mono text-sm font-black border border-white/10">ID: {user?.uniqueId || "—"}</span>
                      </div>
                      <p className="text-blue-100 text-lg max-w-2xl">
                        Here's what's happening with your projects, payments, and schedules today.
                      </p>
                    </div>
                    <div className="hidden md:flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                       <User className="w-10 h-10 text-white/90" />
                    </div>
                  </div>

                  <div className="relative z-10 mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-8 border-t border-white/20">
                    <div>
                      <p className="text-blue-200 text-xs font-semibold uppercase tracking-wider mb-1">Email</p>
                      <p className="font-medium text-sm md:text-base truncate" title={user?.email}>{user?.email}</p>
                    </div>
                    {user?.phone && (
                      <div>
                        <p className="text-blue-200 text-xs font-semibold uppercase tracking-wider mb-1">Phone</p>
                        <p className="font-medium text-sm md:text-base">{user?.phone}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-blue-200 text-xs font-semibold uppercase tracking-wider mb-1">Role</p>
                      <p className="font-medium text-sm md:text-base capitalize">{user?.role}</p>
                    </div>
                    {user?.college && (
                      <div>
                        <p className="text-blue-200 text-xs font-semibold uppercase tracking-wider mb-1">Institution</p>
                        <p className="font-medium text-sm md:text-base truncate" title={user?.college}>{user?.college}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                    <h3 className="text-slate-500 dark:text-slate-400 font-medium">Active Projects</h3>
                    <p className="text-3xl font-black mt-2 text-slate-900 dark:text-white">{projects.length}</p>
                  </div>
                  <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                    <h3 className="text-slate-500 dark:text-slate-400 font-medium">Pending Payments</h3>
                    <p className="text-3xl font-black mt-2 text-slate-900 dark:text-white">
                      {payments.filter(p => p.status === 'pending').length}
                    </p>
                  </div>
                  <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
                    <h3 className="text-slate-500 dark:text-slate-400 font-medium">Upcoming Schedules</h3>
                    <p className="text-3xl font-black mt-2 text-slate-900 dark:text-white">
                      {schedules.filter(s => s.status === 'scheduled').length}
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === "projects" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">My Projects</h2>
                {projects.length === 0 ? (
                  <div className="bg-white dark:bg-slate-800 rounded-2xl p-10 text-center border border-slate-200 dark:border-slate-700 text-slate-500">
                    You don't have any projects yet.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-8">
                    {projects.map((p) => (
                      <div key={p._id} className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700">
                        
                        {/* Header: Title & Status */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-bold text-2xl text-slate-900 dark:text-white">{p.title}</h3>
                              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 text-xs rounded-full uppercase tracking-wide font-bold">
                                {p.projectType}
                              </span>
                            </div>
                            {p.description && <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-3xl">{p.description}</p>}
                          </div>
                          
                          <div className="flex flex-col items-end gap-2 shrink-0">
                            <span className={`px-4 py-1.5 rounded-full text-sm font-bold shadow-sm ${
                              p.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                            }`}>
                              {p.status}
                            </span>
                            <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 mt-1">
                              <Calendar className="w-3.5 h-3.5" /> 
                              Deadline: {p.deadline ? new Date(p.deadline).toLocaleDateString() : 'TBD'}
                            </div>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-8">
                          <div className="flex justify-between items-end mb-2">
                            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Overall Progress</span>
                            <span className="text-lg font-black text-blue-600 dark:text-blue-400">{p.completionPercentage || 0}%</span>
                          </div>
                          <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-3">
                            <div 
                              className="bg-blue-600 h-3 rounded-full transition-all duration-1000 ease-out relative overflow-hidden" 
                              style={{ width: `${p.completionPercentage || 0}%` }}
                            >
                              <div className="absolute inset-0 bg-white/20 w-full h-full animate-pulse"></div>
                            </div>
                          </div>
                        </div>

                        {/* Meta Data Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 p-5 bg-slate-50 dark:bg-slate-900/50 rounded-2xl">
                          <div>
                            <div className="flex items-center gap-2 text-sm text-slate-500 mb-2 font-medium">
                              <Code className="w-4 h-4" /> Technologies
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {p.technology && p.technology.length > 0 ? (
                                p.technology.map((tech, i) => (
                                  <span key={i} className="px-2.5 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300">
                                    {tech}
                                  </span>
                                ))
                              ) : (
                                <span className="text-sm text-slate-400 italic">None specified</span>
                              )}
                            </div>
                          </div>

                          <div>
                            <div className="flex items-center gap-2 text-sm text-slate-500 mb-2 font-medium">
                              <User className="w-4 h-4" /> Assigned Developer
                            </div>
                            <p className="font-semibold text-slate-900 dark:text-white">
                              {p.developer ? p.developer.fullName : <span className="text-slate-400 italic font-normal">Pending Assignment</span>}
                            </p>
                            {p.developer && <p className="text-xs text-slate-500">{p.developer.email}</p>}
                          </div>

                          <div>
                            <div className="flex items-center gap-2 text-sm text-slate-500 mb-2 font-medium">
                              <User className="w-4 h-4" /> Project Manager
                            </div>
                            <p className="font-semibold text-slate-900 dark:text-white">
                              {p.manager ? p.manager.fullName : <span className="text-slate-400 italic font-normal">Pending Assignment</span>}
                            </p>
                            {p.manager && <p className="text-xs text-slate-500">{p.manager.email}</p>}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                          {/* Resources & Files */}
                          <div>
                            <h4 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                              <FileText className="w-5 h-5 text-blue-500" /> Project Resources
                            </h4>
                            <div className="space-y-3">
                              {p.files && p.files.length > 0 ? (
                                p.files.map((file, i) => (
                                  <a 
                                    key={i} 
                                    href={file.url} 
                                    target="_blank" 
                                    rel="noreferrer"
                                    className="flex items-center justify-between p-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-300 hover:bg-blue-50 dark:hover:border-blue-900 dark:hover:bg-blue-900/20 transition-colors group"
                                  >
                                    <div className="flex items-center gap-3">
                                      <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50">
                                        <FileText className="w-4 h-4 text-slate-600 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                                      </div>
                                      <div>
                                        <p className="text-sm font-semibold text-slate-900 dark:text-white">{file.title}</p>
                                        <p className="text-xs text-slate-500 capitalize">{file.fileType.replace("_", " ")}</p>
                                      </div>
                                    </div>
                                    <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-500" />
                                  </a>
                                ))
                              ) : (
                                <p className="text-sm text-slate-500 italic p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-800">
                                  No resources or files uploaded yet.
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Version History */}
                          <div>
                            <h4 className="font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                              <History className="w-5 h-5 text-indigo-500" /> Recent Updates
                            </h4>
                            <div className="space-y-0 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 dark:before:via-slate-700 before:to-transparent pl-6 md:pl-0">
                              {p.versionHistory && p.versionHistory.length > 0 ? (
                                p.versionHistory.slice(-3).reverse().map((vh, i) => (
                                  <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active pb-4">
                                    <div className="flex items-center justify-center w-4 h-4 rounded-full border-2 border-white dark:border-slate-800 bg-indigo-500 absolute left-[-24px] md:left-1/2 md:-translate-x-1/2"></div>
                                    <div className="w-full md:w-5/12 bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm">
                                      <div className="flex justify-between items-center mb-1">
                                        <span className="font-bold text-sm text-slate-900 dark:text-white">{vh.version}</span>
                                        <span className="text-[10px] font-medium text-slate-500 bg-slate-100 dark:bg-slate-900 px-2 py-0.5 rounded-full">
                                          {new Date(vh.date).toLocaleDateString()}
                                        </span>
                                      </div>
                                      <p className="text-xs text-slate-600 dark:text-slate-400">{vh.description}</p>
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <p className="text-sm text-slate-500 italic p-4 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-800 relative z-10 w-full text-center">
                                  No status updates available.
                                </p>
                              )}
                            </div>
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "payments" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Payments</h2>
                {payments.length === 0 ? (
                  <p className="text-slate-500">No payment history found.</p>
                ) : (
                  <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
                          <th className="p-4 text-sm font-bold text-slate-600 dark:text-slate-400">Date</th>
                          <th className="p-4 text-sm font-bold text-slate-600 dark:text-slate-400">Amount</th>
                          <th className="p-4 text-sm font-bold text-slate-600 dark:text-slate-400">Type</th>
                          <th className="p-4 text-sm font-bold text-slate-600 dark:text-slate-400">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {payments.map(p => (
                          <tr key={p._id} className="border-b border-slate-100 dark:border-slate-800 last:border-0">
                            <td className="p-4 text-sm text-slate-700 dark:text-slate-300">
                              {new Date(p.createdAt).toLocaleDateString()}
                            </td>
                            <td className="p-4 text-sm font-medium text-slate-900 dark:text-white">₹{p.amount}</td>
                            <td className="p-4 text-sm text-slate-600 dark:text-slate-400 capitalize">{p.type}</td>
                            <td className="p-4">
                              <span className={`px-2 py-1 rounded text-xs font-bold ${
                                p.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                              }`}>
                                {p.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {activeTab === "schedules" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">My Schedule</h2>
                {schedules.length === 0 ? (
                  <div className="bg-white dark:bg-slate-800 rounded-2xl p-10 text-center border border-slate-200 dark:border-slate-700 text-slate-500">
                    You have no upcoming schedules.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {schedules.map((s) => (
                      <div key={s._id} className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 relative overflow-hidden group hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
                        <div className={`absolute top-0 right-0 w-2 h-full ${
                          s.status === 'completed' ? 'bg-green-500' :
                          s.status === 'cancelled' ? 'bg-red-500' :
                          'bg-blue-500'
                        }`}></div>
                        
                        <div className="mb-4">
                          <span className="inline-block px-2.5 py-1 bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300 text-[10px] rounded uppercase font-black tracking-widest mb-2">
                            {s.type}
                          </span>
                          <h3 className="font-bold text-lg text-slate-900 dark:text-white leading-tight">{s.title}</h3>
                        </div>

                        {s.description && (
                          <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">{s.description}</p>
                        )}

                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                            <div className="w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
                              <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                            </div>
                            {new Date(s.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })}
                          </div>
                          <div className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                            <div className="w-8 h-8 rounded-full bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center">
                              <History className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                            </div>
                            {s.time}
                          </div>
                        </div>

                        <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex justify-between items-center mt-auto">
                          <span className="text-xs text-slate-500">Scheduled by: {s.createdBy?.fullName || 'Admin'}</span>
                          <span className={`text-xs font-bold uppercase tracking-wider ${
                            s.status === 'completed' ? 'text-green-600' :
                            s.status === 'cancelled' ? 'text-red-600' :
                            'text-orange-500'
                          }`}>
                            {s.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "messages" && (
              <div className="h-full">
                <UserMessages />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
