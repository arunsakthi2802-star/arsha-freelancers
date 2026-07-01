import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { getAllPayments, createPayment, updatePayment, deletePayment } from "../../api/payments.api";
import { getUsers } from "../../api/admin.api";

export default function ManagerPayments() {
  const [payments, setPayments] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    projectTitle: "",
    student: "",
    amount: 0,
    currency: "RS",
    type: "advance",
    status: "pending",
    transactionId: ""
  });
  
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [payRes, userRes] = await Promise.all([
        getAllPayments(),
        getUsers({ limit: 100 })
      ]);
      if (payRes.success) setPayments(payRes.data);
      if (userRes.success) setUsers(userRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await createPayment(formData);
      setIsAddModalOpen(false);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updatePayment(editingId, formData);
      setIsEditModalOpen(false);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this payment?")) {
      try {
        await deletePayment(id);
        fetchData();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const openEditModal = (p) => {
    setEditingId(p._id);
    setFormData({
      projectTitle: p.project?.title || p.projectTitle || "",
      student: p.student?._id || "",
      amount: p.amount || 0,
      currency: p.currency || "RS",
      type: p.type || "advance",
      status: p.status || "pending",
      transactionId: p.transactionId || ""
    });
    setIsEditModalOpen(true);
  };

  if (loading) return <div className="text-center p-10">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Payment Management</h2>
        <button 
          onClick={() => {
            setFormData({ projectTitle: "", student: "", amount: 0, currency: "RS", type: "advance", status: "pending", transactionId: "" });
            setIsAddModalOpen(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-blue-500"
        >
          <Plus className="w-4 h-4" /> Add Payment
        </button>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
                <th className="p-4 font-semibold text-sm text-slate-600 dark:text-slate-300">Project</th>
                <th className="p-4 font-semibold text-sm text-slate-600 dark:text-slate-300">Student</th>
                <th className="p-4 font-semibold text-sm text-slate-600 dark:text-slate-300">Amount</th>
                <th className="p-4 font-semibold text-sm text-slate-600 dark:text-slate-300">Type</th>
                <th className="p-4 font-semibold text-sm text-slate-600 dark:text-slate-300">Status</th>
                <th className="p-4 font-semibold text-sm text-slate-600 dark:text-slate-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {payments.map((p) => (
                <tr key={p._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-4 text-sm font-medium text-slate-900 dark:text-white">{p.projectTitle || "N/A"}</td>
                  <td className="p-4 text-sm text-slate-600 dark:text-slate-400">{p.student?.fullName || "Unassigned"}</td>
                  <td className="p-4 text-sm text-slate-900 dark:text-white font-bold">{p.currency} {p.amount}</td>
                  <td className="p-4 text-sm text-slate-600 dark:text-slate-400 capitalize">{p.type}</td>
                  <td className="p-4 text-sm text-slate-600 dark:text-slate-400">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${
                      (p.status === "paid" || p.status === "completed") ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : 
                      (p.status === "closing" || p.status === "failed") ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" :
                      (p.status === "scheduled") ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" :
                      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                    }`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="p-4 text-sm">
                    <div className="flex gap-2">
                      <button onClick={() => openEditModal(p)} className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(p._id)} className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {(isAddModalOpen || isEditModalOpen) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl w-full max-w-lg shadow-xl border border-slate-200 dark:border-slate-800">
            <h3 className="text-xl font-bold mb-4">{isEditModalOpen ? "Edit Payment" : "Add Payment"}</h3>
            <form onSubmit={isEditModalOpen ? handleUpdate : handleCreate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Project Title</label>
                <input
                  type="text"
                  required
                  placeholder="Type the project heading..."
                  value={formData.projectTitle}
                  onChange={e => setFormData({...formData, projectTitle: e.target.value})}
                  className="w-full p-2 border rounded dark:bg-slate-800 dark:border-slate-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Student</label>
                <select required value={formData.student} onChange={e => setFormData({...formData, student: e.target.value})} className="w-full p-2 border rounded dark:bg-slate-800 dark:border-slate-700">
                  <option value="">Select Student</option>
                  {users.filter(u => u.role === "student" || u.role === "user").map(u => (
                    <option key={u._id} value={u._id}>{u.fullName} ({u.email})</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Amount</label>
                  <input type="number" required value={formData.amount} onChange={e => setFormData({...formData, amount: Number(e.target.value)})} className="w-full p-2 border rounded dark:bg-slate-800 dark:border-slate-700" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Currency</label>
                  <select value={formData.currency} onChange={e => setFormData({...formData, currency: e.target.value})} className="w-full p-2 border rounded dark:bg-slate-800 dark:border-slate-700">
                    <option value="RS">RS</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Payment Type</label>
                  <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full p-2 border rounded dark:bg-slate-800 dark:border-slate-700">
                    <option value="advance">Advance</option>
                    <option value="milestone">Milestone</option>
                    <option value="final">Final</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Transaction ID (Optional)</label>
                  <input value={formData.transactionId} onChange={e => setFormData({...formData, transactionId: e.target.value})} className="w-full p-2 border rounded dark:bg-slate-800 dark:border-slate-700" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full p-2 border rounded dark:bg-slate-800 dark:border-slate-700">
                  <option value="pending">Pending</option>
                  <option value="closing">Closing</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="paid">Paid</option>
                  <option value="failed">Failed</option>
                  <option value="refunded">Refunded</option>
                </select>
              </div>
              
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); }} className="px-4 py-2 bg-slate-200 dark:bg-slate-800 rounded">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">{isEditModalOpen ? "Update" : "Create"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
