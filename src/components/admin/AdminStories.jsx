import React, { useState, useEffect, useRef } from "react";
import { Plus, Trash2, Edit2, Eye, EyeOff, Search, Loader2, RefreshCw, X, BookOpen } from "lucide-react";
import { getAllStoriesAdmin, createStory, updateStory, deleteStory, togglePublishStory } from "../../api/stories.api";

const CATEGORIES = ["Success Story", "Project Showcase", "Workshop", "Announcement", "Tips & Tricks", "Other"];

const emptyForm = { title: "", description: "", category: "Success Story", status: "draft", tags: "" };

export default function AdminStories() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [actionLoading, setActionLoading] = useState("");
  const fileRef = useRef();

  const load = async () => {
    setLoading(true);
    try {
      const params = { page, limit: 10 };
      if (search) params.search = search;
      if (statusFilter) params.status = statusFilter;
      const res = await getAllStoriesAdmin(params);
      if (res.success) { setStories(res.data); setTotal(res.total); }
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  useEffect(() => { const t = setTimeout(load, 300); return () => clearTimeout(t); }, [search, statusFilter, page]);

  const openCreate = () => { setForm(emptyForm); setEditId(null); setCoverFile(null); setShowForm(true); };

  const openEdit = (story) => {
    setForm({ title: story.title, description: story.description, category: story.category, status: story.status, tags: (story.tags || []).join(", ") });
    setEditId(story._id);
    setCoverFile(null);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (coverFile) fd.append("coverImage", coverFile);
      if (editId) await updateStory(editId, fd);
      else await createStory(fd);
      setShowForm(false);
      load();
    } catch (err) { alert(err.message); } finally { setSubmitting(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this story?")) return;
    setActionLoading(id + "del");
    try { await deleteStory(id); load(); } catch (err) { alert(err.message); } finally { setActionLoading(""); }
  };

  const handleToggle = async (id) => {
    setActionLoading(id + "pub");
    try { await togglePublishStory(id); load(); } catch (err) { alert(err.message); } finally { setActionLoading(""); }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-black text-slate-950 dark:text-white">Stories Management</h2>
          <p className="text-xs text-slate-400">{total} total stories</p>
        </div>
        <div className="flex gap-2">
          <button onClick={load} className="p-2.5 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl text-slate-500 cursor-pointer"><RefreshCw className="w-4 h-4" /></button>
          <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-white text-xs font-black rounded-xl border-2 border-slate-950 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] cursor-pointer" id="add-story-btn">
            <Plus className="w-4 h-4" /> New Story
          </button>
        </div>
      </div>

      {/* Story Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-8 bg-black/60 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 border-2 border-slate-950 rounded-2xl p-6 w-full max-w-2xl shadow-[6px_6px_0px_0px_rgba(139,92,246,0.6)]">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-sm font-black text-slate-950 dark:text-white">{editId ? "Edit Story" : "Create New Story"}</h3>
              <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-slate-950 cursor-pointer"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400">Title *</label>
                <input type="text" value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))} placeholder="Story title..." required className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 font-medium" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-400">Category</label>
                  <select value={form.category} onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))} className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none cursor-pointer">
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-400">Status</label>
                  <select value={form.status} onChange={(e) => setForm((p) => ({ ...p, status: e.target.value }))} className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none cursor-pointer">
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400">Description / Content *</label>
                <textarea value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} rows={8} placeholder="Write your story here..." required className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 resize-vertical font-medium" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400">Tags (comma separated)</label>
                <input type="text" value={form.tags} onChange={(e) => setForm((p) => ({ ...p, tags: e.target.value }))} placeholder="e.g. IoT, AI, IEEE" className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400">Cover Image</label>
                <div onClick={() => fileRef.current?.click()} className="border-2 border-dashed border-purple-300 dark:border-purple-700 rounded-xl p-5 text-center cursor-pointer hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors">
                  <p className="text-xs font-bold text-slate-500">{coverFile ? coverFile.name : (editId ? "Click to change cover image" : "Click to add cover image")}</p>
                </div>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => setCoverFile(e.target.files[0])} />
              </div>
              <div className="flex gap-2 pt-2">
                <button type="submit" disabled={submitting} className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white text-xs font-black rounded-xl border-2 border-slate-950 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] cursor-pointer disabled:opacity-50 flex items-center gap-1.5">
                  {submitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <BookOpen className="w-3.5 h-3.5" />}
                  {editId ? "Update Story" : "Create Story"}
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-600 text-xs font-black rounded-xl border-2 border-slate-200 cursor-pointer">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input type="text" placeholder="Search stories..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} className="w-full pl-9 pr-3 py-2.5 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none focus:border-purple-500" id="stories-search-admin" />
        </div>
        <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }} className="px-3 py-2.5 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 rounded-xl text-xs cursor-pointer">
          <option value="">All</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-900 border-2 border-slate-950 dark:border-slate-700 rounded-2xl overflow-hidden shadow-[3px_3px_0px_0px_rgba(139,92,246,0.4)]">
        {loading ? (
          <div className="flex justify-center py-16"><Loader2 className="w-8 h-8 animate-spin text-purple-600" /></div>
        ) : stories.length === 0 ? (
          <div className="text-center py-16 text-slate-400 text-sm">No stories yet. Create your first one!</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b-2 border-slate-100 dark:border-slate-800">
                  <th className="text-left px-4 py-3 font-black text-slate-400 uppercase text-[10px]">Title</th>
                  <th className="text-left px-4 py-3 font-black text-slate-400 uppercase text-[10px]">Category</th>
                  <th className="text-left px-4 py-3 font-black text-slate-400 uppercase text-[10px]">Status</th>
                  <th className="text-left px-4 py-3 font-black text-slate-400 uppercase text-[10px]">Views</th>
                  <th className="text-left px-4 py-3 font-black text-slate-400 uppercase text-[10px]">Date</th>
                  <th className="text-right px-4 py-3 font-black text-slate-400 uppercase text-[10px]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {stories.map((s) => (
                  <tr key={s._id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="px-4 py-3">
                      <p className="font-black text-slate-950 dark:text-white truncate max-w-[200px]">{s.title}</p>
                      <p className="text-slate-400">{s.author?.fullName || "Admin"}</p>
                    </td>
                    <td className="px-4 py-3 text-slate-500">{s.category}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-lg font-black text-[10px] ${s.status === "published" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>{s.status}</span>
                    </td>
                    <td className="px-4 py-3 text-slate-400">{s.views || 0}</td>
                    <td className="px-4 py-3 text-slate-400">{new Date(s.createdAt).toLocaleDateString("en-IN")}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1.5">
                        <button onClick={() => handleToggle(s._id)} disabled={!!actionLoading} className={`p-1.5 rounded-lg cursor-pointer ${s.status === "published" ? "bg-slate-100 text-slate-600 hover:bg-amber-100 hover:text-amber-700" : "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"}`} title={s.status === "published" ? "Unpublish" : "Publish"} id={`toggle-story-${s._id}`}>
                          {actionLoading === s._id + "pub" ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : s.status === "published" ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                        <button onClick={() => openEdit(s)} className="p-1.5 bg-blue-100 dark:bg-blue-900/40 text-blue-600 rounded-lg hover:bg-blue-200 cursor-pointer" title="Edit" id={`edit-story-${s._id}`}><Edit2 className="w-3.5 h-3.5" /></button>
                        <button onClick={() => handleDelete(s._id)} disabled={!!actionLoading} className="p-1.5 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 cursor-pointer" title="Delete" id={`delete-story-${s._id}`}>
                          {actionLoading === s._id + "del" ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
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

      {total > 10 && (
        <div className="flex justify-center gap-2">
          <button disabled={page === 1} onClick={() => setPage((p) => p - 1)} className="px-3 py-2 text-xs font-bold bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 rounded-xl disabled:opacity-40 cursor-pointer">← Prev</button>
          <span className="px-3 py-2 text-xs font-bold text-slate-500">Page {page} / {Math.ceil(total / 10)}</span>
          <button disabled={page >= Math.ceil(total / 10)} onClick={() => setPage((p) => p + 1)} className="px-3 py-2 text-xs font-bold bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 rounded-xl disabled:opacity-40 cursor-pointer">Next →</button>
        </div>
      )}
    </div>
  );
}
