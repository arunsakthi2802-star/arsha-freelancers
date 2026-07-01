import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { getAllProjects, createProject, updateProject, deleteProject } from "../../api/projects.api";
import { getUsers } from "../../api/admin.api";

export default function ManagerProjects() {
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    technologyStack: "",
    student: "",
    developer: "",
    status: "Requirements Verified",
    price: 0
  });
  
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [projRes, userRes] = await Promise.all([
        getAllProjects(),
        getUsers({ limit: 100 }) // fetch up to 100 users for assignment
      ]);
      if (projRes.success) setProjects(projRes.data);
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
      const data = {
        ...formData,
        technologyStack: formData.technologyStack.split(",").map(s => s.trim())
      };
      await createProject(data);
      setIsAddModalOpen(false);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        technologyStack: typeof formData.technologyStack === "string" 
          ? formData.technologyStack.split(",").map(s => s.trim()) 
          : formData.technologyStack
      };
      await updateProject(editingId, data);
      setIsEditModalOpen(false);
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await deleteProject(id);
        fetchData();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const openEditModal = (p) => {
    setEditingId(p._id);
    setFormData({
      title: p.title || "",
      description: p.description || "",
      technologyStack: p.technologyStack ? p.technologyStack.join(", ") : "",
      student: p.student?._id || "",
      developer: p.developer?._id || "",
      status: p.status || "Requirements Verified",
      price: p.price || 0
    });
    setIsEditModalOpen(true);
  };

  if (loading) return <div className="text-center p-10">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Project Management</h2>
        <button 
          onClick={() => {
            setFormData({ title: "", description: "", technologyStack: "", student: "", developer: "", status: "Requirements Verified", price: 0 });
            setIsAddModalOpen(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-blue-500"
        >
          <Plus className="w-4 h-4" /> Add Project
        </button>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
                <th className="p-4 font-semibold text-sm text-slate-600 dark:text-slate-300">Title</th>
                <th className="p-4 font-semibold text-sm text-slate-600 dark:text-slate-300">Student</th>
                <th className="p-4 font-semibold text-sm text-slate-600 dark:text-slate-300">Status</th>
                <th className="p-4 font-semibold text-sm text-slate-600 dark:text-slate-300">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {projects.map((p) => (
                <tr key={p._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-4 text-sm font-medium text-slate-900 dark:text-white">{p.title}</td>
                  <td className="p-4 text-sm text-slate-600 dark:text-slate-400">{p.student?.fullName || "Unassigned"}</td>
                  <td className="p-4 text-sm text-slate-600 dark:text-slate-400">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-700">{p.status}</span>
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
            <h3 className="text-xl font-bold mb-4">{isEditModalOpen ? "Edit Project" : "Add Project"}</h3>
            <form onSubmit={isEditModalOpen ? handleUpdate : handleCreate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full p-2 border rounded dark:bg-slate-800 dark:border-slate-700" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full p-2 border rounded dark:bg-slate-800 dark:border-slate-700" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Tech Stack (comma separated)</label>
                <input value={formData.technologyStack} onChange={e => setFormData({...formData, technologyStack: e.target.value})} className="w-full p-2 border rounded dark:bg-slate-800 dark:border-slate-700" />
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
              <div>
                <label className="block text-sm font-medium mb-1">Developer</label>
                <select value={formData.developer} onChange={e => setFormData({...formData, developer: e.target.value})} className="w-full p-2 border rounded dark:bg-slate-800 dark:border-slate-700">
                  <option value="">Select Developer (Optional)</option>
                  {users.filter(u => u.role === "developer").map(u => (
                    <option key={u._id} value={u._id}>{u.fullName}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full p-2 border rounded dark:bg-slate-800 dark:border-slate-700">
                  <option value="Requirements Verified">Requirements Verified</option>
                  <option value="Development Started">Development Started</option>
                  <option value="Testing">Testing</option>
                  <option value="Documentation">Documentation</option>
                  <option value="Completed">Completed</option>
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
