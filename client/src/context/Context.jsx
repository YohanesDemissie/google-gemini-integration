import { useState, useEffect, useRef } from "react";
import { Context } from "./CreateContext";
// import runChat from "../components/gemini";
import { sendPrompt } from "../api";

const ContextProvider = ({ children }) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const delayPara = (index, nextWord) => {
    setTimeout(function() {
        setResultData(prev => prev + nextWord);
    }, 75 * index);
  }

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
  }

  const requestInFlight = useRef(false);

// const onSent = async (promptOverride) => {
//   if (requestInFlight.current) return;
//   requestInFlight.current = true;

//   const prompt = promptOverride ?? input;
//   if (!prompt) {
//     requestInFlight.current = false;
//     return;
//   }

//   try {
//     setLoading(true);
//     setResultData("");
//     setShowResult(true);
//     setRecentPrompt(prompt);

//     const response = await sendPrompt(prompt);

//     setPrevPrompts(prev => [
//       ...prev,
//       { role: "user", text: prompt },
//       { role: "model", text: response },
//     ]);

//     renderResponse(response);

//   } catch (err) {
//     console.error("Frontend error:", err.message);
//   } finally {
//     requestInFlight.current = false;
//     setLoading(false);
//     setInput("");
//   }
// }

const onSent = async (promptOverride) => {
   if (requestInFlight.current) return;
  requestInFlight.current = true;

  const prompt = promptOverride ?? input;
  if (!prompt) {
    requestInFlight.current = false;
    return;
  }

  
  // const prompt = promptOverride ?? input;
  // if (!prompt) {
    //   setLoading(false);
    //   return;
    // }
    
    try {
    setLoading(true);
    setResultData("");
    setShowResult(true);
    setRecentPrompt(prompt);

    const historyForGemini = [
      ...prevPrompts,
      { role: "user", text: prompt },
    ];

    const response = await sendPrompt(prompt);

    setPrevPrompts(prev => [
      ...prev,
      { role: "user", text: prompt },
      { role: "model", text: response },
    ]);

    
    // render response (unchanged)
    // animateResponse(response);

        console.log(response)
    let responseArray = response.split("**");
    let newResponse = "";
    for(let i = 0; i < responseArray.length; i++) {
        if(i === 0 || i % 2 === 1) {
            newResponse += responseArray[i];
        } else {
            newResponse += `<b>${responseArray[i]}</b>`;
        }
      responseArray[i] = responseArray[i].trim();
    }
    let newResponseTwo = newResponse.split("*").join("</br>");
    let newResponseArray = newResponseTwo.split(" ");
    for(let i = 0; i < newResponseArray.length; i++) {
        const nextWord = newResponseArray[i];
        delayPara(i, nextWord + "  ");
    }

  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
    setInput("");
  }
};

  // new stuff
  // e.preventDefault();
  //   try {
  //     const res = await fetch('http://localhost:3001/generate', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ prompt }),
  //     });

  //     const data = await res.json();
  //     setResponse(data.generatedText);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //     setResponse('Error generating response.');
  //   }
  // };

  //end new stuff

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat,
  };

  return (
    <Context.Provider value={contextValue}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
