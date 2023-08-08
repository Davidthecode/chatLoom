'use client'

import { createContext, useState, useContext, ReactNode } from 'react'

type AuthData = {
    username: string | null,
    photo: string | null,
    email: string | null
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

export function useAuth() {
    return (useContext(AuthContext))
}