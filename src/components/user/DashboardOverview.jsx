import React from "react";
import { User, FileText, CreditCard, Calendar } from "lucide-react";

export default function DashboardOverview({ user, projects, payments, schedules }) {
  const activeProjectsCount = projects.length;
  const pendingPaymentsCount = payments.filter(p => p.status === 'pending').length;
  const upcomingSchedulesCount = schedules.filter(s => s.status === 'scheduled').length;

  return (
    <div className="space-y-8">
      {/* Welcome & User Details Card */}
      <div className="relative overflow-hidden rounded-[2rem] bg-accent-primary p-8 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 blur-[60px] rounded-full translate-y-1/3 -translate-x-1/4 pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-accent-text tracking-tight mb-2">
              Welcome back, {user?.fullName?.split(' ')[0]}! 👋
            </h2>
            <div className="mb-4">
              <span className="inline-block px-3 py-1.5 bg-black/10 backdrop-blur-md rounded-xl text-accent-text font-bold text-xs uppercase tracking-widest border border-white/20">
                ID: {user?._id || "NEW-USER"}
              </span>
            </div>
            <p className="text-accent-text/80 text-sm font-medium max-w-xl leading-relaxed">
              Here's what's happening with your projects, payments, and schedules today.
            </p>
          </div>
          <div className="hidden md:flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-inner">
            <User className="w-10 h-10 text-accent-text" />
          </div>
        </div>

        <div className="relative z-10 mt-10 grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8 border-t border-white/20">
          <div>
            <p className="text-accent-text/60 text-[10px] font-bold uppercase tracking-widest mb-1">Email</p>
            <p className="font-bold text-sm text-accent-text truncate" title={user?.email}>{user?.email || "—"}</p>
          </div>
          <div>
            <p className="text-accent-text/60 text-[10px] font-bold uppercase tracking-widest mb-1">Phone</p>
            <p className="font-bold text-sm text-accent-text truncate">{user?.phone || "—"}</p>
          </div>
          <div>
            <p className="text-accent-text/60 text-[10px] font-bold uppercase tracking-widest mb-1">Role</p>
            <p className="font-bold text-sm text-accent-text capitalize">{user?.role || "Client"}</p>
          </div>
          <div>
            <p className="text-accent-text/60 text-[10px] font-bold uppercase tracking-widest mb-1">Institution</p>
            <p className="font-bold text-sm text-accent-text truncate" title={user?.college}>{user?.college || "—"}</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-2xl border border-border-primary flex items-start gap-4">
          <div className="p-3 bg-blue-500/10 text-blue-500 rounded-xl">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-text-tertiary uppercase tracking-widest mb-1">Active Projects</p>
            <p className="text-3xl font-black text-text-primary">{activeProjectsCount}</p>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-border-primary flex items-start gap-4">
          <div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl">
            <CreditCard className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-text-tertiary uppercase tracking-widest mb-1">Pending Payments</p>
            <p className="text-3xl font-black text-text-primary">{pendingPaymentsCount}</p>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-border-primary flex items-start gap-4">
          <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-xl">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-text-tertiary uppercase tracking-widest mb-1">Upcoming Schedules</p>
            <p className="text-3xl font-black text-text-primary">{upcomingSchedulesCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
