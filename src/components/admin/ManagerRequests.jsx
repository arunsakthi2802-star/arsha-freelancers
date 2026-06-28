import React, { useState, useEffect } from "react";
import { Clock, CheckCircle2, XCircle, Search, RefreshCcw } from "lucide-react";
import { getApprovalRequests } from "../../api/approvals.api";

export default function ManagerRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const res = await getApprovalRequests();
      if (res.success) {
        setRequests(res.data);
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

  const getStatusIcon = (status) => {
    switch (status) {
      case "approved": return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case "rejected": return <XCircle className="w-5 h-5 text-red-500" />;
      default: return <Clock className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-slate-950 dark:text-white">My Requests</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Track the status of your requested changes.</p>
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
          <Clock className="w-8 h-8 text-slate-400 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-slate-950 dark:text-white">No requests found</h3>
          <p className="text-xs text-slate-500">You haven't requested any changes yet.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {requests.map((req) => (
            <div key={req._id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  {getStatusIcon(req.status)}
                  <div>
                    <h3 className="text-sm font-bold text-slate-950 dark:text-white capitalize">
                      {req.action} {req.module}
                    </h3>
                    <p className="text-xs text-slate-500">{new Date(req.createdAt).toLocaleString()}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  req.status === 'approved' ? 'bg-green-100 text-green-700' :
                  req.status === 'rejected' ? 'bg-red-100 text-red-700' :
                  'bg-blue-100 text-blue-700'
                }`}>
                  {req.status}
                </span>
              </div>

              {req.adminComment && (
                <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                  <p className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Admin Comment:</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{req.adminComment}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
