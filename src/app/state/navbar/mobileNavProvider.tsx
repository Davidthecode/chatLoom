"use client"

import { Dispatch, SetStateAction, useContext } from 'react';
import { createContext, useState, ReactNode } from 'react';

type MobileNavType = {
    isMobile: boolean,
    setIsMobile: Dispatch<SetStateAction<boolean>>,
};

export const MobileNavContext = createContext<MobileNavType | null>(null);

export const UseMobileNavContext: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isMobile, setIsMobile] = useState<boolean>(false);

    return (
        <MobileNavContext.Provider value={{ isMobile, setIsMobile }}>
            {children}
        </MobileNavContext.Provider>
    )
};

export const useMobileNavContext = () => {
    const context = useContext(MobileNavContext);
    if (!context) {
        throw new Error('error');
    }
    return context;
};
