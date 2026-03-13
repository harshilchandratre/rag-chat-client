const BASE = "http://localhost:3000";

export async function uploadPdf(file) {
  const form = new FormData();
  form.append("pdf", file);
  const res = await fetch(`${BASE}/documents/upload`, { method: "POST", body: form });
  if (!res.ok) throw new Error((await res.json()).error);
  return res.json(); // { filename }
}

export async function clearPdf(filename) {
  const res = await fetch(`${BASE}/documents/clear/${encodeURIComponent(filename)}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error((await res.json()).error);
  return res.json();
}

export async function askQuestion(question) {
  const res = await fetch(`${BASE}/query/ask`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question }),
  });
  if (!res.ok) throw new Error((await res.json()).error);
  return res.json(); // { answer }
}