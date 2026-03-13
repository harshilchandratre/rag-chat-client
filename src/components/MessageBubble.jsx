import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function MessageBubble({ role, text, isLoading = false }) {
  const isUser = role === "user";
  const contentText =
    typeof text === "string"
      ? text
      : text == null
      ? ""
      : (() => {
          try {
            return JSON.stringify(text, null, 2);
          } catch {
            return String(text);
          }
        })();

  return (
    <div style={{ textAlign: isUser ? "right" : "left", margin: "0.5rem 0" }}>
      <div
        className="message-bubble"
        style={{
          display: "inline-block",
          background: isUser ? "#0078d4" : "#f0f0f0",
          color: isUser ? "#fff" : "#000",
          padding: "0.5rem 1rem",
          borderRadius: "1rem",
          maxWidth: "70%",
          overflowX: "auto",
        }}
      >
        {isLoading ? (
          <span className="loading-dots" aria-label="Assistant is responding" aria-live="polite">
            <span />
            <span />
            <span />
          </span>
        ) : isUser ? (
          contentText
        ) : (
          <div className="message-markdown">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{contentText}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
