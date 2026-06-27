import React, { useState, useEffect } from "react";
import { Search, Trash2, Mail, Phone, Loader2, RefreshCw, Eye, MessageSquare } from "lucide-react";
import { getContacts, updateContactStatus, deleteContact } from "../../api/contact.api";

const STATUS_COLORS = {
  unread: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400",
  read: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400",
  replied: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-400",
};

export default function AdminContacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [actionLoading, setActionLoading] = useState("");
  const [viewItem, setViewItem] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const params = { page, limit: 15 };
      if (search) params.search = search;
      if (statusFilter) params.status = statusFilter;
      const res = await getContacts(params);
      if (res.success) { setContacts(res.data); setTotal(res.total); }
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  useEffect(() => { const t = setTimeout(load, 300); return () => clearTimeout(t); }, [search, statusFilter, page]);

  const handleStatus = async (id, status) => {
    setActionLoading(id + status);
    try { await updateContactStatus(id, status); load(); } catch (err) { alert(err.message); } finally { setActionLoading(""); }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this enquiry?")) return;
    setActionLoading(id + "del");
    try { await deleteContact(id); load(); } catch (err) { alert(err.message); } finally { setActionLoading(""); }
  };

  const handleView = (c) => {
    setViewItem(c);
    if (c.status === "unread") handleStatus(c._id, "read");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-black text-slate-950 dark:text-white">Contact Enquiries</h2>
          <p className="text-xs text-slate-400">{total} total enquiries</p>
        </div>
        <button onClick={load} className="p-2.5 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl text-slate-500 cursor-pointer self-start sm:self-auto"><RefreshCw className="w-4 h-4" /></button>
      </div>

      {/* View Modal */}
      {viewItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-white dark:bg-slate-900 border-2 border-slate-950 rounded-2xl p-6 w-full max-w-lg shadow-[6px_6px_0px_0px_rgba(239,68,68,0.5)]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-black text-slate-950 dark:text-white">Enquiry Details</h3>
              <span className={`text-[10px] font-black px-2 py-1 rounded-lg ${STATUS_COLORS[viewItem.status]}`}>{viewItem.status}</span>
            </div>
            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div><p className="text-slate-400 mb-0.5">From</p><p className="font-black text-slate-950 dark:text-white">{viewItem.name}</p></div>
                <div><p className="text-slate-400 mb-0.5">Date</p><p className="font-bold text-slate-600 dark:text-slate-400">{new Date(viewItem.createdAt).toLocaleDateString("en-IN")}</p></div>
              </div>
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                <Mail className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                <a href={`mailto:${viewItem.email}`} className="hover:text-blue-600 font-medium">{viewItem.email}</a>
              </div>
              {viewItem.phone && (
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <Phone className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                  <a href={`tel:${viewItem.phone}`} className="hover:text-blue-600 font-medium">{viewItem.phone}</a>
                </div>
              )}
              <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-3 border border-slate-200 dark:border-slate-700">
                <p className="text-slate-400 text-[10px] font-black uppercase mb-1">Subject</p>
                <p className="font-black text-slate-950 dark:text-white">{viewItem.subject}</p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-3 border border-slate-200 dark:border-slate-700">
                <p className="text-slate-400 text-[10px] font-black uppercase mb-1">Message</p>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{viewItem.message}</p>
              </div>
            </div>
            <div className="flex gap-2 mt-5">
              <a href={`mailto:${viewItem.email}?subject=Re: ${viewItem.subject}`} className="px-4 py-2 bg-blue-600 text-white text-xs font-black rounded-xl border-2 border-slate-950 cursor-pointer flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" /> Reply
              </a>
              <button onClick={() => { handleStatus(viewItem._id, "replied"); setViewItem(null); }} className="px-4 py-2 bg-emerald-100 text-emerald-700 text-xs font-black rounded-xl border border-emerald-200 cursor-pointer">Mark Replied</button>
              <button onClick={() => setViewItem(null)} className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-600 text-xs font-black rounded-xl border-2 border-slate-200 cursor-pointer ml-auto">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input type="text" placeholder="Search enquiries..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} className="w-full pl-9 pr-3 py-2.5 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none focus:border-red-400" id="contacts-search" />
        </div>
        <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }} className="px-3 py-2.5 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 rounded-xl text-xs cursor-pointer">
          <option value="">All Status</option>
          <option value="unread">Unread</option>
          <option value="read">Read</option>
          <option value="replied">Replied</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-900 border-2 border-slate-950 dark:border-slate-700 rounded-2xl overflow-hidden shadow-[3px_3px_0px_0px_rgba(239,68,68,0.4)]">
        {loading ? (
          <div className="flex justify-center py-16"><Loader2 className="w-8 h-8 animate-spin text-red-500" /></div>
        ) : contacts.length === 0 ? (
          <div className="text-center py-16"><MessageSquare className="w-10 h-10 text-slate-300 mx-auto mb-2" /><p className="text-slate-400 text-sm">No enquiries found.</p></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b-2 border-slate-100 dark:border-slate-800">
                  {["Sender", "Subject", "Status", "Date", "Actions"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 font-black text-slate-400 uppercase text-[10px]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {contacts.map((c) => (
                  <tr key={c._id} className={`border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 ${c.status === "unread" ? "bg-red-50/30 dark:bg-red-900/10" : ""}`}>
                    <td className="px-4 py-3">
                      <p className="font-black text-slate-950 dark:text-white">{c.name}</p>
                      <p className="text-slate-400 truncate max-w-[120px]">{c.email}</p>
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400 max-w-[180px] truncate">{c.subject}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-lg font-black text-[10px] ${STATUS_COLORS[c.status]}`}>{c.status}</span>
                    </td>
                    <td className="px-4 py-3 text-slate-400">{new Date(c.createdAt).toLocaleDateString("en-IN")}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <button onClick={() => handleView(c)} className="p-1.5 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 cursor-pointer" title="View" id={`view-contact-${c._id}`}><Eye className="w-3.5 h-3.5" /></button>
                        <button onClick={() => handleDelete(c._id)} disabled={!!actionLoading} className="p-1.5 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 cursor-pointer" title="Delete" id={`delete-contact-${c._id}`}>
                          {actionLoading === c._id + "del" ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
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

      {total > 15 && (
        <div className="flex justify-center gap-2">
          <button disabled={page === 1} onClick={() => setPage((p) => p - 1)} className="px-3 py-2 text-xs font-bold bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 rounded-xl disabled:opacity-40 cursor-pointer">← Prev</button>
          <span className="px-3 py-2 text-xs font-bold text-slate-500">Page {page} / {Math.ceil(total / 15)}</span>
          <button disabled={page >= Math.ceil(total / 15)} onClick={() => setPage((p) => p + 1)} className="px-3 py-2 text-xs font-bold bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 rounded-xl disabled:opacity-40 cursor-pointer">Next →</button>
        </div>
      )}
    </div>
  );
}
