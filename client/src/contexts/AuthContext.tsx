import { ReactNode, createContext, useEffect, useState } from 'react'

type AuthContext = {
    user: null
}

export const AuthContext = createContext({} as AuthContext)

export default function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState(null)

    const value = {
        user
    }

    useEffect(() => {
        setUser(null)
    }, [])

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}