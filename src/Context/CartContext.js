import React from "react";
import { createContext, useState } from "react";
export const CartExport = createContext(true);

export default function CartContext({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <CartExport.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </CartExport.Provider>
  );
}
