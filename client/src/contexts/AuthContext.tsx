import { ReactNode, createContext, useState } from 'react'
import { Link, UserData } from './DataContext'
import { PLATFORMS } from '../lib/platforms'
import axios from 'axios'

type AuthContext = {
    user: null | User
    session: unknown
    login: (email: string, password: string) => boolean
    signup: (email: string, password: string, passwordConfirm: string) => Promise<boolean>
    loginFailed: boolean
    loginError: boolean
    signupError: boolean
    passwordMismatch: boolean
    shortPassword: boolean
}

type User = {
    id: string
    userData: UserData
    links: Link[]
}

export const AuthContext = createContext({} as AuthContext)

export default function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [session, setSession] = useState(null)
    const [loginFailed, setLoginFailed] = useState(false)
    const [loginError, setLoginError] = useState(false)
    const [signupError, setSignupError] = useState(false)
    const [passwordMismatch, setPasswordMismatch] = useState(false)
    const [shortPassword, setShortPassword] = useState(false)

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

    const signup = async (email: string, password: string, passwordConfirm: string) => {
        if (!email || !password) return false

        if (password.length < 8) {
            setShortPassword(true)
            return false
        } else {
            setShortPassword(false)
        }

        if (password !== passwordConfirm) {
            setPasswordMismatch(true)
            return false
        } else {
            setPasswordMismatch(false)
        }

        try {
            const apiUrl =
                import.meta.env.VITE_ENVIRONMENT === 'development' ?
                import.meta.env.VITE_DEV_API_URL :
                import.meta.env.VITE_API_URL

            if (!apiUrl) throw new Error()

            const { data, status } = await axios.post(apiUrl + 'signup', {
                email,
                password
            })

            if (status === 201) {
                const { user, session } = data

                setUser(user)
                setSession(session)

                console.log(user)
            }

            return true

        } catch (e) {

            setUser(null)
            setSignupError(true)

            return false
        }
    }

    const value = {
        user,
        session,
        login,
        signup,
        loginFailed,
        loginError,
        signupError,
        passwordMismatch,
        shortPassword
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}