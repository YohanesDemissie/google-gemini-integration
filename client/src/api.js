export const sendPrompt = async (prompt, history = []) => {
  const res = await fetch("http://localhost:3001/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt, history }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Request failed");
  }

  return data.generatedText;
};
