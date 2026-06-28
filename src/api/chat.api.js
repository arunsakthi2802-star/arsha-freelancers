// Custom AI Chat Agent API — calls backend Gemini integration
export const chatWithAI = async (message, history) => {
  const token = localStorage.getItem("arsha_token");
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ message, history }),
  });

  const json = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(json.message || "Chat failed");
  return json;
};
