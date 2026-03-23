import { useState } from "react";
import DocumentPanel from "./components/DocumentPanel";
import ChatWindow from "./components/ChatWindow";
import PromptInput from "./components/PromptInput";
import { askQuestion } from "./api/ragApi.js";

export default function App() {
  const [document, setDocument] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const toDisplayText = (value) => {
    if (typeof value === "string") return value;
    if (value == null) return "";
    if (typeof value === "number" || typeof value === "boolean") return String(value);

    try {
      return JSON.stringify(value, null, 2);
    } catch {
      return String(value);
    }
  };

  const handleSubmit = async (question) => {
    // if (!document) return alert("Please upload a document first.");

    const requestId = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const pendingId = `assistant-pending-${requestId}`;

    setMessages((prev) => [
      ...prev,
      { id: `user-${requestId}`, role: "user", text: question },
      { id: pendingId, role: "assistant", text: "", isLoading: true },
    ]);

    setLoading(true);
    try {
      const { answer } = await askQuestion(question);
      setMessages((prev) =>
        prev.map((message) =>
          message.id === pendingId
            ? { ...message, text: toDisplayText(answer), isLoading: false }
            : message,
        ),
      );
    } catch (err) {
      const errorText = err?.message ?? err;
      setMessages((prev) =>
        prev.map((message) =>
          message.id === pendingId
            ? { ...message, text: "Error: " + toDisplayText(errorText), isLoading: false }
            : message,
        ),
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <DocumentPanel document={document} setDocument={setDocument} />
      <ChatWindow messages={messages} />
      <PromptInput onSubmit={handleSubmit} />
    </div>
  );
}
