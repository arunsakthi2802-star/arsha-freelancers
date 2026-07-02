import React, { useState, useEffect } from "react";
import { Search, Plus, Trash2, FolderOpen, Loader2, Link2, X, Pencil, Check, Settings } from "lucide-react";
import { getAllProjects, createProject, updateProject, deleteProject } from "../../api/projects.api";
import { getUsers, uploadResourceFile } from "../../api/admin.api";

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  
  // Create/Edit Modal State
  const [projectModal, setProjectModal] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    student: "",
    projectType: "academic",
    title: "",
    description: "",
    technology: "",
    status: "Order Confirmed",
    deadline: "",
    priority: "medium",
    completionPercentage: 0
  });
  const [saving, setSaving] = useState(false);

  // Resources Modal State
  const [resourceModal, setResourceModal] = useState(null);
  const [driveLink, setDriveLink] = useState("");
  const [resources, setResources] = useState([]);
  const [newResource, setNewResource] = useState({ title: "", url: "", fileType: "drive", isUnlocked: true });
  const [resourceLoading, setResourceLoading] = useState(false);
  
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingResource, setEditingResource] = useState({ title: "", url: "", fileType: "drive", isUnlocked: true });
  const [uploadingFileIdx, setUploadingFileIdx] = useState(null);

  useEffect(() => {
    loadProjects();
    loadStudents();
  }, []);

  const loadProjects = async () => {
    setLoading(true);
    try {
      const res = await getAllProjects();
      if (res.success) {
        setProjects(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadStudents = async () => {
    try {
      const res = await getUsers({ limit: 1000 });
      if (res.success) {
        setStudents(res.data.filter(u => u.role === "user" || u.role === "student"));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const isValidUrl = (str) => {
    if (!str) return false;
    try {
      const url = new URL(str);
      return url.protocol === "http:" || url.protocol === "https:";
    } catch {
      return false;
    }
  };

  // --- Project Create / Update Logic ---
  const openCreateModal = () => {
    setIsEditing(false);
    setFormData({
      student: "",
      projectType: "academic",
      title: "",
      description: "",
      technology: "",
      status: "Order Confirmed",
      deadline: "",
      priority: "medium",
      completionPercentage: 0
    });
    setProjectModal(true);
  };

  const openEditModal = (p) => {
    setIsEditing(true);
    setFormData({
      student: p.student?._id || p.student,
      projectType: p.projectType || "academic",
      title: p.title || "",
      description: p.description || "",
      technology: Array.isArray(p.technology) ? p.technology.join(", ") : p.technology,
      status: p.status || "Order Confirmed",
      deadline: p.deadline ? new Date(p.deadline).toISOString().split('T')[0] : "",
      priority: p.priority || "medium",
      completionPercentage: p.completionPercentage || 0
    });
    setProjectModal(p);
  };

  const handleSaveProject = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...formData,
        technology: formData.technology.split(",").map(t => t.trim()).filter(Boolean)
      };

      if (isEditing) {
        await updateProject(projectModal._id, payload);
      } else {
        await createProject(payload);
      }
      setProjectModal(null);
      loadProjects();
    } catch (err) {
      alert(err.message || "Failed to save project.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      await deleteProject(id);
      loadProjects();
    } catch (err) {
      alert(err.message || "Failed to delete project.");
    }
  };

  // --- Resources Logic ---
  const openResourceModal = (p) => {
    setResourceModal(p);
    setDriveLink(p.mainDriveLink || "");
    setResources(p.files || []);
    setEditingIndex(null);
  };

  const handleFileUpload = async (e, targetIdx) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingFileIdx(targetIdx);
    try {
      const res = await uploadResourceFile(file);
      if (res.success) {
        if (targetIdx === "new") {
          setNewResource(p => ({ ...p, url: res.url }));
        } else {
          setEditingResource(p => ({ ...p, url: res.url }));
        }
      } else {
        alert(res.message || "Failed to upload file.");
      }
    } catch (err) {
      alert(err.message || "Failed to upload file.");
    } finally {
      setUploadingFileIdx(null);
    }
  };

  const addResourceItem = () => {
    if (!newResource.title.trim() || !newResource.url.trim()) {
      return alert("Resource title and URL are required.");
    }
    if (!isValidUrl(newResource.url)) {
      return alert("Download URL must be a valid link starting with http:// or https://");
    }
    setResources((prev) => [...prev, { ...newResource }]);
    setNewResource({ title: "", url: "", fileType: "drive", isUnlocked: true });
  };

  const removeResourceItem = (idx) => {
    if (editingIndex === idx) setEditingIndex(null);
    setResources((prev) => prev.filter((_, i) => i !== idx));
  };

  const startEditing = (idx, item) => {
    setEditingIndex(idx);
    setEditingResource({ ...item });
  };

  const saveEditing = (idx) => {
    if (!editingResource.title.trim() || !editingResource.url.trim()) {
      return alert("Resource title and URL are required.");
    }
    if (!isValidUrl(editingResource.url)) {
      return alert("Download URL must be a valid link starting with http:// or https://");
    }
    setResources((prev) =>
      prev.map((item, i) => (i === idx ? { ...editingResource } : item))
    );
    setEditingIndex(null);
  };

  const cancelEditing = () => {
    setEditingIndex(null);
  };

  const toggleResourceUnlock = (idx) => {
    setResources((prev) =>
      prev.map((item, i) => (i === idx ? { ...item, isUnlocked: !item.isUnlocked } : item))
    );
  };

  const handleResourceSubmit = async (e) => {
    e.preventDefault();
    if (driveLink && !isValidUrl(driveLink)) {
      return alert("Main Google Drive Link must be a valid URL.");
    }
    setResourceLoading(true);
    try {
      const payload = {
        mainDriveLink: driveLink,
        files: resources
      };
      
      const res = await updateProject(resourceModal._id, payload);
      if (res.success) {
        alert("Shared resources updated successfully!");
        setResourceModal(null);
        loadProjects();
      }
    } catch (err) {
      alert(err.message || "Failed to update resources.");
    } finally {
      setResourceLoading(false);
    }
  };

  const filteredProjects = projects.filter(p => 
    p.title?.toLowerCase().includes(search.toLowerCase()) ||
    p.student?.fullName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 h-full flex flex-col">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-black text-slate-950 dark:text-white">Projects Management</h2>
          <p className="text-xs text-slate-400">{filteredProjects.length} total projects</p>
        </div>
        <div className="flex gap-2">
          <button onClick={openCreateModal} className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-black rounded-xl border-2 border-slate-950 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] cursor-pointer">
            <Plus className="w-4 h-4" /> Create Project
          </button>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
        <input 
          type="text" 
          placeholder="Search by project title or client name..." 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
          className="w-full pl-9 pr-3 py-2.5 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none focus:border-blue-500" 
        />
      </div>

      <div className="bg-white dark:bg-slate-900 border-2 border-slate-950 dark:border-slate-700 rounded-2xl overflow-hidden shadow-[3px_3px_0px_0px_rgba(37,99,235,0.4)] flex-1 overflow-y-auto">
        {loading ? (
          <div className="flex justify-center py-16"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-16 text-slate-400 text-sm">No projects found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b-2 border-slate-100 dark:border-slate-800">
                  <th className="text-left px-4 py-3 font-black text-slate-400 uppercase text-[10px]">Project</th>
                  <th className="text-left px-4 py-3 font-black text-slate-400 uppercase text-[10px]">Client</th>
                  <th className="text-left px-4 py-3 font-black text-slate-400 uppercase text-[10px]">Status</th>
                  <th className="text-left px-4 py-3 font-black text-slate-400 uppercase text-[10px]">Progress</th>
                  <th className="text-left px-4 py-3 font-black text-slate-400 uppercase text-[10px]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.map((p) => (
                  <tr key={p._id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="px-4 py-3">
                      <p className="font-bold text-slate-950 dark:text-white">{p.title}</p>
                      <p className="text-[10px] text-slate-500 uppercase">{p.projectType}</p>
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                      {p.student?.fullName || "—"}
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 rounded bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400 font-bold text-[10px]">{p.status}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 max-w-[80px]">
                        <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${p.completionPercentage || 0}%` }}></div>
                      </div>
                      <p className="text-[9px] mt-1 text-slate-500">{p.completionPercentage || 0}%</p>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <button onClick={() => openResourceModal(p)} title="Manage Resources & Assets" className="p-1.5 bg-teal-100 text-teal-600 rounded-lg hover:bg-teal-200 cursor-pointer">
                          <FolderOpen className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => openEditModal(p)} title="Edit Project Settings" className="p-1.5 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 cursor-pointer">
                          <Settings className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => handleDelete(p._id)} title="Delete Project" className="p-1.5 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 cursor-pointer">
                          <Trash2 className="w-3.5 h-3.5" />
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

      {/* Create / Edit Project Modal */}
      {projectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 border-2 border-slate-950 rounded-2xl p-6 w-full max-w-lg shadow-[5px_5px_0px_0px_rgba(37,99,235,0.8)] my-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-black text-slate-950 dark:text-white">{isEditing ? "Edit Project Details" : "Create New Project"}</h3>
              <button type="button" onClick={() => setProjectModal(null)} className="text-slate-400 hover:text-slate-950"><X className="w-5 h-5" /></button>
            </div>
            
            <form onSubmit={handleSaveProject} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-400">Client / Student *</label>
                  <select 
                    required 
                    value={formData.student} 
                    onChange={(e) => setFormData(p => ({...p, student: e.target.value}))}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none"
                  >
                    <option value="">Select a student...</option>
                    {students.map(s => <option key={s._id} value={s._id}>{s.fullName} ({s.email})</option>)}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-400">Project Type *</label>
                  <select 
                    required 
                    value={formData.projectType} 
                    onChange={(e) => setFormData(p => ({...p, projectType: e.target.value}))}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none"
                  >
                    <option value="academic">Academic</option>
                    <option value="custom">Custom</option>
                    <option value="internship">Internship</option>
                    <option value="mini">Mini Project</option>
                  </select>
                </div>
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-[10px] font-black uppercase text-slate-400">Project Title *</label>
                  <input 
                    type="text" 
                    required 
                    value={formData.title} 
                    onChange={(e) => setFormData(p => ({...p, title: e.target.value}))}
                    placeholder="E.g. Smart Parking System"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none"
                  />
                </div>
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-[10px] font-black uppercase text-slate-400">Technology (Comma separated)</label>
                  <input 
                    type="text" 
                    value={formData.technology} 
                    onChange={(e) => setFormData(p => ({...p, technology: e.target.value}))}
                    placeholder="React, Node.js, MongoDB"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-400">Status</label>
                  <select 
                    value={formData.status} 
                    onChange={(e) => setFormData(p => ({...p, status: e.target.value}))}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none"
                  >
                    <option value="Order Confirmed">Order Confirmed</option>
                    <option value="Requirements Verified">Requirements Verified</option>
                    <option value="Development Started">Development Started</option>
                    <option value="Testing">Testing</option>
                    <option value="Documentation">Documentation</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-400">Completion %</label>
                  <input 
                    type="number" 
                    min={0} 
                    max={100}
                    value={formData.completionPercentage} 
                    onChange={(e) => setFormData(p => ({...p, completionPercentage: Number(e.target.value)}))}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-400">Deadline *</label>
                  <input 
                    type="date" 
                    required 
                    value={formData.deadline} 
                    onChange={(e) => setFormData(p => ({...p, deadline: e.target.value}))}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-400">Priority</label>
                  <select 
                    value={formData.priority} 
                    onChange={(e) => setFormData(p => ({...p, priority: e.target.value}))}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <button type="submit" disabled={saving} className="px-4 py-2.5 bg-blue-600 text-white text-xs font-black rounded-xl border-2 border-slate-950 cursor-pointer disabled:opacity-50 flex items-center gap-1.5">
                  {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />} Save Project
                </button>
                <button type="button" onClick={() => setProjectModal(null)} className="px-4 py-2.5 bg-slate-100 text-slate-600 text-xs font-black rounded-xl border-2 border-slate-200 cursor-pointer">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Project Resources Modal */}
      {resourceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 border-2 border-slate-950 rounded-2xl p-6 w-full max-w-2xl shadow-[5px_5px_0px_0px_rgba(20,184,166,0.8)] my-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-black text-slate-950 dark:text-white">Manage Project Resources & Assets</h3>
              <button onClick={() => setResourceModal(null)} className="text-slate-400 hover:text-slate-950"><X className="w-5 h-5" /></button>
            </div>
            
            <p className="text-xs text-slate-400 mb-4">Client: <span className="font-bold text-slate-600 dark:text-slate-300">{resourceModal.student?.fullName || "Unknown"}</span></p>
            
            <form onSubmit={handleResourceSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-400">Project Title</label>
                  <input
                    type="text"
                    value={resourceModal.title || ""}
                    disabled
                    className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none cursor-not-allowed"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-400">Main Google Drive Link</label>
                  <div className="relative">
                    <Link2 className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <input
                      type="url"
                      value={driveLink}
                      onChange={(e) => setDriveLink(e.target.value)}
                      placeholder="https://drive.google.com/drive/..."
                      className="w-full pl-8 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Add Custom Resource Asset Section */}
              <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-4 space-y-3">
                <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">Add Custom Resource (PDF, ZIP, Image, Doc)</h4>
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                  <div className="sm:col-span-4 space-y-0.5">
                    <input
                      type="text"
                      value={newResource.title}
                      onChange={(e) => setNewResource((p) => ({ ...p, title: e.target.value }))}
                      placeholder="Resource Title (e.g. IEEE Report)"
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none"
                    />
                  </div>
                  <div className="sm:col-span-4 space-y-0.5">
                    <input
                      type="url"
                      value={newResource.url}
                      onChange={(e) => setNewResource((p) => ({ ...p, url: e.target.value }))}
                      placeholder="Download URL (Drive, Dropbox, etc.)"
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none"
                    />
                  </div>
                  <div className="sm:col-span-2 space-y-0.5">
                    <select
                      value={newResource.fileType}
                      onChange={(e) => setNewResource((p) => ({ ...p, fileType: e.target.value }))}
                      className="w-full px-2.5 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none cursor-pointer"
                    >
                      <option value="drive">Drive</option>
                      <option value="pdf">PDF Doc</option>
                      <option value="zip">ZIP File</option>
                      <option value="image">Image</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2 flex items-center justify-center gap-1 bg-slate-50 dark:bg-slate-800 px-2 rounded-xl border border-slate-200 dark:border-slate-700">
                    <input
                      type="checkbox"
                      id="resource-unlocked-cb-proj"
                      checked={newResource.isUnlocked}
                      onChange={(e) => setNewResource((p) => ({ ...p, isUnlocked: e.target.checked }))}
                      className="w-3.5 h-3.5 cursor-pointer"
                    />
                    <label htmlFor="resource-unlocked-cb-proj" className="text-[10px] font-black uppercase text-slate-500 cursor-pointer">Unlocked</label>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mt-1 bg-slate-50 dark:bg-slate-800 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] font-black uppercase text-slate-400">Or Upload local file:</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="file"
                      onChange={(e) => handleFileUpload(e, "new")}
                      className="text-xs text-slate-500 file:mr-3 file:py-1 file:px-2.5 file:rounded-md file:border-0 file:text-[10px] file:font-black file:bg-slate-250 dark:file:bg-slate-700 file:text-slate-700 dark:file:text-slate-250 file:cursor-pointer"
                      disabled={uploadingFileIdx === "new"}
                    />
                    {uploadingFileIdx === "new" && (
                      <div className="flex items-center gap-1 text-[10px] text-blue-600 font-black">
                        <Loader2 className="w-3.5 h-3.5 animate-spin" /> Uploading...
                      </div>
                    )}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={addResourceItem}
                  className="px-3.5 py-1.5 bg-slate-900 text-white text-xs font-black rounded-lg border-2 border-slate-950 shadow-[1px_1px_0px_0px_rgba(15,23,42,1)] hover:translate-y-[-1px] transition-all cursor-pointer"
                >
                  + Add Asset
                </button>
              </div>

              {/* Resource Asset List */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400">Current Shared Assets ({resources.length})</label>
                {resources.length === 0 ? (
                  <p className="text-center py-4 bg-slate-50 dark:bg-slate-800 rounded-xl text-[11px] text-slate-400 font-medium">No custom assets shared yet. Use form above to add report PDFs, code ZIPs, etc.</p>
                ) : (
                  <div className="max-h-56 overflow-y-auto space-y-2 border border-slate-100 dark:border-slate-800 rounded-xl p-2 bg-slate-50/50 dark:bg-slate-800/20">
                    {resources.map((item, idx) => {
                      const isEditing = editingIndex === idx;
                      return (
                        <div key={idx} className="p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs">
                          {isEditing ? (
                            <div className="space-y-2.5">
                              <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                                <div className="sm:col-span-5">
                                  <input
                                    type="text"
                                    value={editingResource.title}
                                    onChange={(e) => setEditingResource(p => ({ ...p, title: e.target.value }))}
                                    placeholder="Title"
                                    className="w-full px-2 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs"
                                  />
                                </div>
                                <div className="sm:col-span-5">
                                  <input
                                    type="url"
                                    value={editingResource.url}
                                    onChange={(e) => setEditingResource(p => ({ ...p, url: e.target.value }))}
                                    placeholder="URL"
                                    className="w-full px-2 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs"
                                  />
                                </div>
                                <div className="sm:col-span-2">
                                  <select
                                    value={editingResource.fileType}
                                    onChange={(e) => setEditingResource(p => ({ ...p, fileType: e.target.value }))}
                                    className="w-full px-1 py-1.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs cursor-pointer"
                                  >
                                    <option value="drive">Drive</option>
                                    <option value="pdf">PDF</option>
                                    <option value="zip">ZIP</option>
                                    <option value="image">Image</option>
                                  </select>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 mt-1 bg-slate-50 dark:bg-slate-800 p-1.5 rounded-lg border border-slate-250 dark:border-slate-700">
                                <span className="text-[10px] font-black text-slate-400">Or Upload local file:</span>
                                <input
                                  type="file"
                                  onChange={(e) => handleFileUpload(e, idx)}
                                  className="text-[10px] text-slate-500 file:mr-2 file:py-0.5 file:px-2 file:rounded file:border-0 file:text-[9px] file:font-black file:bg-slate-200 dark:file:bg-slate-700 file:text-slate-700 dark:file:text-slate-200 file:cursor-pointer"
                                  disabled={uploadingFileIdx === idx}
                                />
                                {uploadingFileIdx === idx && (
                                  <div className="flex items-center gap-1 text-[9px] text-blue-600 font-black">
                                    <Loader2 className="w-3 h-3 animate-spin" /> Uploading...
                                  </div>
                                )}
                              </div>
                              <div className="flex justify-between items-center pt-1">
                                <div className="flex items-center gap-1">
                                  <input
                                    type="checkbox"
                                    id={`editing-unlocked-proj-${idx}`}
                                    checked={editingResource.isUnlocked}
                                    onChange={(e) => setEditingResource(p => ({ ...p, isUnlocked: e.target.checked }))}
                                    className="w-3.5 h-3.5 cursor-pointer"
                                  />
                                  <label htmlFor={`editing-unlocked-proj-${idx}`} className="text-[10px] font-black uppercase text-slate-500 cursor-pointer">Unlocked</label>
                                </div>
                                <div className="flex gap-1.5">
                                  <button
                                    type="button"
                                    onClick={() => saveEditing(idx)}
                                    className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-black rounded-lg border border-slate-950 cursor-pointer flex items-center gap-1"
                                  >
                                    <Check className="w-3 h-3" /> Save
                                  </button>
                                  <button
                                    type="button"
                                    onClick={cancelEditing}
                                    className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 text-[10px] font-black rounded-lg border border-slate-200 cursor-pointer"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center justify-between gap-3">
                              <div className="flex items-center gap-2 min-w-0">
                                <span className="text-[10px] font-black uppercase px-2 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-slate-500">{item.fileType}</span>
                                <div className="min-w-0">
                                  <p className="font-bold text-slate-900 dark:text-slate-200 truncate">{item.title}</p>
                                  <p className="text-[10px] text-slate-400 truncate max-w-[200px]">{item.url}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() => toggleResourceUnlock(idx)}
                                  className={`px-2 py-1 rounded text-[10px] font-black border transition-colors cursor-pointer ${
                                    item.isUnlocked 
                                      ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
                                      : "bg-red-50 text-red-700 border-red-200"
                                  }`}
                                >
                                  {item.isUnlocked ? "Unlocked 🔓" : "Locked 🔒"}
                                </button>
                                <button
                                  type="button"
                                  onClick={() => startEditing(idx, item)}
                                  className="p-1 bg-blue-100 hover:bg-blue-200 text-blue-600 rounded-lg cursor-pointer"
                                  title="Edit Resource Details"
                                >
                                  <Pencil className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => removeResourceItem(idx)}
                                  className="p-1 bg-red-100 hover:bg-red-200 text-red-600 rounded-lg cursor-pointer"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="flex gap-2 pt-2">
                <button type="submit" disabled={resourceLoading} className="px-4 py-2.5 bg-teal-600 text-white text-xs font-black rounded-xl border-2 border-slate-950 cursor-pointer disabled:opacity-50 flex items-center gap-1.5">
                  {resourceLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <FolderOpen className="w-3.5 h-3.5" />} Save Shared Resources
                </button>
                <button type="button" onClick={() => setResourceModal(null)} className="px-4 py-2.5 bg-slate-100 text-slate-600 text-xs font-black rounded-xl border-2 border-slate-200 cursor-pointer">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
