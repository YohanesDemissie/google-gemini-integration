// export const sendPrompt = async (prompt, history = []) => {
//   const res = await fetch("http://localhost:3001/api/generate", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ prompt, history }),
//   });

//   const data = await res.json();

//   if (res.status === 429 || res.status === 5000) {
//     return "Simulated response for development";
//   }
//   if (!res.ok) {
//     throw new Error(data.error || "Request failed");
//   }


//   return data.generatedText;
// };

export const sendPrompt = async (prompt, history) => {
  console.count("sendPrompt called");
  console.log("Prompt:", prompt);

  try {
    const res = await fetch("http://localhost:3001/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, history }),
    });

    // If the API responds with a 429 or 500, use dummy text
    if (!res.ok) {
      const data = await res.json();
      console.warn("API Error:", data.error);
      return getDummyResponse(prompt);
    }

    const data = await res.json();
    return data.generatedText || getDummyResponse(prompt);

  } catch (err) {
    console.error("Fetch failed:", err);
    return getDummyResponse(prompt);
  }
};

// Generate a dummy response based on the prompt
const getDummyResponse = (prompt) => {
  return `(Dummy Response) Your prompt was: "${prompt}". Gemini API quota reached or offline.`;
};