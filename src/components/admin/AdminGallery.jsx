import React, { useState, useEffect, useRef } from "react";
import { Upload, Trash2, Search, Loader2, Plus, X, RefreshCw, Image } from "lucide-react";
import { getGallery, uploadGalleryImage, uploadGalleryBulk, deleteGalleryItem, updateGalleryItem } from "../../api/gallery.api";

const CATEGORIES = ["Student Projects", "Workshops", "Events", "Certifications", "Office", "Team"];

export default function AdminGallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [uploadData, setUploadData] = useState({ title: "", category: "Student Projects", description: "" });
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [bulkMode, setBulkMode] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [actionLoading, setActionLoading] = useState("");
  const fileRef = useRef();
  const bulkRef = useRef();

  const loadImages = async () => {
    setLoading(true);
    try {
      const params = { page, limit: 12 };
      if (search) params.search = search;
      if (category) params.category = category;
      const res = await getGallery(params);
      if (res.success) { setImages(res.data); setTotal(res.total); }
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  useEffect(() => {
    const t = setTimeout(loadImages, 300);
    return () => clearTimeout(t);
  }, [search, category, page]);

  const handleSingleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) return alert("Please select an image.");
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("image", selectedFile);
      fd.append("title", uploadData.title);
      fd.append("category", uploadData.category);
      fd.append("description", uploadData.description);
      await uploadGalleryImage(fd);
      setShowUploadForm(false);
      setSelectedFile(null);
      setUploadData({ title: "", category: "Student Projects", description: "" });
      loadImages();
    } catch (err) { alert(err.message); } finally { setUploading(false); }
  };

  const handleBulkUpload = async (e) => {
    e.preventDefault();
    if (!selectedFiles.length) return alert("Please select images.");
    setUploading(true);
    try {
      const fd = new FormData();
      selectedFiles.forEach((f) => fd.append("images", f));
      fd.append("category", uploadData.category);
      await uploadGalleryBulk(fd);
      setShowUploadForm(false);
      setSelectedFiles([]);
      loadImages();
    } catch (err) { alert(err.message); } finally { setUploading(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this image?")) return;
    setActionLoading(id);
    try {
      await deleteGalleryItem(id);
      loadImages();
    } catch (err) { alert(err.message); } finally { setActionLoading(""); }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    setActionLoading(editItem._id);
    try {
      const fd = new FormData();
      fd.append("title", editItem.title);
      fd.append("category", editItem.category);
      fd.append("description", editItem.description || "");
      await updateGalleryItem(editItem._id, fd);
      setEditItem(null);
      loadImages();
    } catch (err) { alert(err.message); } finally { setActionLoading(""); }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-black text-slate-950 dark:text-white">Gallery Management</h2>
          <p className="text-xs text-slate-400">{total} total images</p>
        </div>
        <div className="flex gap-2">
          <button onClick={loadImages} className="p-2.5 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl text-slate-500 hover:text-slate-950 cursor-pointer"><RefreshCw className="w-4 h-4" /></button>
          <button onClick={() => { setShowUploadForm((p) => !p); setBulkMode(false); }} className="flex items-center gap-2 px-4 py-2.5 bg-teal-600 hover:bg-teal-500 text-white text-xs font-black rounded-xl border-2 border-slate-950 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] transition-all cursor-pointer" id="gallery-upload-btn">
            <Upload className="w-4 h-4" /> Upload
          </button>
        </div>
      </div>

      {/* Upload Form */}
      {showUploadForm && (
        <div className="bg-white dark:bg-slate-900 border-2 border-teal-400 rounded-2xl p-5 shadow-[3px_3px_0px_0px_rgba(20,184,166,0.5)]">
          <div className="flex gap-2 mb-4">
            <button onClick={() => setBulkMode(false)} className={`px-3 py-1.5 text-xs font-black rounded-lg cursor-pointer ${!bulkMode ? "bg-teal-600 text-white border-2 border-slate-950" : "bg-slate-100 dark:bg-slate-800 text-slate-600"}`}>Single Upload</button>
            <button onClick={() => setBulkMode(true)} className={`px-3 py-1.5 text-xs font-black rounded-lg cursor-pointer ${bulkMode ? "bg-teal-600 text-white border-2 border-slate-950" : "bg-slate-100 dark:bg-slate-800 text-slate-600"}`}>Bulk Upload</button>
          </div>

          <form onSubmit={bulkMode ? handleBulkUpload : handleSingleUpload} className="space-y-3">
            {!bulkMode && (
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400">Title *</label>
                <input type="text" value={uploadData.title} onChange={(e) => setUploadData((p) => ({ ...p, title: e.target.value }))} placeholder="Image title" required className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none" />
              </div>
            )}
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-400">Category</label>
              <select value={uploadData.category} onChange={(e) => setUploadData((p) => ({ ...p, category: e.target.value }))} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none cursor-pointer">
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div
              onClick={() => (bulkMode ? bulkRef : fileRef).current?.click()}
              className="border-2 border-dashed border-teal-300 dark:border-teal-700 rounded-xl p-8 text-center cursor-pointer hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-colors"
            >
              <Image className="w-8 h-8 text-teal-400 mx-auto mb-2" />
              <p className="text-xs font-bold text-slate-500">
                {bulkMode
                  ? (selectedFiles.length ? `${selectedFiles.length} files selected` : "Click to select multiple images")
                  : (selectedFile ? selectedFile.name : "Click to select an image")}
              </p>
              <p className="text-[10px] text-slate-400 mt-1">JPEG, PNG, WebP, GIF up to 10MB</p>
            </div>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => setSelectedFile(e.target.files[0])} />
            <input ref={bulkRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => setSelectedFiles(Array.from(e.target.files))} />

            <div className="flex gap-2">
              <button type="submit" disabled={uploading} className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white text-xs font-black rounded-xl border-2 border-slate-950 cursor-pointer disabled:opacity-50 flex items-center gap-1.5">
                {uploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />} {bulkMode ? "Upload All" : "Upload"}
              </button>
              <button type="button" onClick={() => setShowUploadForm(false)} className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-600 text-xs font-black rounded-xl border-2 border-slate-200 cursor-pointer">Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <div className="relative flex-1 min-w-[180px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input type="text" placeholder="Search gallery..." value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} className="w-full pl-9 pr-3 py-2.5 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none focus:border-teal-500" id="gallery-search" />
        </div>
        <select value={category} onChange={(e) => { setCategory(e.target.value); setPage(1); }} className="px-3 py-2.5 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none cursor-pointer">
          <option value="">All Categories</option>
          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Edit Modal */}
      {editItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
          <div className="bg-white dark:bg-slate-900 border-2 border-slate-950 rounded-2xl p-6 w-full max-w-md shadow-[6px_6px_0px_0px_rgba(37,99,235,0.8)]">
            <h3 className="text-sm font-black text-slate-950 dark:text-white mb-4">Edit Gallery Item</h3>
            <form onSubmit={handleEdit} className="space-y-3">
              {["title", "description"].map((key) => (
                <div key={key} className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-400">{key}</label>
                  <input type="text" value={editItem[key] || ""} onChange={(e) => setEditItem((p) => ({ ...p, [key]: e.target.value }))} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none" />
                </div>
              ))}
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-400">Category</label>
                <select value={editItem.category} onChange={(e) => setEditItem((p) => ({ ...p, category: e.target.value }))} className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-white focus:outline-none cursor-pointer">
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="flex gap-2">
                <button type="submit" disabled={!!actionLoading} className="px-4 py-2 bg-blue-600 text-white text-xs font-black rounded-xl border-2 border-slate-950 cursor-pointer disabled:opacity-50">Save</button>
                <button type="button" onClick={() => setEditItem(null)} className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-600 text-xs font-black rounded-xl border-2 border-slate-200 cursor-pointer">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Gallery Grid */}
      {loading ? (
        <div className="flex justify-center py-16"><Loader2 className="w-8 h-8 animate-spin text-teal-600" /></div>
      ) : images.length === 0 ? (
        <div className="text-center py-16 text-slate-400 text-sm">No gallery images. Upload some!</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img) => (
            <div key={img._id} className="group relative bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden hover:border-teal-400 transition-all shadow-sm hover:shadow-md">
              <img src={img.image} alt={img.title} className="w-full aspect-square object-cover" />
              <div className="p-2.5">
                <p className="text-[10px] font-black text-slate-950 dark:text-white truncate">{img.title}</p>
                <p className="text-[9px] text-slate-400 font-medium">{img.category}</p>
              </div>
              <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => setEditItem({ ...img })} className="p-1.5 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg border border-slate-200 shadow-sm hover:text-blue-600 cursor-pointer" title="Edit">
                  <Plus className="w-3 h-3" />
                </button>
                <button onClick={() => handleDelete(img._id)} disabled={actionLoading === img._id} className="p-1.5 bg-white dark:bg-slate-800 text-red-500 rounded-lg border border-slate-200 shadow-sm hover:text-red-700 cursor-pointer" title="Delete" id={`delete-gallery-${img._id}`}>
                  {actionLoading === img._id ? <Loader2 className="w-3 h-3 animate-spin" /> : <Trash2 className="w-3 h-3" />}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {total > 12 && (
        <div className="flex justify-center gap-2">
          <button disabled={page === 1} onClick={() => setPage((p) => p - 1)} className="px-3 py-2 text-xs font-bold bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 rounded-xl disabled:opacity-40 cursor-pointer">← Prev</button>
          <span className="px-3 py-2 text-xs font-bold text-slate-500">Page {page} / {Math.ceil(total / 12)}</span>
          <button disabled={page >= Math.ceil(total / 12)} onClick={() => setPage((p) => p + 1)} className="px-3 py-2 text-xs font-bold bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 rounded-xl disabled:opacity-40 cursor-pointer">Next →</button>
        </div>
      )}
    </div>
  );
}
