import { ReactNode, createContext, useEffect, useState } from 'react'

export const AuthContext = createContext({} as { user: null })

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