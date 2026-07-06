import React, { useEffect, useState } from"react";
import { Users, Star, Images, BookOpen, Briefcase, MessageSquare, Clock, TrendingUp, Loader2 } from"lucide-react";
import { getDashboardStats } from"../../api/admin.api";

const StatCard = ({ label, value, icon: Icon, color, sub }) => (
 <div className={`bg-white border border-slate-200 rounded-md p-5 shadow-sm hover:shadow-md transition-shadow hover:shadow-md transition-shadow`}>
 <div className="flex items-start justify-between mb-3">
 <div className={`w-11 h-11 rounded flex items-center justify-center border border-slate-200 `} style={{ background: color +"20" }}>
 <Icon className="w-5 h-5" style={{ color }} />
 </div>
 {sub !== undefined && (
 <span className="text-[10px] font-black px-2 py-1 bg-amber-100 text-amber-700 rounded-lg border border-amber-200">
 {sub} pending
 </span>
 )}
 </div>
 <p className="text-2xl font-black text-slate-950">{value ??"—"}</p>
 <p className="text-xs font-bold text-slate-400 mt-0.5">{label}</p>
 </div>
);

const RecentItem = ({ children }) => (
 <div className="px-4 py-3 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
 {children}
 </div>
);

export default function AdminDashboard() {
 const [stats, setStats] = useState(null);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState("");

 useEffect(() => {
 const load = async () => {
 try {
 const res = await getDashboardStats();
 if (res.success) setStats(res.data);
 } catch (err) {
 setError(err.message);
 } finally {
 setLoading(false);
 }
 };
 load();
 }, []);

 if (loading) {
 return (
 <div className="flex items-center justify-center py-32">
 <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
 </div>
 );
 }

 if (error) {
 return (
 <div className="text-center py-20">
 <p className="text-red-500 font-bold">{error}</p>
 <p className="text-xs text-slate-400 mt-2">Make sure the backend server is running on port 5000.</p>
 </div>
 );
 }

 const c = stats?.counts || {};
 const r = stats?.recent || {};

 const statCards = [
 { label:"Total Users", value: c.totalUsers, icon: Users, color:"#2563EB" },
 { label:"Total Projects", value: c.totalProjects, icon: Briefcase, color:"#4F46E5" },
 { label:"Active Tasks", value: c.totalTasks, icon: Clock, color:"#10B981" },
 { label:"Total Payments", value: c.totalPayments, icon: TrendingUp, color:"#059669" },
 { label:"Total Reviews", value: c.totalReviews, icon: Star, color:"#F59E0B", sub: c.pendingReviews },
 { label:"Gallery Images", value: c.totalGallery, icon: Images, color:"#14B8A6" },
 { label:"Stories", value: c.totalStories, icon: BookOpen, color:"#8B5CF6" },
 { label:"Services", value: c.totalServices, icon: Briefcase, color:"#EC4899" },
 { label:"Enquiries", value: c.totalContacts, icon: MessageSquare, color:"#EF4444", sub: c.unreadContacts },
 ];

 return (
 <div className="space-y-8">
 {/* Welcome */}
 <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-md border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow hover:shadow-md transition-shadow text-white">
 <div className="flex items-center gap-3">
 <TrendingUp className="w-8 h-8" />
 <div>
 <h1 className="text-xl font-black">Welcome back, Admin! 🎉</h1>
 <p className="text-blue-100 text-sm font-medium">Here's what's happening at Arsha Freelancers today.</p>
 </div>
 </div>
 </div>

 {/* Stats Grid */}
 <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
 {statCards.map((card) => (
 <StatCard key={card.label} {...card} />
 ))}
 </div>

 {/* Recent Activity Grid */}
 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
 {/* Recent Reviews */}
 <div className="bg-white border border-slate-200 rounded-md overflow-hidden shadow-sm hover:shadow-md transition-shadow hover:shadow-md transition-shadow">
 <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2">
 <Star className="w-4 h-4 text-amber-500" />
 <h3 className="text-sm font-black text-slate-950">Recent Reviews</h3>
 </div>
 {(r.reviews || []).length === 0 ? (
 <p className="p-5 text-xs text-slate-400 text-center">No reviews yet.</p>
 ) : (
 r.reviews.map((rev) => (
 <RecentItem key={rev._id}>
 <div className="flex items-center justify-between gap-2">
 <div>
 <p className="text-xs font-black text-slate-950">{rev.studentName}</p>
 <p className="text-[10px] text-slate-400">{rev.collegeName}</p>
 </div>
 <span className={`text-[10px] font-black px-2 py-0.5 rounded-lg ${
 rev.approvalStatus ==="approved" ?"bg-emerald-100 text-emerald-700" :
 rev.approvalStatus ==="pending" ?"bg-amber-100 text-amber-700" :"bg-red-100 text-red-700"
 }`}>{rev.approvalStatus}</span>
 </div>
 </RecentItem>
 ))
 )}
 </div>

 {/* Recent Enquiries */}
 <div className="bg-white border border-slate-200 rounded-md overflow-hidden shadow-sm hover:shadow-md transition-shadow hover:shadow-md transition-shadow">
 <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2">
 <MessageSquare className="w-4 h-4 text-red-500" />
 <h3 className="text-sm font-black text-slate-950">Recent Enquiries</h3>
 </div>
 {(r.contacts || []).length === 0 ? (
 <p className="p-5 text-xs text-slate-400 text-center">No enquiries yet.</p>
 ) : (
 r.contacts.map((c) => (
 <RecentItem key={c._id}>
 <div className="flex items-center justify-between gap-2">
 <div>
 <p className="text-xs font-black text-slate-950">{c.name}</p>
 <p className="text-[10px] text-slate-400 truncate max-w-[180px]">{c.subject}</p>
 </div>
 <span className={`text-[10px] font-black px-2 py-0.5 rounded-lg ${
 c.status ==="unread" ?"bg-red-100 text-red-700" :
 c.status ==="read" ?"bg-blue-100 text-blue-700" :"bg-emerald-100 text-emerald-700"
 }`}>{c.status}</span>
 </div>
 </RecentItem>
 ))
 )}
 </div>

 {/* Recent Stories */}
 <div className="bg-white border border-slate-200 rounded-md overflow-hidden shadow-sm hover:shadow-md transition-shadow hover:shadow-md transition-shadow">
 <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2">
 <BookOpen className="w-4 h-4 text-purple-500" />
 <h3 className="text-sm font-black text-slate-950">Recent Stories</h3>
 </div>
 {(r.stories || []).length === 0 ? (
 <p className="p-5 text-xs text-slate-400 text-center">No stories yet.</p>
 ) : (
 r.stories.map((s) => (
 <RecentItem key={s._id}>
 <div className="flex items-center justify-between gap-2">
 <p className="text-xs font-black text-slate-950 truncate max-w-[200px]">{s.title}</p>
 <span className={`text-[10px] font-black px-2 py-0.5 rounded-lg ${
 s.status ==="published" ?"bg-emerald-100 text-emerald-700" :"bg-slate-100 text-slate-600"
 }`}>{s.status}</span>
 </div>
 </RecentItem>
 ))
 )}
 </div>

 {/* Recent Gallery */}
 <div className="bg-white border border-slate-200 rounded-md overflow-hidden shadow-sm hover:shadow-md transition-shadow hover:shadow-md transition-shadow">
 <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2">
 <Images className="w-4 h-4 text-teal-500" />
 <h3 className="text-sm font-black text-slate-950">Recent Gallery</h3>
 </div>
 {(r.gallery || []).length === 0 ? (
 <p className="p-5 text-xs text-slate-400 text-center">No gallery images yet.</p>
 ) : (
 <div className="p-4 grid grid-cols-5 gap-2">
 {r.gallery.map((img) => (
 <img
 key={img._id}
 src={img.image}
 alt={img.title}
 className="w-full aspect-square object-cover rounded-lg border border-slate-200"
 />
 ))}
 </div>
 )}
 </div>
 </div>
 </div>
 );
}
