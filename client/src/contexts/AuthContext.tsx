import { ReactNode, createContext, useState } from 'react'
import { Link, UserData } from './DataContext'
import { PLATFORMS } from '../lib/platforms'

type AuthContext = {
    user: null | User
    login: (email: string, password: string) => boolean
    loginFailed: boolean
    loginError: boolean
}

type User = {
    id: string
    userData: UserData
    links: Link[]
}

export const AuthContext = createContext({} as AuthContext)

export default function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [loginFailed, setLoginFailed] = useState(false)
    const [loginError, setLoginError] = useState(false)

    const login = (email: string, password: string) => {
        if (!email || !password) return false

        setLoginFailed(false)

        try {
            if (email !== 'test@email.com' || password !== 'password1234') {
                setLoginFailed(true)
                return false
            }

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

            return true

        } catch (e) {

            setUser(null)
            setLoginError(true)

            return false
        }
    }

    const value = {
        user,
        login,
        loginFailed,
        loginError
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}