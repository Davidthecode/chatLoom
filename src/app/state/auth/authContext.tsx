"use client"

import { getCookie } from 'cookies-next';
import { Dispatch, SetStateAction, useContext, useEffect } from 'react';
import { createContext, useState, ReactNode } from 'react';

type AuthType = {
    isAuth: boolean,
    setIsAuth: Dispatch<SetStateAction<boolean>>,
};

export const AuthContext = createContext<AuthType | null>(null);

export const UseAuthContext: React.FC<{ children: ReactNode }> = ({ children }) => {
    const authCookie = getCookie('auth-token');
    const [isAuth, setIsAuth] = useState<boolean>(!!authCookie);

    return (
        <AuthContext.Provider value={{ isAuth, setIsAuth }}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuthContext must be used within an AuthContextProvider');
    }
    return context;
};
