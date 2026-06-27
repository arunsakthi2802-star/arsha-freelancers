import React, { useState } from "react";
import { Shield, Key, User, Mail, Loader2, Save, Check } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { updateUser, resetUserPassword } from "../../api/admin.api";

export default function AdminSettings() {
  const { user, login } = useAuth();
  
  const [profileForm, setProfileForm] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
  });
  const [profileLoading, setProfileLoading] = useState(false);
  
  const [passwordForm, setPasswordForm] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordLoading, setPasswordLoading] = useState(false);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!profileForm.fullName.trim() || !profileForm.email.trim()) return;
    setProfileLoading(true);
    try {
      const fd = new FormData();
      fd.append("fullName", profileForm.fullName);
      fd.append("email", profileForm.email);
      
      const res = await updateUser(user._id, fd);
      if (res.success) {
        alert("Profile details updated successfully. Please note: you might need to re-login if you changed your email.");
      }
    } catch (err) {
      alert(err.message || "Failed to update profile.");
    } finally {
      setProfileLoading(false);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      return alert("Passwords do not match!");
    }
    if (passwordForm.newPassword.length < 6) {
      return alert("Password must be at least 6 characters long.");
    }
    setPasswordLoading(true);
    try {
      await resetUserPassword(user._id, passwordForm.newPassword);
      alert("Password updated successfully!");
      setPasswordForm({ newPassword: "", confirmPassword: "" });
    } catch (err) {
      alert(err.message || "Failed to update password.");
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h2 className="text-lg font-black text-slate-950 dark:text-white">Admin Account Settings</h2>
        <p className="text-xs text-slate-400">Change your login username (email) and password.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Profile Card */}
        <div className="bg-white dark:bg-slate-900 border-2 border-slate-950 dark:border-slate-700 rounded-2xl p-5 shadow-[4px_4px_0px_0px_rgba(37,99,235,0.6)] space-y-4">
          <h3 className="text-sm font-black text-slate-950 dark:text-white flex items-center gap-2">
            <User className="w-4 h-4 text-blue-600" />
            Profile Details
          </h3>
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-400">Full Name</label>
              <input
                type="text"
                value={profileForm.fullName}
                onChange={(e) => setProfileForm((p) => ({ ...p, fullName: e.target.value }))}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-400">Email Address (User ID)</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="email"
                  value={profileForm.email}
                  onChange={(e) => setProfileForm((p) => ({ ...p, email: e.target.value }))}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={profileLoading}
              className="px-4 py-2 bg-blue-600 text-white text-xs font-black rounded-xl border-2 border-slate-950 cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
            >
              {profileLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
              Save Profile
            </button>
          </form>
        </div>

        {/* Change Password Card */}
        <div className="bg-white dark:bg-slate-900 border-2 border-slate-950 dark:border-slate-700 rounded-2xl p-5 shadow-[4px_4px_0px_0px_rgba(139,92,246,0.6)] space-y-4">
          <h3 className="text-sm font-black text-slate-950 dark:text-white flex items-center gap-2">
            <Key className="w-4 h-4 text-purple-600" />
            Security / Password
          </h3>
          <form onSubmit={handleUpdatePassword} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-400">New Password</label>
              <input
                type="password"
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm((p) => ({ ...p, newPassword: e.target.value }))}
                placeholder="••••••"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-400">Confirm New Password</label>
              <input
                type="password"
                value={passwordForm.confirmPassword}
                onChange={(e) => setPasswordForm((p) => ({ ...p, confirmPassword: e.target.value }))}
                placeholder="••••••"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none"
                required
              />
            </div>
            <button
              type="submit"
              disabled={passwordLoading}
              className="px-4 py-2 bg-purple-600 text-white text-xs font-black rounded-xl border-2 border-slate-950 cursor-pointer disabled:opacity-50 flex items-center gap-1.5"
            >
              {passwordLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
              Update Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
