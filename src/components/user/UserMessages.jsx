import React, { useState, useEffect } from "react";
import { Plus, MessageSquare } from "lucide-react";
import { getAllMessages, sendMessage } from "../../api/messages.api";
import { useAuth } from "../../context/AuthContext";

export default function UserMessages() {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    subject: "",
    content: ""
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getAllMessages();
      if (res.success) {
        // Only show messages sent to/from this user
        const myMessages = res.data.filter(
          m => m.sender?._id === user?._id || m.receiver?._id === user?._id
        );
        setMessages(myMessages);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    try {
      // Send to manager/admin (no specific receiver needed from user side)
      await sendMessage({
        subject: formData.subject,
        content: formData.content
      });
      setIsAddModalOpen(false);
      setFormData({ subject: "", content: "" });
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Failed to send message. Please try again.");
    }
  };

  if (loading) return <div className="text-center p-10">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">My Messages</h2>
        <button
          onClick={() => {
            setFormData({ subject: "", content: "" });
            setIsAddModalOpen(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-blue-500"
        >
          <Plus className="w-4 h-4" /> New Message
        </button>
      </div>

      <div className="space-y-4">
        {messages.length === 0 ? (
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-10 text-center border border-slate-200 dark:border-slate-700 text-slate-500">
            No messages yet. Click "New Message" to contact your project coordinator.
          </div>
        ) : (
          messages.map(m => (
            <div key={m._id} className={`p-5 rounded-2xl border shadow-sm ${
              m.sender?._id === user?._id
                ? "bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800"
                : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700"
            }`}>
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-blue-500" />
                  <span className="font-semibold text-slate-900 dark:text-white">{m.subject || "(No Subject)"}</span>
                </div>
                <span className="text-xs text-slate-400">{new Date(m.createdAt).toLocaleString()}</span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 whitespace-pre-wrap">{m.content}</p>
              <div className="mt-2 text-xs text-slate-400">
                From: <strong>{m.sender?.fullName}</strong>
                {m.receiver && <> → To: <strong>{m.receiver.fullName}</strong></>}
              </div>
            </div>
          ))
        )}
      </div>

      {/* New Message Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl w-full max-w-lg shadow-xl border border-slate-200 dark:border-slate-800">
            <h3 className="text-xl font-bold mb-4">Send Message</h3>
            <form onSubmit={handleSend} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Message Heading / Subject</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Project Update, Payment Query..."
                  value={formData.subject}
                  onChange={e => setFormData({...formData, subject: e.target.value})}
                  className="w-full p-2 border rounded dark:bg-slate-800 dark:border-slate-700"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Message</label>
                <textarea
                  required
                  rows={4}
                  value={formData.content}
                  onChange={e => setFormData({...formData, content: e.target.value})}
                  className="w-full p-2 border rounded dark:bg-slate-800 dark:border-slate-700"
                  placeholder="Type your message here..."
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-4 py-2 bg-slate-200 dark:bg-slate-800 rounded">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Send</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
