import { ReactNode, createContext, useState } from 'react'
import { Link, UserData } from './DataContext'
import { PLATFORMS } from '../lib/platforms'

type AuthContext = {
    user: null | User
    login: (email: string, password: string) => void
}

type User = {
    id: string
    userData: UserData
    links: Link[]
}

export const AuthContext = createContext({} as AuthContext)

export default function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)

    const login = (email: string, password: string) => {
        if (!email || !password) return

        try {
            setUser({
                id: crypto.randomUUID(),
                userData: {
                    image: '',
                    firstName: 'Tester',
                    lastName: 'McGee',
                    email: 'test@email.com'
                },
                links: [
                    {
                        id: crypto.randomUUID(),
                        platform: PLATFORMS.GITHUB,
                        linkUrl: 'https://github.com/ryanbradley-webdev',
                        inputRef: null
                    }
                ]
            })
        } catch (e) {
            setUser(null)
        }
    }

    const value = {
        user,
        login
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}