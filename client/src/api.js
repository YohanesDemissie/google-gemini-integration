// const API_URL = import.meta.env.VITE_API_URL;

export const sendPrompt = async (prompt, history = []) => {
  // const res = await fetch(`${API_URL}/api/generate`, {
  const res = await fetch(`http://localhost:3001/api/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt, history }),
  });
  console.log("Response status:", res.status);

  const data = await res.json();

  if (res.status === 429 || res.status === 500) {
    // console.log(import.meta.env.VITE_GEMINI_API_KEY)
    // console.log(process.env.GEMINI_API_KEY)
    return "Simulated response for development";
  }
  if (!res.ok) {
    throw new Error(data.error || "Request failed");
  }


  return data.generatedText;
};

// TEST PROMPT BELOW WHEN WE RUN UT OF TOKENS

// export const sendPrompt = async (prompt, history) => {
//   console.count("sendPrompt called");
//   console.log("Prompt:", prompt);

//   try {
//     const res = await fetch("http://localhost:3001/api/generate", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ prompt, history }),
//     });

//     // If the API responds with a 429 or 500, use dummy text
//     if (!res.ok) {
//       const data = await res.json();
//       console.warn("API Error:", data.error);
//       return getDummyResponse(prompt);
//     }

//     const data = await res.json();
//     return data.generatedText || getDummyResponse(prompt);

//   } catch (err) {
//     console.error("Fetch failed:", err);
//     return getDummyResponse(prompt);
//   }
// };

// // Generate a dummy response based on the prompt
// const getDummyResponse = (prompt) => {
//   return `(Dummy Response) Your prompt was: "${prompt}". Gemini API quota reached or offline.`;
// };