// Lyzr AI Agent API — calls backend proxy to avoid CORS + key exposure
export const chatWithLyzr = async (message, sessionId) => {
  const token = localStorage.getItem("arsha_token");
  const response = await fetch("/api/lyzr/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ message, session_id: sessionId }),
  });

  const json = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(json.message || "Lyzr chat failed");
  return json;
};
