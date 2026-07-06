import React, { useState, useEffect } from"react";
import { Plus, Trash2, MessageSquare } from"lucide-react";
import { getAllMessages, sendMessage, deleteMessage } from"../../api/messages.api";
import { getUsers } from"../../api/admin.api";

export default function ManagerMessages() {
 const [messages, setMessages] = useState([]);
 const [users, setUsers] = useState([]);
 const [loading, setLoading] = useState(true);

 const [isAddModalOpen, setIsAddModalOpen] = useState(false);
 const [formData, setFormData] = useState({
 subject:"",
 receiver:"",
 content:""
 });

 useEffect(() => {
 fetchData();
 }, []);

 const fetchData = async () => {
 setLoading(true);
 try {
 const [msgRes, userRes] = await Promise.all([
 getAllMessages(),
 getUsers({ limit: 100 })
 ]);
 if (msgRes.success) setMessages(msgRes.data);
 if (userRes.success) setUsers(userRes.data);
 } catch (err) {
 console.error(err);
 } finally {
 setLoading(false);
 }
 };

 const handleSend = async (e) => {
 e.preventDefault();
 try {
 await sendMessage(formData);
 setIsAddModalOpen(false);
 setFormData({ subject:"", receiver:"", content:"" });
 fetchData();
 } catch (err) {
 console.error(err);
 alert("Failed to send message. Please try again.");
 }
 };

 const handleDelete = async (id) => {
 if (window.confirm("Are you sure you want to delete this message?")) {
 try {
 await deleteMessage(id);
 fetchData();
 } catch (err) {
 console.error(err);
 }
 }
 };

 if (loading) return <div className="text-center p-10">Loading...</div>;

 return (
 <div className="space-y-6">
 <div className="flex justify-between items-center">
 <h2 className="text-2xl font-bold text-slate-900">Message Management</h2>
 <button
 onClick={() => {
 setFormData({ subject:"", receiver:"", content:"" });
 setIsAddModalOpen(true);
 }}
 className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-500"
 >
 <Plus className="w-4 h-4" /> Send Message
 </button>
 </div>

 <div className="bg-white rounded-md shadow-sm border border-slate-200 overflow-hidden">
 <div className="overflow-x-auto">
 <table className="w-full text-left border-collapse">
 <thead>
 <tr className="bg-slate-50 border-b border-slate-200">
 <th className="p-4 font-semibold text-sm text-slate-600">Subject / Heading</th>
 <th className="p-4 font-semibold text-sm text-slate-600">From</th>
 <th className="p-4 font-semibold text-sm text-slate-600">To</th>
 <th className="p-4 font-semibold text-sm text-slate-600">Content</th>
 <th className="p-4 font-semibold text-sm text-slate-600">Date</th>
 <th className="p-4 font-semibold text-sm text-slate-600">Actions</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-slate-200">
 {messages.length === 0 && (
 <tr>
 <td colSpan={6} className="p-8 text-center text-slate-500">No messages yet.</td>
 </tr>
 )}
 {messages.map((m) => (
 <tr key={m._id} className="hover:bg-slate-50">
 <td className="p-4 text-sm font-semibold text-slate-900">
 <span className="flex items-center gap-2">
 <MessageSquare className="w-4 h-4 text-blue-500" />
 {m.subject ||"—"}
 </span>
 </td>
 <td className="p-4 text-sm text-slate-600">{m.sender?.fullName ||"Unknown"}</td>
 <td className="p-4 text-sm text-slate-600">{m.receiver?.fullName ||"—"}</td>
 <td className="p-4 text-sm text-slate-600 max-w-xs truncate">{m.content}</td>
 <td className="p-4 text-sm text-slate-500">{new Date(m.createdAt).toLocaleDateString()}</td>
 <td className="p-4 text-sm">
 <button onClick={() => handleDelete(m._id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
 <Trash2 className="w-4 h-4" />
 </button>
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </div>

 {/* Send Message Modal */}
 {isAddModalOpen && (
 <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
 <div className="bg-white p-6 rounded-md w-full max-w-lg shadow-xl border border-slate-200">
 <h3 className="text-xl font-bold mb-4">Send Message</h3>
 <form onSubmit={handleSend} className="space-y-4">
 <div>
 <label className="block text-sm font-medium mb-1">Message Heading / Subject</label>
 <input
 type="text"
 required
 placeholder="e.g. Internship Report Payment, Phase 2 Update..."
 value={formData.subject}
 onChange={e => setFormData({...formData, subject: e.target.value})}
 className="w-full p-2 border rounded"
 />
 </div>

 <div>
 <label className="block text-sm font-medium mb-1">To (Receiver)</label>
 <select
 required
 value={formData.receiver}
 onChange={e => setFormData({...formData, receiver: e.target.value})}
 className="w-full p-2 border rounded"
 >
 <option value="">Select Receiver</option>
 {users.filter(u => u.role !=="admin").map(u => (
 <option key={u._id} value={u._id}>{u.fullName} ({u.role})</option>
 ))}
 </select>
 </div>

 <div>
 <label className="block text-sm font-medium mb-1">Message Content</label>
 <textarea
 required
 rows={4}
 value={formData.content}
 onChange={e => setFormData({...formData, content: e.target.value})}
 className="w-full p-2 border rounded"
 placeholder="Type your message here..."
 />
 </div>

 <div className="flex justify-end gap-3 pt-4">
 <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 bg-slate-200 rounded">Cancel</button>
 <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Send</button>
 </div>
 </form>
 </div>
 </div>
 )}
 </div>
 );
}
