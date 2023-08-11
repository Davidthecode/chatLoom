'use client'

import { createContext, useState, useContext, ReactNode } from 'react'

type AuthData = {
    username: string | null,
    photoUrl: string | null,
    email: string | null,
    userId: string | null,
    creationTime ?: string | null,
    lastSignInTime ?: string | null 
}


type AuthContextType = {
    authData: AuthData | null;
    setAuthData: (data: AuthData | null) => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const UseAuthContext: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [authData, setAuthData] = useState<null | AuthData>(null)
    return (
        <AuthContext.Provider value={{ authData, setAuthData }}>
            {children}
        </AuthContext.Provider>
    )
}