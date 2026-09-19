"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import CalendlyModal from "./CalendlyModal";

interface BookDemoContextType {
  isOpen: boolean;
  openDemoModal: () => void;
  closeDemoModal: () => void;
}

const BookDemoContext = createContext<BookDemoContextType>({
  isOpen: false,
  openDemoModal: () => {},
  closeDemoModal: () => {},
});

export function BookDemoProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openDemoModal = () => setIsOpen(true);
  const closeDemoModal = () => setIsOpen(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeDemoModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <BookDemoContext.Provider value={{ isOpen, openDemoModal, closeDemoModal }}>
      {children}
      <CalendlyModal isOpen={isOpen} onClose={closeDemoModal} />
    </BookDemoContext.Provider>
  );
}

export function useBookDemo() {
  const context = useContext(BookDemoContext);
  if (!context) {
    throw new Error("useBookDemo must be used within a BookDemoProvider");
  }
  return context;
}
