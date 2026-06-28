import React, { useState, useEffect } from "react";
import { FolderOpen, ExternalLink, LogOut, User, Mail, Phone, BookOpen, Clock, ShieldAlert, CheckCircle, Fingerprint, Edit2, Save, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import LoginView from "./LoginView";
import { updateMyProfile } from "../api/auth.api";

export default function StudentPortal({ onNavigate }) {
  const { user, logout, isAuthenticated, refreshProfile } = useAuth();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ fullName: "", phone: "" });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      refreshProfile();
    }
  }, [isAuthenticated, refreshProfile]);

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || "",
        phone: user.phone || ""
      });
    }
  }, [user]);
  
  if (!isAuthenticated) {
    return <LoginView onNavigate={onNavigate} />;
  }

  const handleLogout = () => {
    logout();
    onNavigate("home");
  };

  const handleSaveProfile = async () => {
    try {
      setIsSaving(true);
      await updateMyProfile({ fullName: formData.fullName, phone: formData.phone });
      await refreshProfile();
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile", error);
      alert("Failed to update profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 pb-6 border-b-2 border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-950 dark:text-white tracking-tight">User Portal</h1>
          <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm">Manage your account, projects, and download resources.</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 text-xs font-black text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 border-2 border-red-200 dark:border-red-900/40 rounded-xl transition-all cursor-pointer"
        >
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-slate-900 border-2 border-slate-950 dark:border-slate-700 rounded-3xl p-6 shadow-[5px_5px_0px_0px_rgba(37,99,235,0.6)] relative">
            
            {!isEditing ? (
              <button 
                onClick={() => setIsEditing(true)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                title="Edit Profile"
              >
                <Edit2 className="w-4 h-4" />
              </button>
            ) : (
              <button 
                onClick={() => {
                  setIsEditing(false);
                  setFormData({ fullName: user.fullName || "", phone: user.phone || "" });
                }}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                title="Cancel Edit"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            <div className="text-center pb-6 border-b border-slate-100 dark:border-slate-800">
              <div className="w-20 h-20 bg-blue-600 rounded-3xl border-2 border-slate-950 mx-auto flex items-center justify-center text-white text-3xl font-black shadow-[3px_3px_0px_0px_rgba(15,23,42,1)]">
                {user?.fullName?.charAt(0) || "U"}
              </div>
              
              {isEditing ? (
                <div className="mt-4">
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    className="w-full text-center font-black text-slate-950 dark:text-white bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1 text-sm focus:border-blue-500 focus:outline-none"
                    placeholder="Full Name"
                  />
                </div>
              ) : (
                <h2 className="text-lg font-black text-slate-950 dark:text-white mt-4">{user?.fullName}</h2>
              )}
              
              <span className="inline-block mt-2 text-[10px] font-black uppercase px-2.5 py-0.5 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 rounded-full border border-emerald-200 dark:border-emerald-900">
                {user?.role === 'manager' ? 'Manager' : user?.status || "Active"} Client
              </span>
            </div>

            <div className="mt-6 space-y-4 text-xs">
              <div className="flex items-center gap-3">
                <Fingerprint className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-slate-400 text-[9px] uppercase font-black">Unique ID</p>
                  <p className="font-bold text-slate-700 dark:text-slate-300 font-mono text-[10px]">{user?._id}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-slate-400 text-[9px] uppercase font-black">Email</p>
                  <p className="font-bold text-slate-700 dark:text-slate-300 truncate">{user?.email}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <div className="w-full">
                  <p className="text-slate-400 text-[9px] uppercase font-black">Mobile Number</p>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full font-bold text-slate-950 dark:text-white bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1 mt-1 text-xs focus:border-blue-500 focus:outline-none"
                      placeholder="Phone number"
                    />
                  ) : (
                    <p className="font-bold text-slate-700 dark:text-slate-300 mt-0.5">{user?.phone || "—"}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <BookOpen className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <div>
                  <p className="text-slate-400 text-[9px] uppercase font-black">Academic / Dept</p>
                  <p className="font-bold text-slate-700 dark:text-slate-300 mt-0.5">
                    {user?.college || "—"} {user?.department ? `(${user?.department})` : ""}
                  </p>
                </div>
              </div>
            </div>

            {isEditing && (
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={handleSaveProfile}
                  disabled={isSaving}
                  className="w-full flex items-center justify-center gap-2 py-2 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs rounded-xl border-2 border-slate-950 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] cursor-pointer disabled:opacity-70 disabled:cursor-wait"
                >
                  <Save className="w-3 h-3" /> {isSaving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Resources & Drive Link Card */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-900 border-2 border-slate-950 dark:border-slate-700 rounded-3xl p-6 shadow-[5px_5px_0px_0px_rgba(20,184,166,0.6)]">
            <h3 className="text-base font-black text-slate-950 dark:text-white mb-4 flex items-center gap-2">
              <FolderOpen className="w-5 h-5 text-teal-500" />
              Project Resource Hub
            </h3>

            {user?.driveLink ? (
              <div className="space-y-6">
                <div className="p-4 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/60 rounded-2xl flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-black text-emerald-800 dark:text-emerald-400">Resources Shared!</h4>
                    <p className="text-xs text-emerald-700 dark:text-emerald-500 mt-0.5">Your developers have shared the source code and documentation folder with you.</p>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-5 border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">ASSIGNED PROJECT</span>
                  <h4 className="text-base font-black text-slate-950 dark:text-white mt-1">{user?.projectTitle || "Development Project"}</h4>
                  
                  <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-slate-400" />
                      <span>Updated: {new Date(user.updatedAt).toLocaleDateString("en-IN")}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={user.driveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-4 bg-teal-500 hover:bg-teal-400 text-white font-black rounded-2xl border-2 border-slate-950 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] hover:shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:-translate-y-0.5 transition-all text-sm cursor-pointer"
                  >
                    <FolderOpen className="w-5 h-5" />
                    Open Project Drive Folder
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                {/* Custom Resource Assets list */}
                {user.resources && user.resources.length > 0 && (
                  <div className="mt-8 pt-6 border-t-2 border-slate-200 dark:border-slate-800 space-y-4">
                    <h4 className="text-sm font-black text-slate-950 dark:text-white uppercase tracking-wider">Project Files & Attachments</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {user.resources.map((item, idx) => (
                        <div key={idx} className="bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 flex flex-col justify-between gap-3 relative overflow-hidden">
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-[9px] font-black uppercase px-2 py-0.5 bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-md">
                                {item.fileType === "pdf" ? "📄 PDF" : item.fileType === "zip" ? "📦 ZIP File" : item.fileType === "image" ? "🖼️ Image" : "🔗 Link"}
                              </span>
                              <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-md ${item.isUnlocked ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}>
                                {item.isUnlocked ? "Unlocked 🔓" : "Locked 🔒"}
                              </span>
                            </div>
                            <h5 className="text-xs font-black text-slate-950 dark:text-white line-clamp-1">{item.title}</h5>
                          </div>
                          
                          {item.isUnlocked ? (
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full text-center py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-black rounded-xl border-2 border-slate-950 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] hover:translate-y-[-1px] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                            >
                              Download Asset <ExternalLink className="w-3 h-3" />
                            </a>
                          ) : (
                            <button
                              disabled
                              className="w-full text-center py-2 bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 text-xs font-black rounded-xl border border-slate-300 dark:border-slate-700 flex items-center justify-center gap-1.5 cursor-not-allowed"
                            >
                              Locked 🔒 (Unlocks on milestone completion)
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                <div className="p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/60 rounded-2xl flex items-start gap-3">
                  <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-black text-amber-800 dark:text-amber-400">Resources Pending</h4>
                    <p className="text-xs text-amber-700 dark:text-amber-500 mt-0.5">Your project workspace is currently being prepared by the Arsha developer team.</p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  As soon as your project resource link (including codebase, documentation, and PPT slides) is ready, our admins will upload it here. You will also receive an update via your registered WhatsApp or Email.
                </p>

                <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs">
                  <p className="font-bold text-slate-700 dark:text-slate-300">Need immediate assistance or want to request custom milestones?</p>
                  <p className="text-slate-500 dark:text-slate-400 mt-1">Feel free to message us on WhatsApp or chat with our live **Arsha AI Agent** below!</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

