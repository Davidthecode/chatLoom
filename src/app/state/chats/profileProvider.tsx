"use client"

import { Dispatch, SetStateAction, useContext, useEffect } from 'react';
import { createContext, useState, ReactNode } from 'react';

type ProfileType = {
    isProfile: boolean,
    setIsProfile: Dispatch<SetStateAction<boolean>>,
};

export const ProfileContext = createContext<ProfileType | null>(null);

export const UseProfileContext: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isProfile, setIsProfile] = useState<boolean>(false);

    return (
        <ProfileContext.Provider value={{ isProfile, setIsProfile }}>
            {children}
        </ProfileContext.Provider>
    )
};

export const useProfileContext = () => {
    const context = useContext(ProfileContext);
    if (!context) {
        throw new Error('error');
    }
    return context;
};
