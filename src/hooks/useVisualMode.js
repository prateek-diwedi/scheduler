import React, { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  // const { mode, transition, back } = useVisualMode(
  //   props.interview ? SHOW : EMPTY
  // );

  // function transition(newMode, replace) {
  //   let newHistory = [...history, newMode]

  //   setHistory([...history, newMode]);
  //   setMode(newMode)

  //   if(replace === true) {
  //     newHistory.splice(newHistory.length-2, 2, newMode);
  //     setHistory(newHistory)
  //     setMode(newHistory[newHistory.length - 1])
  //   }
  // }

  function transition(newMode, replace) {
    let newHistory = [...history];
    if (replace === true) {
      newHistory.pop();
    }
    newHistory.push(newMode);

    setHistory(newHistory);
    setMode(newMode);
  }

  function back() {
    let newHist = history.slice(0, history.length-1);

    if (newHist.length >= 1) {
      setHistory(newHist);
      setMode(newHist[newHist.length - 1]);
    }
  }
  
  return { mode, transition, back };

};
