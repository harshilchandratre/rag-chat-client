import { useState } from "react";

export default function PromptInput({ onSubmit, disabled }) {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    if (!value.trim()) return;
    onSubmit(value.trim());
    setValue("");
  };

  return (
    <div style={{ display: "flex", padding: "1rem", borderTop: "1px solid #ccc" }}>
      <input
        style={{ flex: 1, marginRight: "0.5rem", padding: "0.5rem" }}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        placeholder="Ask a question about the document..."
        disabled={disabled}
      />
      <button onClick={handleSubmit} disabled={disabled || !value.trim()}>
        Submit
      </button>
    </div>
  );
}