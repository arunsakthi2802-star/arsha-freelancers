import React, { useState } from "react";
import { User, Mail, Phone, BookOpen, Save, Loader2 } from "lucide-react";
import { updateMyProfile } from "../../api/auth.api";

export default function DashboardSettings({ user, refreshProfile }) {
  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    phone: user?.phone || "",
    college: user?.college || "",
    department: user?.department || ""
  });
  
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setError("");
    setMessage("");

    try {
      // In Mock Data MVP, updateMyProfile might throw or succeed based on mock api.
      await updateMyProfile(formData);
      await refreshProfile();
      setMessage("Profile updated successfully!");
    } catch (err) {
      setError(err.message || "Failed to update profile.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-3xl">
      <div className="glass-card rounded-[2rem] p-6 sm:p-10 border border-border-primary shadow-sm">
        
        <div className="mb-8 border-b border-border-primary pb-6">
          <h2 className="text-2xl font-black text-text-primary tracking-tight">Profile Settings</h2>
          <p className="text-sm text-text-secondary mt-1">Update your personal information and contact details.</p>
        </div>

        {error && (
          <div className="mb-6 px-4 py-3 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-xl text-sm font-bold">
            {error}
          </div>
        )}
        {message && (
          <div className="mb-6 px-4 py-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 rounded-xl text-sm font-bold">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="w-full space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-widest text-text-tertiary">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full pl-12 pr-4 py-3.5 bg-bg-secondary border border-border-primary rounded-xl text-sm text-text-primary focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary transition-all font-medium"
                />
              </div>
            </div>

            <div className="w-full space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-widest text-text-tertiary">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
                <input
                  type="email"
                  value={user?.email || ""}
                  disabled
                  className="w-full pl-12 pr-4 py-3.5 bg-bg-secondary/50 border border-border-primary rounded-xl text-sm text-text-tertiary cursor-not-allowed font-medium"
                />
              </div>
              <p className="text-[10px] text-text-tertiary mt-1">Email cannot be changed.</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6">
            <div className="w-full space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-widest text-text-tertiary">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3.5 bg-bg-secondary border border-border-primary rounded-xl text-sm text-text-primary focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary transition-all font-medium"
                />
              </div>
            </div>
            
            <div className="w-full space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-widest text-text-tertiary">Role</label>
              <input
                type="text"
                value={user?.role?.toUpperCase() || "CLIENT"}
                disabled
                className="w-full px-4 py-3.5 bg-bg-secondary/50 border border-border-primary rounded-xl text-sm font-black tracking-widest text-text-tertiary cursor-not-allowed"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6">
            <div className="w-full space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-widest text-text-tertiary">College / Institution</label>
              <div className="relative">
                <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
                <input
                  type="text"
                  name="college"
                  value={formData.college}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3.5 bg-bg-secondary border border-border-primary rounded-xl text-sm text-text-primary focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary transition-all font-medium"
                />
              </div>
            </div>

            <div className="w-full space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-widest text-text-tertiary">Department</label>
              <div className="relative">
                <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3.5 bg-bg-secondary border border-border-primary rounded-xl text-sm text-text-primary focus:outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary transition-all font-medium"
                />
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-border-primary flex justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="px-8 py-3.5 bg-accent-primary hover:bg-accent-primary/90 disabled:bg-accent-primary/50 text-accent-text font-black text-sm rounded-xl border border-transparent shadow-lg shadow-accent-primary/25 hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
