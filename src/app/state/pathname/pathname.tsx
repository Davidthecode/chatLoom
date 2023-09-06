'use client';

import {usePathname} from 'next/navigation';
import {createContext, useContext, useEffect, useState, ReactNode} from 'react';

type PathnameType = {
    name: string | null
}

export const PathnameContext = createContext<PathnameType | null>(null);

export const UsePathnameContext: React.FC<{ children: ReactNode }> = ({children})=> {
    const pathname = usePathname()
    // console.log(pathname);
    
    const [name, setName] = useState<string | null>(pathname)
    return(
        <PathnameContext.Provider value={{name}}>
            {children}
        </PathnameContext.Provider>
    )
}

export const usePathnameContext = () => {
    const context = useContext(PathnameContext);
    if (!context) {
        throw new Error('error');
    }
    return context;
}