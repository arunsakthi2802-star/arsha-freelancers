import React, { useState, useEffect } from "react";
import { Search, Check, X, Trash2, Star, Loader2, Plus, Edit2, RefreshCw, MessageSquare } from "lucide-react";
import { getReviews, approveReview, rejectReview, deleteReview, submitReview, updateReview } from "../../api/reviews.api";

const STATUS_COLORS = {
  approved: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400",
  pending: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400",
  rejected: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400",
};

const Stars = ({ rating }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((i) => (
      <Star key={i} className={`w-3 h-3 ${i <= rating ? "text-amber-400 fill-amber-400" : "text-slate-300"}`} />
    ))}
  </div>
);

export default function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [ratingFilter, setRatingFilter] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [actionLoading, setActionLoading] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newReview, setNewReview] = useState({ studentName: "", collegeName: "", projectTitle: "", reviewMessage: "", rating: "5" });
  const [addLoading, setAddLoading] = useState(false);
  const [replyModal, setReplyModal] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [replyLoading, setReplyLoading] = useState(false);

  const loadReviews = async () => {
    setLoading(true);
    try {
      const params = { page, limit: 10 };
      if (search) params.search = search;
      if (statusFilter) params.status = statusFilter;
      if (ratingFilter) params.rating = ratingFilter;

      const res = await getReviews(params);
      if (res.success) { setReviews(res.data); setTotal(res.total); }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const t = setTimeout(loadReviews, 300);
    return () => clearTimeout(t);
  }, [search, statusFilter, ratingFilter, page]);

  const handleAction = async (id, action) => {
    setActionLoading(id + action);
    try {
      if (action === "approve") await approveReview(id);
      if (action === "reject") await rejectReview(id);
      if (action === "delete") await deleteReview(id);
      loadReviews();
    } catch (err) {
      alert(err.message);
    } finally {
      setActionLoading("");
    }
  };

  const handleAddReview = async (e) => {
    e.preventDefault();
    setAddLoading(true);
    try {
      const fd = new FormData();
      Object.entries(newReview).forEach(([k, v]) => fd.append(k, v));
      await submitReview(fd);
      setShowAddForm(false);
      setNewReview({ studentName: "", collegeName: "", projectTitle: "", reviewMessage: "", rating: "5" });
      loadReviews();
    } catch (err) {
      alert(err.message);
    } finally {
      setAddLoading(false);
    }
  };

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    if (!replyModal) return;
    setReplyLoading(true);
    try {
      const fd = new FormData();
      fd.append("adminReply", replyText);
      // We don't have updateReview imported yet, we'll import it above or just use the fetch manually.
      // Wait, let me import updateReview from reviews.api
      // I'll add the import in a separate replace chunk, but I'll write the logic here.
      await updateReview(replyModal._id, fd);
      setReplyModal(null);
      setReplyText("");
      loadReviews();
    } catch (err) {
      alert(err.message);
    } finally {
      setReplyLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-black text-slate-950 dark:text-white">Reviews Management</h2>
          <p className="text-xs text-slate-400">{total} total reviews</p>
        </div>
        <div className="flex gap-2">
          <button onClick={loadReviews} className="p-2.5 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl text-slate-500 hover:text-slate-950 dark:hover:text-white transition-colors cursor-pointer" id="reviews-refresh">
            <RefreshCw className="w-4 h-4" />
          </button>
          <button onClick={() => setShowAddForm((p) => !p)} className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-black rounded-xl border-2 border-slate-950 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] transition-all cursor-pointer" id="add-review-btn">
            <Plus className="w-4 h-4" /> Add Review
          </button>
        </div>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <div className="bg-white dark:bg-slate-900 border-2 border-blue-400 rounded-2xl p-5 space-y-3 shadow-[3px_3px_0px_0px_rgba(37,99,235,0.5)]">
          <h3 className="text-sm font-black text-slate-950 dark:text-white">Add New Review</h3>
          <form onSubmit={handleAddReview} className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { key: "studentName", label: "Student Name", placeholder: "e.g. Ravi Kumar" },
              { key: "collegeName", label: "College Name", placeholder: "e.g. Sona College" },
              { key: "projectTitle", label: "Project Title", placeholder: "e.g. Smart Irrigation System" },
            ].map(({ key, label, placeholder }) => (
              <div key={key} className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400">{label}</label>
                <input
                  type="text"
                  value={newReview[key]}
                  onChange={(e) => setNewReview((p) => ({ ...p, [key]: e.target.value }))}
                  placeholder={placeholder}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none"
                  required
                />
              </div>
            ))}
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-400">Rating</label>
              <select value={newReview.rating} onChange={(e) => setNewReview((p) => ({ ...p, rating: e.target.value }))} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none cursor-pointer">
                {[5,4,3,2,1].map((r) => <option key={r} value={r}>{"⭐".repeat(r)} ({r})</option>)}
              </select>
            </div>
            <div className="sm:col-span-2 space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-400">Review Message</label>
              <textarea value={newReview.reviewMessage} onChange={(e) => setNewReview((p) => ({ ...p, reviewMessage: e.target.value }))} rows={3} placeholder="Write the review message..." className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none resize-none" required />
            </div>
            <div className="sm:col-span-2 flex gap-2">
              <button type="submit" disabled={addLoading} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-black rounded-xl border-2 border-slate-950 cursor-pointer disabled:opacity-50 flex items-center gap-1.5">
                {addLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />} Submit
              </button>
              <button type="button" onClick={() => setShowAddForm(false)} className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-black rounded-xl border-2 border-slate-200 dark:border-slate-700 cursor-pointer">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input type="text" placeholder="Search reviews..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} className="w-full pl-9 pr-3 py-2.5 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none focus:border-blue-500" id="reviews-search" />
        </div>
        <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }} className="px-3 py-2.5 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none cursor-pointer">
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
        <select value={ratingFilter} onChange={(e) => { setRatingFilter(e.target.value); setPage(1); }} className="px-3 py-2.5 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none cursor-pointer">
          <option value="">All Ratings</option>
          {[5,4,3,2,1].map((r) => <option key={r} value={r}>{r} ⭐</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-900 border-2 border-slate-950 dark:border-slate-700 rounded-2xl overflow-hidden shadow-[3px_3px_0px_0px_rgba(245,158,11,0.4)]">
        {loading ? (
          <div className="flex justify-center py-16"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-16 text-slate-400 text-sm">No reviews found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b-2 border-slate-100 dark:border-slate-800">
                  <th className="text-left px-4 py-3 font-black text-slate-400 uppercase text-[10px]">Student</th>
                  <th className="text-left px-4 py-3 font-black text-slate-400 uppercase text-[10px]">College</th>
                  <th className="text-left px-4 py-3 font-black text-slate-400 uppercase text-[10px]">Rating</th>
                  <th className="text-left px-4 py-3 font-black text-slate-400 uppercase text-[10px]">Status</th>
                  <th className="text-left px-4 py-3 font-black text-slate-400 uppercase text-[10px]">Date</th>
                  <th className="text-right px-4 py-3 font-black text-slate-400 uppercase text-[10px]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reviews.map((rev) => (
                  <tr key={rev._id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="px-4 py-3">
                      <p className="font-black text-slate-950 dark:text-white">{rev.studentName}</p>
                      <p className="text-slate-400 truncate max-w-[140px]">{rev.projectTitle}</p>
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400 max-w-[120px] truncate">{rev.collegeName}</td>
                    <td className="px-4 py-3"><Stars rating={rev.rating} /></td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-lg font-black text-[10px] ${STATUS_COLORS[rev.approvalStatus]}`}>{rev.approvalStatus}</span>
                    </td>
                    <td className="px-4 py-3 text-slate-400">{new Date(rev.createdAt).toLocaleDateString("en-IN")}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1.5">
                        {rev.approvalStatus !== "approved" && (
                          <button onClick={() => handleAction(rev._id, "approve")} disabled={!!actionLoading} className="p-1.5 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 rounded-lg hover:bg-emerald-200 transition-colors cursor-pointer" title="Approve" id={`approve-review-${rev._id}`}>
                            {actionLoading === rev._id + "approve" ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                          </button>
                        )}
                        {rev.approvalStatus !== "rejected" && (
                          <button onClick={() => handleAction(rev._id, "reject")} disabled={!!actionLoading} className="p-1.5 bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 rounded-lg hover:bg-amber-200 transition-colors cursor-pointer" title="Reject">
                            {actionLoading === rev._id + "reject" ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <X className="w-3.5 h-3.5" />}
                          </button>
                        )}
                        <button onClick={() => { setReplyModal(rev); setReplyText(rev.adminReply || ""); }} className="p-1.5 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-200 transition-colors cursor-pointer" title="Reply">
                          <MessageSquare className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => { if (confirm("Delete this review?")) handleAction(rev._id, "delete"); }} disabled={!!actionLoading} className="p-1.5 bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 transition-colors cursor-pointer" title="Delete" id={`delete-review-${rev._id}`}>
                          {actionLoading === rev._id + "delete" ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {total > 10 && (
        <div className="flex justify-center gap-2">
          <button disabled={page === 1} onClick={() => setPage((p) => p - 1)} className="px-3 py-2 text-xs font-bold bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 rounded-xl disabled:opacity-40 cursor-pointer">← Prev</button>
          <span className="px-3 py-2 text-xs font-bold text-slate-500">Page {page} / {Math.ceil(total / 10)}</span>
          <button disabled={page >= Math.ceil(total / 10)} onClick={() => setPage((p) => p + 1)} className="px-3 py-2 text-xs font-bold bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 rounded-xl disabled:opacity-40 cursor-pointer">Next →</button>
        </div>
      )}

      {/* Reply Modal */}
      {replyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl border-4 border-slate-950 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-black text-slate-950 dark:text-white">Reply to {replyModal.studentName}</h3>
              <button onClick={() => setReplyModal(null)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-slate-500 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleReplySubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase text-slate-500">Admin/Manager Reply</label>
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type your reply to be shown publicly on the review..."
                  rows={4}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:border-blue-500 dark:text-white resize-none"
                  required
                />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setReplyModal(null)} className="px-5 py-2.5 text-sm font-black text-slate-600 bg-slate-100 border-2 border-slate-200 rounded-xl hover:bg-slate-200 cursor-pointer">
                  Cancel
                </button>
                <button type="submit" disabled={replyLoading} className="px-5 py-2.5 text-sm font-black text-white bg-blue-600 border-2 border-slate-950 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] rounded-xl hover:bg-blue-500 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] transition-all cursor-pointer flex items-center gap-2">
                  {replyLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                  Save Reply
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
