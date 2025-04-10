import { useState, useEffect } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setIsLoading(true);

    const loadingMessage = { role: "assistant", content: "..." };
    setMessages((prev) => [...prev, loadingMessage]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: newMessage.content }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      const reply = { role: "assistant", content: data.reply };
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = reply;
        return updated;
      });
    } catch (error) {
      console.error("Error sending message:", error);
      const errorReply = { role: "assistant", content: "Oops! Something went wrong." };
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = errorReply;
        return updated;
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        fontFamily: "'Playfair Display', serif",
        backgroundColor: "#fff3f3",
        color: "#401d23",
        padding: "1rem",
        borderRadius: "1rem",
        boxShadow: "0 0 30px rgba(203, 43, 94, 0.15)",
        maxWidth: "100%",
      }}
    >
      {/* Header */}
      <div
        style={{
          backgroundColor: "#e36d84",
          color: "white",
          padding: "1rem",
          borderRadius: "0.75rem",
          textAlign: "center",
          fontSize: "1.2rem",
          marginBottom: "1rem",
          fontWeight: "bold",
          boxShadow: "inset 0 -2px 4px rgba(0,0,0,0.1)",
        }}
      >
        💬 Chatting with Marketing Mother’s Helper™
      </div>

      {/* Messages */}
      <div style={{ maxHeight: "50vh", overflowY: "auto", padding: "0.5rem 0" }}>
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
              marginBottom: "1rem",
            }}
          >
            <div
              style={{
                background: msg.role === "user" ? "#f2f2f2" : "#fdd7e1",
                color: "#3a1d1f",
                padding: "0.75rem 1rem",
                borderRadius: "1.5rem",
                borderBottomRightRadius: msg.role === "user" ? "0" : "1.5rem",
                borderBottomLeftRadius: msg.role === "user" ? "1.5rem" : "0",
                maxWidth: "80%",
                boxShadow: "0 3px 6px rgba(0,0,0,0.08)",
              }}
            >
              <strong>{msg.role === "user" ? "You" : "MMH"}:</strong> {msg.content}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <form onSubmit={sendMessage} style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
        <input
          type="text"
          value={input}
          placeholder="Ask Marketing Mother something..."
          onChange={(e) => setInput(e.target.value)}
          style={{
            flex: 1,
            padding: "0.75rem",
            borderRadius: "0.5rem",
            border: "1px solid #dfabb3",
            fontSize: "1rem",
            backgroundColor: "#fff9f9",
          }}
        />
        <button
          type="submit"
          disabled={isLoading}
          style={{
            backgroundColor: "#cb2b5e",
            backgroundImage: "linear-gradient(315deg, #cb2b5e 0%, #ef473a 74%)",
            border: "none",
            color: "white",
            padding: "0.75rem 1.25rem",
            borderRadius: "0.5rem",
            cursor: "pointer",
            fontSize: "1rem",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          {isLoading ? "..." : "Send"}
        </button>
      </form>
    </div>
  );
}
