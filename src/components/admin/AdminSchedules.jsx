import React, { useState, useEffect } from "react";
import { getAllSchedules, createSchedule, deleteSchedule, updateSchedule } from "../../api/schedules.api";
import { getUsers } from "../../api/admin.api";
import { Calendar, Clock, User as UserIcon, Plus, Trash2, RefreshCw } from "lucide-react";

export default function AdminSchedules() {
  const [schedules, setSchedules] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [addLoading, setAddLoading] = useState(false);

  const [newSchedule, setNewSchedule] = useState({
    user: "",
    title: "",
    description: "",
    date: "",
    time: "",
    type: "meeting",
    status: "scheduled"
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const [schedulesRes, usersRes] = await Promise.all([
        getAllSchedules(),
        getUsers({ limit: 100 }) // Load up to 100 users for selection
      ]);
      if (schedulesRes.success) setSchedules(schedulesRes.data);
      if (usersRes.success) setUsers(usersRes.data);
    } catch (err) {
      console.error(err);
      alert("Failed to load data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    setAddLoading(true);
    try {
      const res = await createSchedule(newSchedule);
      if (res.success) {
        alert("Schedule created successfully!");
        setShowAddForm(false);
        setNewSchedule({
          user: "",
          title: "",
          description: "",
          date: "",
          time: "",
          type: "meeting",
          status: "scheduled"
        });
        loadData();
      }
    } catch (err) {
      alert(err.message || "Failed to create schedule.");
    } finally {
      setAddLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this schedule?")) return;
    try {
      const res = await deleteSchedule(id);
      if (res.success) {
        setSchedules(schedules.filter(s => s._id !== id));
      }
    } catch (err) {
      alert(err.message || "Failed to delete schedule.");
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const res = await updateSchedule(id, { status: newStatus });
      if (res.success) {
        setSchedules(schedules.map(s => s._id === id ? res.data : s));
      }
    } catch (err) {
      alert(err.message || "Failed to update status.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Schedules</h2>
        <div className="flex gap-2">
          <button 
            onClick={loadData}
            className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            title="Refresh"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-bold transition-all shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
          >
            {showAddForm ? "Cancel" : <><Plus className="w-4 h-4" /> Add Schedule</>}
          </button>
        </div>
      </div>

      {showAddForm && (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border-2 border-slate-900 dark:border-slate-700 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]">
          <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">Create New Schedule</h3>
          <form onSubmit={handleCreate} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">User *</label>
                <select 
                  required
                  value={newSchedule.user}
                  onChange={(e) => setNewSchedule({...newSchedule, user: e.target.value})}
                  className="w-full p-2 border-2 border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select User...</option>
                  {users.map(u => (
                    <option key={u._id} value={u._id}>{u.fullName} ({u.email})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Title *</label>
                <input 
                  type="text" 
                  required
                  value={newSchedule.title}
                  onChange={(e) => setNewSchedule({...newSchedule, title: e.target.value})}
                  className="w-full p-2 border-2 border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                  placeholder="e.g. Project Review Meeting"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Description</label>
                <textarea 
                  value={newSchedule.description}
                  onChange={(e) => setNewSchedule({...newSchedule, description: e.target.value})}
                  className="w-full p-2 border-2 border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                  placeholder="Optional details, links, etc."
                  rows="2"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Date *</label>
                <input 
                  type="date" 
                  required
                  value={newSchedule.date}
                  onChange={(e) => setNewSchedule({...newSchedule, date: e.target.value})}
                  className="w-full p-2 border-2 border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Time *</label>
                <input 
                  type="time" 
                  required
                  value={newSchedule.time}
                  onChange={(e) => setNewSchedule({...newSchedule, time: e.target.value})}
                  className="w-full p-2 border-2 border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Type</label>
                <select 
                  value={newSchedule.type}
                  onChange={(e) => setNewSchedule({...newSchedule, type: e.target.value})}
                  className="w-full p-2 border-2 border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="meeting">Meeting</option>
                  <option value="deadline">Deadline</option>
                  <option value="review">Review</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            <button 
              type="submit" 
              disabled={addLoading}
              className="w-full bg-slate-900 dark:bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-slate-800 dark:hover:bg-blue-700 transition-colors mt-4 disabled:opacity-70"
            >
              {addLoading ? "Creating..." : "Save Schedule"}
            </button>
          </form>
        </div>
      )}

      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
        {schedules.length === 0 ? (
          <div className="p-10 text-center text-slate-500">No schedules found. Create one above!</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
                  <th className="p-4 text-sm font-bold text-slate-600 dark:text-slate-400">User</th>
                  <th className="p-4 text-sm font-bold text-slate-600 dark:text-slate-400">Title & Type</th>
                  <th className="p-4 text-sm font-bold text-slate-600 dark:text-slate-400">Date & Time</th>
                  <th className="p-4 text-sm font-bold text-slate-600 dark:text-slate-400">Status</th>
                  <th className="p-4 text-sm font-bold text-slate-600 dark:text-slate-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {schedules.map(schedule => (
                  <tr key={schedule._id} className="border-b border-slate-100 dark:border-slate-800 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <UserIcon className="w-4 h-4 text-slate-400" />
                        <div>
                          <p className="font-bold text-sm text-slate-900 dark:text-white">{schedule.user?.fullName || "Unknown User"}</p>
                          <p className="text-xs text-slate-500">{schedule.user?.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="font-bold text-sm text-slate-900 dark:text-white">{schedule.title}</p>
                      <span className="inline-block px-2 py-0.5 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 text-[10px] rounded uppercase font-bold mt-1">
                        {schedule.type}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col gap-1 text-sm text-slate-600 dark:text-slate-300">
                        <div className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {new Date(schedule.date).toLocaleDateString()}</div>
                        <div className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {schedule.time}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <select
                        value={schedule.status}
                        onChange={(e) => handleStatusUpdate(schedule._id, e.target.value)}
                        className={`text-xs font-bold px-2 py-1 rounded border-2 focus:outline-none ${
                          schedule.status === "completed" ? "bg-green-100 border-green-200 text-green-700" :
                          schedule.status === "cancelled" ? "bg-red-100 border-red-200 text-red-700" :
                          "bg-orange-100 border-orange-200 text-orange-700"
                        }`}
                      >
                        <option value="scheduled">Scheduled</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="p-4">
                      <button 
                        onClick={() => handleDelete(schedule._id)}
                        className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        title="Delete Schedule"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
