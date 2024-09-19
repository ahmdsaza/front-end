import React from "react";
import { createContext, useState } from "react";
export const CartExport = createContext(true);

export default function MenuContext({ children }) {
  const [isChange, setIsChange] = useState(true);

  return (
    <CartExport.Provider value={{ isChange, setIsChange }}>
      {children}
    </CartExport.Provider>
  );
}
