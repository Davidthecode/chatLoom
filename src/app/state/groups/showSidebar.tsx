"use client"

import { Dispatch, SetStateAction, useContext } from 'react';
import { createContext, useState, ReactNode } from 'react';

type SidebarType = {
    isOpen: boolean,
    setIsOpen: Dispatch<SetStateAction<boolean>>,
};

export const GroupSidebarContext = createContext<SidebarType | null>(null);

export const UseGroupSidebarContext: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <GroupSidebarContext.Provider value={{ isOpen, setIsOpen }}>
            {children}
        </GroupSidebarContext.Provider>
    )
};

export const useGroupSidebarContext = () => {
    const context = useContext(GroupSidebarContext);
    if (!context) {
        throw new Error('error');
    }
    return context;
};
