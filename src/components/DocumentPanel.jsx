import { useRef, useState } from "react";
import { uploadPdf, clearPdf } from "../api/ragApi.js";

export default function DocumentPanel({ document, setDocument }) {
  const inputRef = useRef();
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setDocument(null);

    try {
      const { filename } = await uploadPdf(file);
      setDocument(filename);
    } catch (err) {
      alert("Upload failed: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleClear = async () => {
    if (!document || uploading) return;
    try {
      await clearPdf(document);
      setDocument(null);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    } catch (err) {
      alert("Clear failed: " + err.message);
    }
  };

  return (
    <div style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
      <input
        ref={inputRef}
        type="file"
        accept=".pdf"
        onChange={handleUpload}
        disabled={uploading}
      />

      {uploading && (
        <span className="loading-inline" aria-live="polite" style={{ marginLeft: "0.75rem" }}>
          Uploading and indexing document...
        </span>
      )}

      {!uploading && document && (
        <span>
          &nbsp; Active: <strong>{document}</strong>
          <button onClick={handleClear} style={{ marginLeft: "1rem" }}>
            Clear Doc
          </button>
        </span>
      )}
    </div>
  );
}
