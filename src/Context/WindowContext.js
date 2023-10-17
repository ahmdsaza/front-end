import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

export const WindowSize = createContext(null);

export default function WindowContext({ children }) {
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  useEffect(() => {
    function setWindowwidth() {
      setWindowSize(window.innerWidth);
    }
    window.addEventListener("resize", setWindowwidth);

    // Clean Function
    return () => {
      window.removeEventListener("resize", setWindowwidth);
    };
  }, []);

  return (
    <WindowSize.Provider value={{ windowSize }}>{children}</WindowSize.Provider>
  );
}
