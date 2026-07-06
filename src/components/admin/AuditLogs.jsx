import React, { useState, useEffect } from"react";
import { FileText, Search, User, Key, CheckCircle, AlertCircle, RefreshCcw } from"lucide-react";
import { getAuditLogs } from"../../api/approvals.api";

export default function AuditLogs() {
 const [logs, setLogs] = useState([]);
 const [loading, setLoading] = useState(true);
 const [searchTerm, setSearchTerm] = useState("");

 const fetchLogs = async () => {
 try {
 setLoading(true);
 const res = await getAuditLogs();
 if (res.success) {
 setLogs(res.data);
 }
 } catch (err) {
 console.error(err);
 } finally {
 setLoading(false);
 }
 };

 useEffect(() => {
 fetchLogs();
 }, []);

 const filteredLogs = logs.filter((log) => 
 log.details.toLowerCase().includes(searchTerm.toLowerCase()) || 
 log.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
 log.module.toLowerCase().includes(searchTerm.toLowerCase())
 );

 return (
 <div className="space-y-6">
 <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
 <div>
 <h2 className="text-xl font-black text-slate-950">Audit Logs</h2>
 <p className="text-sm text-slate-500 mt-1">Track all system changes and actions.</p>
 </div>
 <div className="flex items-center gap-3 w-full sm:w-auto">
 <div className="relative flex-1 sm:w-64">
 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
 <input
 type="text"
 placeholder="Search logs..."
 value={searchTerm}
 onChange={(e) => setSearchTerm(e.target.value)}
 className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
 />
 </div>
 <button
 onClick={fetchLogs}
 className="p-2 bg-white border-2 border-slate-200 rounded hover:bg-slate-50 cursor-pointer"
 >
 <RefreshCcw className="w-5 h-5 text-slate-600" />
 </button>
 </div>
 </div>

 <div className="bg-white border border-slate-200 rounded-md overflow-hidden shadow-sm">
 <div className="overflow-x-auto">
 <table className="w-full text-left text-sm whitespace-nowrap">
 <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-[10px] font-black tracking-wider">
 <tr>
 <th className="px-6 py-4">Action</th>
 <th className="px-6 py-4">Module</th>
 <th className="px-6 py-4">User</th>
 <th className="px-6 py-4">Details</th>
 <th className="px-6 py-4">Date</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-slate-100">
 {loading ? (
 <tr>
 <td colSpan="5" className="px-6 py-8 text-center text-slate-500">
 Loading logs...
 </td>
 </tr>
 ) : filteredLogs.length === 0 ? (
 <tr>
 <td colSpan="5" className="px-6 py-8 text-center text-slate-500">
 No logs found
 </td>
 </tr>
 ) : (
 filteredLogs.map((log) => (
 <tr key={log._id} className="hover:bg-slate-50/50 transition-colors">
 <td className="px-6 py-4 font-bold text-slate-900 capitalize">
 <span className={`px-2.5 py-1 rounded-md text-[10px] uppercase tracking-wider ${
 log.action === 'create' ? 'bg-green-100 text-green-700' :
 log.action === 'delete' ? 'bg-red-100 text-red-700' :
 'bg-blue-100 text-blue-700'
 }`}>
 {log.action}
 </span>
 </td>
 <td className="px-6 py-4 text-slate-600 capitalize">{log.module}</td>
 <td className="px-6 py-4">
 <div className="flex items-center gap-2">
 <div className="w-6 h-6 rounded-md bg-slate-100 flex items-center justify-center flex-shrink-0">
 {log.userRole ==="admin" ? <Key className="w-3 h-3 text-purple-500" /> : <User className="w-3 h-3 text-slate-400" />}
 </div>
 <div>
 <p className="text-xs font-bold text-slate-900">{log.userEmail}</p>
 <p className="text-[10px] text-slate-500 capitalize">{log.userRole}</p>
 </div>
 </div>
 </td>
 <td className="px-6 py-4 text-slate-600">
 {log.details}
 </td>
 <td className="px-6 py-4 text-slate-500 text-xs">
 {new Date(log.createdAt).toLocaleString()}
 </td>
 </tr>
 ))
 )}
 </tbody>
 </table>
 </div>
 </div>
 </div>
 );
}
