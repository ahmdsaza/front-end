import React from "react";
import { createContext, useState } from "react";
export const LoginExport = createContext(true);

export default function LoginContext({ children }) {
  const [isChangeLogin, setIsChangeLogin] = useState(true);

  return (
    <LoginExport.Provider value={{ isChangeLogin, setIsChangeLogin }}>
      {children}
    </LoginExport.Provider>
  );
}
