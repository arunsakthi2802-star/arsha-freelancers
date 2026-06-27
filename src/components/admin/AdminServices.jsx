import React, { useState, useEffect } from "react";
import { Plus, Trash2, Edit2, ToggleLeft, ToggleRight, Loader2, X, RefreshCw, Briefcase } from "lucide-react";
import { getAllServicesAdmin, createService, updateService, deleteService, toggleService } from "../../api/services.api";

const ICONS = ["Code", "GraduationCap", "Cpu", "Brain", "Globe", "Smartphone", "FileText", "Shield", "Zap", "Database", "Layers", "Monitor", "Wifi", "Server", "BookOpen", "Award"];
const emptyForm = { serviceName: "", description: "", icon: "Code", price: "", features: "" };

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [actionLoading, setActionLoading] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const res = await getAllServicesAdmin();
      if (res.success) setServices(res.data);
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => { setForm(emptyForm); setEditId(null); setShowForm(true); };
  const openEdit = (s) => {
    setForm({ serviceName: s.serviceName, description: s.description, icon: s.icon, price: s.price, features: (s.features || []).join(", ") });
    setEditId(s._id);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const data = { ...form, features: form.features ? form.features.split(",").map((f) => f.trim()) : [] };
      if (editId) await updateService(editId, data);
      else await createService(data);
      setShowForm(false);
      load();
    } catch (err) { alert(err.message); } finally { setSubmitting(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this service?")) return;
    setActionLoading(id + "del");
    try { await deleteService(id); load(); } catch (err) { alert(err.message); } finally { setActionLoading(""); }
  };

  const handleToggle = async (id) => {
    setActionLoading(id + "tog");
    try { await toggleService(id); load(); } catch (err) { alert(err.message); } finally { setActionLoading(""); }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-black text-slate-950 dark:text-white">Services Management</h2>
          <p className="text-xs text-slate-400">{services.length} total services</p>
        </div>
        <div className="flex gap-2">
          <button onClick={load} className="p-2.5 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl text-slate-500 cursor-pointer"><RefreshCw className="w-4 h-4" /></button>
          <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2.5 bg-pink-600 hover:bg-pink-500 text-white text-xs font-black rounded-xl border-2 border-slate-950 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] cursor-pointer" id="add-service-btn">
            <Plus className="w-4 h-4" /> Add Service
          </button>
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-8 bg-black/60 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 border-2 border-slate-950 rounded-2xl p-6 w-full max-w-lg shadow-[6px_6px_0px_0px_rgba(236,72,153,0.6)]">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-sm font-black text-slate-950 dark:text-white">{editId ? "Edit Service" : "Add New Service"}</h3>
              <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-slate-950 cursor-pointer"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400">Service Name *</label>
                <input type="text" value={form.serviceName} onChange={(e) => setForm((p) => ({ ...p, serviceName: e.target.value }))} placeholder="e.g. Final Year Projects" required className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-400">Icon</label>
                  <select value={form.icon} onChange={(e) => setForm((p) => ({ ...p, icon: e.target.value }))} className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none cursor-pointer">
                    {ICONS.map((i) => <option key={i} value={i}>{i}</option>)}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-400">Price</label>
                  <input type="text" value={form.price} onChange={(e) => setForm((p) => ({ ...p, price: e.target.value }))} placeholder="₹2,500 – ₹15,000" className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400">Description *</label>
                <textarea value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} rows={4} placeholder="Describe this service..." required className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-white focus:outline-none resize-none" />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400">Features (comma separated)</label>
                <input type="text" value={form.features} onChange={(e) => setForm((p) => ({ ...p, features: e.target.value }))} placeholder="Full Source Code, IEEE Docs, Demo Video" className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none" />
              </div>
              <div className="flex gap-2">
                <button type="submit" disabled={submitting} className="px-5 py-2.5 bg-pink-600 hover:bg-pink-500 text-white text-xs font-black rounded-xl border-2 border-slate-950 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] cursor-pointer disabled:opacity-50 flex items-center gap-1.5">
                  {submitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Briefcase className="w-3.5 h-3.5" />}
                  {editId ? "Update" : "Create"}
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-600 text-xs font-black rounded-xl border-2 border-slate-200 cursor-pointer">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Cards Grid */}
      {loading ? (
        <div className="flex justify-center py-16"><Loader2 className="w-8 h-8 animate-spin text-pink-600" /></div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s) => (
            <div key={s._id} className={`bg-white dark:bg-slate-900 border-2 border-slate-950 dark:border-slate-700 rounded-2xl p-5 shadow-[3px_3px_0px_0px_rgba(236,72,153,0.4)] ${s.status === "inactive" ? "opacity-60" : ""}`}>
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="w-10 h-10 bg-pink-100 dark:bg-pink-900/40 text-pink-600 dark:text-pink-400 rounded-xl flex items-center justify-center border border-pink-200 dark:border-pink-800">
                  <Briefcase className="w-5 h-5" />
                </div>
                <span className={`text-[10px] font-black px-2 py-1 rounded-lg ${s.status === "active" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>{s.status}</span>
              </div>
              <h3 className="text-sm font-black text-slate-950 dark:text-white mb-1">{s.serviceName}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-2 line-clamp-2">{s.description}</p>
              {s.price && <p className="text-xs font-black text-pink-600 dark:text-pink-400 mb-3">{s.price}</p>}
              {(s.features || []).length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {s.features.slice(0, 3).map((f, i) => (
                    <span key={i} className="text-[9px] px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-md font-medium">{f}</span>
                  ))}
                  {s.features.length > 3 && <span className="text-[9px] px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-400 rounded-md">+{s.features.length - 3}</span>}
                </div>
              )}
              <div className="flex items-center gap-1.5 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button onClick={() => handleToggle(s._id)} disabled={!!actionLoading} className={`p-1.5 rounded-lg cursor-pointer transition-colors ${s.status === "active" ? "bg-slate-100 text-slate-600 hover:bg-red-100 hover:text-red-600" : "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"}`} title={s.status === "active" ? "Disable" : "Enable"} id={`toggle-service-${s._id}`}>
                  {actionLoading === s._id + "tog" ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : s.status === "active" ? <ToggleRight className="w-3.5 h-3.5" /> : <ToggleLeft className="w-3.5 h-3.5" />}
                </button>
                <button onClick={() => openEdit(s)} className="p-1.5 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 cursor-pointer" id={`edit-service-${s._id}`}><Edit2 className="w-3.5 h-3.5" /></button>
                <button onClick={() => handleDelete(s._id)} disabled={!!actionLoading} className="p-1.5 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 cursor-pointer" id={`delete-service-${s._id}`}>
                  {actionLoading === s._id + "del" ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          ))}

          {/* Add new card */}
          <button onClick={openCreate} className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-5 flex flex-col items-center justify-center gap-3 hover:border-pink-400 hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-all cursor-pointer min-h-[200px]" id="add-service-card">
            <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center">
              <Plus className="w-6 h-6 text-slate-400" />
            </div>
            <p className="text-xs font-black text-slate-400">Add New Service</p>
          </button>
        </div>
      )}
    </div>
  );
}
