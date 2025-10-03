"use client"

import {CodeMode} from "@/lib/types";
import React, {createContext, ReactNode, useContext, useState} from "react";

interface CodeModeContextType {
  codeMode: CodeMode,
  setCodeMode: React.Dispatch<React.SetStateAction<CodeMode>>
}

const CodeModeContext = createContext<CodeModeContextType | null>(null)


export function CodeModeProvider({children}: { children: ReactNode }) {
  const [codeMode, setCodeMode] = useState<CodeMode>("qr");


  return (
    <CodeModeContext.Provider value={{codeMode, setCodeMode}}>
      {children}
    </CodeModeContext.Provider>
  );
}

export const useCodeMode = (): CodeModeContextType => {
  const context = useContext(CodeModeContext);

  if (!context) {
    throw new Error("useCodeMode must be used within a UserProvider");
  }

  return context;
}