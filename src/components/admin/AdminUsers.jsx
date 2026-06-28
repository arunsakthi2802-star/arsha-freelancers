import React, { useState, useEffect } from "react";
import { Search, Trash2, Ban, UserCheck, Shield, User, Loader2, RefreshCw, Key, FolderOpen, Link2, Plus, X, Pencil, Check } from "lucide-react";
import { getUsers, deleteUser, blockUser, changeUserRole, resetUserPassword, updateUser, createUser, uploadResourceFile } from "../../api/admin.api";
import { useAuth } from "../../context/AuthContext";

export default function AdminUsers() {
  const { user: me } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [actionLoading, setActionLoading] = useState("");
  const [resetModal, setResetModal] = useState(null);
  const [newPw, setNewPw] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const [toast, setToast] = useState(null);

  // Role Change Modal
  const [roleModal, setRoleModal] = useState(null);
  const [selectedRole, setSelectedRole] = useState("user");
  const [adminPass, setAdminPass] = useState("");
  const [roleLoading, setRoleLoading] = useState(false);

  const triggerToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 5000);
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

  // Project Resources Modal State
  const [resourceModal, setResourceModal] = useState(null);
  const [projectTitle, setProjectTitle] = useState("");
  const [driveLink, setDriveLink] = useState("");
  const [resources, setResources] = useState([]);
  const [newResource, setNewResource] = useState({ title: "", url: "", fileType: "drive", isUnlocked: true });
  const [resourceLoading, setResourceLoading] = useState(false);
  
  // Inline Resource Edit State
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingResource, setEditingResource] = useState({ title: "", url: "", fileType: "drive", isUnlocked: true });
  const [uploadingFileIdx, setUploadingFileIdx] = useState(null);

  const handleFileUpload = async (e, targetIdx) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingFileIdx(targetIdx);
    try {
      const res = await uploadResourceFile(file);
      if (res.success) {
        if (targetIdx === "new") {
          setNewResource(p => ({ ...p, url: res.url }));
          triggerToast("File uploaded to Cloudinary successfully! Link populated.");
        } else {
          setEditingResource(p => ({ ...p, url: res.url }));
          triggerToast("File uploaded to Cloudinary successfully! Link updated.");
        }
      } else {
        triggerToast(res.message || "Failed to upload file.", "error");
      }
    } catch (err) {
      triggerToast(err.message || "Failed to upload file to Cloudinary.", "error");
    } finally {
      setUploadingFileIdx(null);
    }
  };

  const openResourceModal = (u) => {
    setResourceModal(u);
    setProjectTitle(u.projectTitle || "");
    setDriveLink(u.driveLink || "");
    setResources(u.resources || []);
    setEditingIndex(null);
  };

  const addResourceItem = () => {
    if (!newResource.title.trim() || !newResource.url.trim()) {
      return triggerToast("Resource title and URL are required.", "error");
    }
    if (!isValidUrl(newResource.url)) {
      return triggerToast("Download URL must be a valid link starting with http:// or https://", "error");
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
      return triggerToast("Resource title and URL are required.", "error");
    }
    if (!isValidUrl(editingResource.url)) {
      return triggerToast("Download URL must be a valid link starting with http:// or https://", "error");
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

  // Add User State
  const [showAddForm, setShowAddForm] = useState(false);
  const [addUserLoading, setAddUserLoading] = useState(false);
  const [newUser, setNewUser] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    college: "",
    department: "",
    role: "user"
  });

  const load = async () => {
    setLoading(true);
    try {
      const params = { page, limit: 15 };
      if (search) params.search = search;
      const res = await getUsers(params);
      if (res.success) { setUsers(res.data); setTotal(res.total); }
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  useEffect(() => { const t = setTimeout(load, 300); return () => clearTimeout(t); }, [search, page]);

  const handle = async (id, action) => {
    try {
      if (action === "delete") { if (!confirm("Delete this user?")) return; setActionLoading(id + action); await deleteUser(id); }
      if (action === "block") { setActionLoading(id + action); await blockUser(id); }
      load();
    } catch (err) { alert(err.message); } finally { setActionLoading(""); }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setResetLoading(true);
    try {
      await resetUserPassword(resetModal._id, newPw);
      triggerToast("Password reset successfully.");
      setResetModal(null);
      setNewPw("");
    } catch (err) { alert(err.message); } finally { setResetLoading(false); }
  };

  const handleRoleSubmit = async (e) => {
    e.preventDefault();
    if ((selectedRole === "admin" || selectedRole === "manager") && !adminPass) {
      return triggerToast("Admin password is required to grant this role.", "error");
    }
    setRoleLoading(true);
    try {
      await changeUserRole(roleModal._id, selectedRole, adminPass);
      triggerToast(`User role updated to ${selectedRole}.`);
      setRoleModal(null);
      setAdminPass("");
      load();
    } catch (err) {
      triggerToast(err.message || "Failed to update role.", "error");
    } finally {
      setRoleLoading(false);
    }
  };

  const handleResourceSubmit = async (e) => {
    e.preventDefault();
    if (driveLink && !isValidUrl(driveLink)) {
      return triggerToast("Main Google Drive Link must be a valid URL starting with http:// or https://", "error");
    }
    for (const item of resources) {
      if (!isValidUrl(item.url)) {
        return triggerToast(`Resource link for "${item.title}" must be a valid URL.`, "error");
      }
    }
    setResourceLoading(true);
    try {
      const fd = new FormData();
      fd.append("projectTitle", projectTitle);
      fd.append("driveLink", driveLink);
      fd.append("resources", JSON.stringify(resources));
      
      const res = await updateUser(resourceModal._id, fd);
      if (res.success) {
        const formattedDate = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
        triggerToast(`Shared resources uploaded & saved to MongoDB database at ${formattedDate}!`);
        setResourceModal(null);
        load();
      }
    } catch (err) {
      triggerToast(err.message || "Failed to update resources.", "error");
    } finally {
      setResourceLoading(false);
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setAddUserLoading(true);
    try {
      const res = await createUser(newUser);
      if (res.success) {
        alert("User created successfully!");
        setShowAddForm(false);
        setNewUser({
          fullName: "",
          email: "",
          phone: "",
          password: "",
          college: "",
          department: "",
          role: "user"
        });
        load();
      }
    } catch (err) {
      alert(err.message || "Failed to create user.");
    } finally {
      setAddUserLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Neo-brutalist toast notifications */}
      {toast && (
        <div className={`fixed top-5 right-5 z-[9999] text-white border-2 border-slate-950 font-black text-xs px-4 py-3.5 rounded-xl shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] flex items-center gap-2 animate-bounce ${
          toast.type === "error" ? "bg-red-500" : "bg-emerald-500"
        }`} id="admin-toast-notification">
          {toast.type === "error" ? <X className="w-4 h-4 flex-shrink-0" /> : <Check className="w-4 h-4 flex-shrink-0" />}
          <span>{toast.message}</span>
        </div>
      )}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-black text-slate-950 dark:text-white">User Management</h2>
          <p className="text-xs text-slate-400">{total} total users</p>
        </div>
        <div className="flex gap-2">
          <button onClick={load} className="p-2.5 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl text-slate-500 cursor-pointer self-start sm:self-auto"><RefreshCw className="w-4 h-4" /></button>
          <button onClick={() => setShowAddForm(true)} className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-black rounded-xl border-2 border-slate-950 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] cursor-pointer" id="admin-create-user-btn">
            <Plus className="w-4 h-4" /> Add User
          </button>
        </div>
      </div>

      {/* Reset Password Modal */}
      {resetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-white dark:bg-slate-900 border-2 border-slate-950 rounded-2xl p-6 w-full max-w-sm shadow-[4px_4px_0px_0px_rgba(37,99,235,0.8)]">
            <h3 className="text-sm font-black text-slate-950 dark:text-white mb-1">Reset Password</h3>
            <p className="text-xs text-slate-400 mb-4">For: <span className="font-bold text-slate-600 dark:text-slate-300">{resetModal.fullName}</span></p>
            <form onSubmit={handleReset} className="space-y-3">
              <input type="password" value={newPw} onChange={(e) => setNewPw(e.target.value)} placeholder="New password (min 6 chars)" minLength={6} required className="w-full px-3 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-white focus:outline-none" />
              <div className="flex gap-2">
                <button type="submit" disabled={resetLoading} className="px-4 py-2 bg-blue-600 text-white text-xs font-black rounded-xl border-2 border-slate-950 cursor-pointer disabled:opacity-50 flex items-center gap-1.5">
                  {resetLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Key className="w-3.5 h-3.5" />} Reset
                </button>
                <button type="button" onClick={() => { setResetModal(null); setNewPw(""); }} className="px-4 py-2 bg-slate-100 text-slate-600 text-xs font-black rounded-xl border-2 border-slate-200 cursor-pointer">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Change Role Modal */}
      {roleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-white dark:bg-slate-900 border-2 border-slate-950 rounded-2xl p-6 w-full max-w-sm shadow-[4px_4px_0px_0px_rgba(234,179,8,0.8)]">
            <h3 className="text-sm font-black text-slate-950 dark:text-white mb-1">Change User Role</h3>
            <p className="text-xs text-slate-400 mb-4">For: <span className="font-bold text-slate-600 dark:text-slate-300">{roleModal.fullName}</span></p>
            <form onSubmit={handleRoleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400">Select Role</label>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none cursor-pointer"
                >
                  <option value="user">Student / User</option>
                  <option value="manager">Manager</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              {(selectedRole === "admin" || selectedRole === "manager") && (
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-400">Your Admin Password *</label>
                  <input 
                    type="password" 
                    value={adminPass} 
                    onChange={(e) => setAdminPass(e.target.value)} 
                    placeholder="Enter to confirm" 
                    required 
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none" 
                  />
                  <p className="text-[9px] text-slate-500">Required to grant elevated privileges.</p>
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <button type="submit" disabled={roleLoading} className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-white text-xs font-black rounded-xl border-2 border-slate-950 cursor-pointer disabled:opacity-50 flex items-center gap-1.5">
                  {roleLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Shield className="w-3.5 h-3.5" />} Update Role
                </button>
                <button type="button" onClick={() => { setRoleModal(null); setAdminPass(""); }} className="px-4 py-2 bg-slate-100 text-slate-600 text-xs font-black rounded-xl border-2 border-slate-200 cursor-pointer">Cancel</button>
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
            
            <p className="text-xs text-slate-400 mb-4">Client: <span className="font-bold text-slate-600 dark:text-slate-300">{resourceModal.fullName}</span></p>
            
            <form onSubmit={handleResourceSubmit} className="space-y-5">
              {/* Main project title and main drive */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-400">Project Title</label>
                  <input
                    type="text"
                    value={projectTitle}
                    onChange={(e) => setProjectTitle(e.target.value)}
                    placeholder="e.g. AI-Powered Smart Parking System"
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none"
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
                      id="resource-unlocked-cb"
                      checked={newResource.isUnlocked}
                      onChange={(e) => setNewResource((p) => ({ ...p, isUnlocked: e.target.checked }))}
                      className="w-3.5 h-3.5 cursor-pointer"
                    />
                    <label htmlFor="resource-unlocked-cb" className="text-[10px] font-black uppercase text-slate-500 cursor-pointer">Unlocked</label>
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
                        <Loader2 className="w-3.5 h-3.5 animate-spin" /> Uploading to Cloudinary...
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
                            /* Inline Edit Form */
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
                                    id={`editing-unlocked-${idx}`}
                                    checked={editingResource.isUnlocked}
                                    onChange={(e) => setEditingResource(p => ({ ...p, isUnlocked: e.target.checked }))}
                                    className="w-3.5 h-3.5 cursor-pointer"
                                  />
                                  <label htmlFor={`editing-unlocked-${idx}`} className="text-[10px] font-black uppercase text-slate-500 cursor-pointer">Unlocked</label>
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
                            /* Regular Row Details View */
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

              {/* Modal footer actions */}
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

      {/* Add User Modal */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-white dark:bg-slate-900 border-2 border-slate-950 rounded-2xl p-6 w-full max-w-lg shadow-[5px_5px_0px_0px_rgba(37,99,235,0.8)]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-black text-slate-950 dark:text-white">Create New User</h3>
              <button onClick={() => setShowAddForm(false)} className="text-slate-400 hover:text-slate-950 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateUser} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400">Full Name *</label>
                <input
                  type="text"
                  required
                  value={newUser.fullName}
                  onChange={(e) => setNewUser(p => ({ ...p, fullName: e.target.value }))}
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400">Email Address *</label>
                <input
                  type="email"
                  required
                  value={newUser.email}
                  onChange={(e) => setNewUser(p => ({ ...p, email: e.target.value }))}
                  placeholder="ramesh@gmail.com"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400">Phone Number</label>
                <input
                  type="text"
                  value={newUser.phone}
                  onChange={(e) => setNewUser(p => ({ ...p, phone: e.target.value }))}
                  placeholder="9876543210"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400">Password *</label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={newUser.password}
                  onChange={(e) => setNewUser(p => ({ ...p, password: e.target.value }))}
                  placeholder="••••••"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400">College</label>
                <input
                  type="text"
                  value={newUser.college}
                  onChange={(e) => setNewUser(p => ({ ...p, college: e.target.value }))}
                  placeholder="College Name"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400">Department</label>
                <input
                  type="text"
                  value={newUser.department}
                  onChange={(e) => setNewUser(p => ({ ...p, department: e.target.value }))}
                  placeholder="e.g. CSE / ECE"
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400">Role</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser(p => ({ ...p, role: e.target.value }))}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none cursor-pointer"
                >
                  <option value="user">Student / User</option>
                  <option value="manager">Manager</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="sm:col-span-2 flex gap-2 pt-2">
                <button type="submit" disabled={addUserLoading} className="px-4 py-2 bg-blue-600 text-white text-xs font-black rounded-xl border-2 border-slate-950 cursor-pointer disabled:opacity-50 flex items-center gap-1.5">
                  {addUserLoading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Plus className="w-3.5 h-3.5" />} Create User
                </button>
                <button type="button" onClick={() => setShowAddForm(false)} className="px-4 py-2 bg-slate-100 text-slate-600 text-xs font-black rounded-xl border-2 border-slate-200 cursor-pointer">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
        <input type="text" placeholder="Search by name or email..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} className="w-full pl-9 pr-3 py-2.5 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none focus:border-blue-500" id="users-search" />
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-900 border-2 border-slate-950 dark:border-slate-700 rounded-2xl overflow-hidden shadow-[3px_3px_0px_0px_rgba(37,99,235,0.4)]">
        {loading ? (
          <div className="flex justify-center py-16"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>
        ) : users.length === 0 ? (
          <div className="text-center py-16 text-slate-400 text-sm">No users found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b-2 border-slate-100 dark:border-slate-800">
                  {["User", "Email", "Phone", "Role", "Status", "Joined", "Actions"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 font-black text-slate-400 uppercase text-[10px]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-white text-[10px] font-black flex-shrink-0 ${
                          u.role === "admin" ? "bg-blue-600" : 
                          u.role === "manager" ? "bg-amber-500" : 
                          "bg-slate-400"
                        }`}>
                          {u.fullName?.charAt(0) || "?"}
                        </div>
                        <div>
                          <p className="font-black text-slate-950 dark:text-white">{u.fullName}</p>
                          <p className="text-slate-400">{u.college || "—"}</p>
                          <div className="mt-1 flex flex-wrap gap-1">
                            {u.resources && u.resources.length > 0 ? (
                              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-teal-50 dark:bg-teal-950/30 text-teal-700 dark:text-teal-400 text-[9px] font-black border border-teal-200 dark:border-teal-800">
                                📦 {u.resources.length} asset{u.resources.length > 1 ? "s" : ""} ({u.resources.filter(r => r.isUnlocked).length} open)
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-50 dark:bg-slate-800/50 text-slate-400 dark:text-slate-500 text-[9px] font-black border border-slate-200 dark:border-slate-700">
                                📁 No assets
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400 max-w-[140px] truncate">{u.email}</td>
                    <td className="px-4 py-3 text-slate-500">{u.phone || "—"}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-lg font-black text-[10px] uppercase tracking-wider ${
                        u.role === "admin" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400" : 
                        u.role === "manager" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400" : 
                        "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                      }`}>{u.role}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-lg font-black text-[10px] ${u.status === "active" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}`}>{u.status}</span>
                    </td>
                    <td className="px-4 py-3 text-slate-400">{new Date(u.createdAt).toLocaleDateString("en-IN")}</td>
                    <td className="px-4 py-3">
                      {u._id !== me?._id && (
                        <div className="flex items-center gap-1">
                          <button onClick={() => handle(u._id, u.status === "active" ? "block" : "block")} disabled={!!actionLoading} title={u.status === "active" ? "Block" : "Unblock"} className={`p-1.5 rounded-lg cursor-pointer ${u.status === "active" ? "bg-orange-100 text-orange-600 hover:bg-orange-200" : "bg-emerald-100 text-emerald-600 hover:bg-emerald-200"}`} id={`block-user-${u._id}`}>
                            {actionLoading === u._id + "block" ? <Loader2 className="w-3 h-3 animate-spin" /> : u.status === "active" ? <Ban className="w-3 h-3" /> : <UserCheck className="w-3 h-3" />}
                          </button>
                          <button onClick={() => { setRoleModal(u); setSelectedRole(u.role); }} title="Change Role" className="p-1.5 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 cursor-pointer" id={`role-user-${u._id}`}>
                            {u.role === "admin" ? <Shield className="w-3 h-3" /> : u.role === "manager" ? <UserCheck className="w-3 h-3" /> : <User className="w-3 h-3" />}
                          </button>
                          <button onClick={() => openResourceModal(u)} title="Project Resources" className="p-1.5 bg-teal-100 text-teal-600 rounded-lg hover:bg-teal-200 cursor-pointer" id={`resources-user-${u._id}`}>
                            <FolderOpen className="w-3 h-3" />
                          </button>
                          <button onClick={() => setResetModal(u)} title="Reset Password" className="p-1.5 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 cursor-pointer" id={`reset-user-${u._id}`}>
                            <Key className="w-3 h-3" />
                          </button>
                          <button onClick={() => handle(u._id, "delete")} disabled={!!actionLoading} title="Delete" className="p-1.5 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 cursor-pointer" id={`delete-user-${u._id}`}>
                            {actionLoading === u._id + "delete" ? <Loader2 className="w-3 h-3 animate-spin" /> : <Trash2 className="w-3 h-3" />}
                          </button>
                        </div>
                      )}
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
