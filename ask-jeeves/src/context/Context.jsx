import { useState, useEffect } from "react";
import { Context } from "./CreateContext";
import runChat from "../components/gemini";

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


  const onSent = async (promptOverride) => {
    const prompt = promptOverride ?? input;
    setResultData("");
    setLoading(true);
    setShowResult(true);
    setRecentPrompt(prompt);

     // 🔹 Build conversation history INCLUDING the new prompt
    const historyForGemini = [
        ...prevPrompts,
        { role: "user", text: prompt },
    ];
    let response;
    if(prompt !== undefined){
        response = await runChat(prompt, historyForGemini);
        setRecentPrompt(prompt);
        setPrevPrompts(prev => [
            ...prev,
            { role: "user", text: prompt },
            { role: "model", text: response },
        ]);
    } else {
        setPrevPrompts(prev => [...prev, input]);
        setRecentPrompt(input);
        response = await runChat(input);
    }
    // setRecentPrompt(input)
    // setPrevPrompts(prev => [...prev, input])

    // const response = await runChat(input, prevPrompts);
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
    // setResultData(newResponseTwo);
    setLoading(false);
    setInput("");
    
  };

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
