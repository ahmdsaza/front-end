import React from "react";
import { createContext, useState } from "react";
export const MenuContextExport = createContext(true);

export default function MenuContext({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <MenuContextExport.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </MenuContextExport.Provider>
  );
}
