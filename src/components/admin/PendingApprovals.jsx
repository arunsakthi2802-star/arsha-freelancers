import React, { useState, useEffect } from "react";
import { Clock, Check, X, Search, RefreshCcw, AlertTriangle } from "lucide-react";
import { getApprovalRequests, decideApproval } from "../../api/approvals.api";

export default function PendingApprovals() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(null);
  const [commentModal, setCommentModal] = useState({ isOpen: false, requestId: null, status: null, text: "" });

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const res = await getApprovalRequests();
      if (res.success) {
        setRequests(res.data.filter((r) => r.status === "pending"));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleDecision = async (id, status, comment = "") => {
    try {
      setProcessing(id);
      const res = await decideApproval(id, status, comment);
      if (res.success) {
        setRequests((prev) => prev.filter((r) => r._id !== id));
      }
    } catch (err) {
      alert(err.message || "Failed to process request");
    } finally {
      setProcessing(null);
      setCommentModal({ isOpen: false, requestId: null, status: null, text: "" });
    }
  };

  const openCommentModal = (id, status) => {
    setCommentModal({ isOpen: true, requestId: id, status, text: "" });
  };

  const submitCommentAndDecide = () => {
    handleDecision(commentModal.requestId, commentModal.status, commentModal.text);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-slate-950 dark:text-white">Permission Control</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Review and approve changes submitted by Managers.</p>
        </div>
        <button
          onClick={fetchRequests}
          className="p-2 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer"
        >
          <RefreshCcw className="w-5 h-5 text-slate-600 dark:text-slate-300" />
        </button>
      </div>

      {loading ? (
        <div className="text-center py-10 text-slate-500">Loading requests...</div>
      ) : requests.length === 0 ? (
        <div className="text-center py-10 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl">
          <Check className="w-8 h-8 text-green-500 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-slate-950 dark:text-white">All Caught Up!</h3>
          <p className="text-xs text-slate-500">There are no pending requests requiring your approval.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {requests.map((req) => (
            <div key={req._id} className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 rounded-2xl p-6 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
              
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${
                      req.action === 'create' ? 'bg-green-100 text-green-700' :
                      req.action === 'delete' ? 'bg-red-100 text-red-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {req.action}
                    </span>
                    <span className="text-sm font-bold text-slate-950 dark:text-white capitalize">
                      {req.module} Module
                    </span>
                    <span className="text-xs text-slate-400">&bull;</span>
                    <span className="text-xs text-slate-500">{new Date(req.createdAt).toLocaleString()}</span>
                  </div>
                  
                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                    Manager <span className="font-bold text-slate-900 dark:text-slate-200">{req.requestedBy.email}</span> requested to {req.action} a record in {req.module}.
                  </p>
                  
                  <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 overflow-x-auto text-xs font-mono text-slate-700 dark:text-slate-300">
                    <pre>{JSON.stringify(req.payload, null, 2)}</pre>
                  </div>
                </div>

                <div className="flex md:flex-col gap-3 justify-start">
                  <button
                    onClick={() => handleDecision(req._id, "approved")}
                    disabled={processing === req._id}
                    className="flex-1 flex items-center justify-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-500 text-white font-bold text-xs rounded-xl shadow-sm transition-all disabled:opacity-50 cursor-pointer"
                  >
                    <Check className="w-4 h-4" />
                    Approve
                  </button>
                  <button
                    onClick={() => openCommentModal(req._id, "rejected")}
                    disabled={processing === req._id}
                    className="flex-1 flex items-center justify-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-800 hover:bg-red-50 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800/50 font-bold text-xs rounded-xl transition-all disabled:opacity-50 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Comment Modal */}
      {commentModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-2xl shadow-xl overflow-hidden border border-slate-200 dark:border-slate-800 p-6">
            <h3 className="text-lg font-black text-slate-950 dark:text-white mb-2">
              Reject Request
            </h3>
            <p className="text-sm text-slate-500 mb-4">
              Please provide a reason for rejecting this request. The manager will see this comment.
            </p>
            <textarea
              value={commentModal.text}
              onChange={(e) => setCommentModal({ ...commentModal, text: e.target.value })}
              className="w-full p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none min-h-[100px] mb-4 text-slate-800 dark:text-white"
              placeholder="E.g., Please fix the spelling in the title..."
            ></textarea>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setCommentModal({ isOpen: false, requestId: null, status: null, text: "" })}
                className="px-4 py-2 text-sm font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={submitCommentAndDecide}
                className="px-4 py-2 text-sm font-bold text-white bg-red-600 hover:bg-red-500 rounded-lg cursor-pointer"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
