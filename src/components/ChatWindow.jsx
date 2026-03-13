import { useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";

export default function ChatWindow({ messages }) {
  const bottomRef = useRef();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "1rem" }}>
      {messages.map((message, index) => (
        <MessageBubble
          key={message.id ?? index}
          role={message.role}
          text={message.text}
          isLoading={message.isLoading}
        />
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
