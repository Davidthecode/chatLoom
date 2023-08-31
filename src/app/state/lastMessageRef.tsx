'use client'

import { createContext, useContext, useRef, ReactNode } from 'react';

const initialLastMessageRef = useRef<HTMLElement | null>(null);
export const LastMessageRefContext = createContext<React.RefObject<HTMLElement | null>>(initialLastMessageRef);

export const LastMessageRefProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const lastMessageRef = useRef<HTMLElement | null>(null);

  return (
    <LastMessageRefContext.Provider value={lastMessageRef}>
      {children}
    </LastMessageRefContext.Provider>
  );
};

export const useLastMessageRef = () => {
    const context = useContext(LastMessageRefContext);
    if (!context) {
        throw new Error('err');
    }
    return context;
};
