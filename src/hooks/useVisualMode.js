import React, { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    const modes = history;

    if (replace) {
      modes.pop();
    }

    modes.push(newMode);
    setHistory(modes);
    setMode(newMode);
  };

  const back = () => {
    const modes = history;
    if (history.length < 2) {
      return;
    }
    modes.pop();
    setHistory(modes);
    setMode(history[history.length - 1]);
  };

  return { mode, transition, back };
}
