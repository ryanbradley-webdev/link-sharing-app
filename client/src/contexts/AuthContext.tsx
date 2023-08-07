import { ReactNode, createContext, useEffect, useState } from 'react'
import axios from 'axios'
import { User, Session } from '@supabase/supabase-js'

export const AuthContext = createContext({} as AuthContext)

export default function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [session, setSession] = useState<Session | null>(null)
    const [loginFailed, setLoginFailed] = useState(false)
    const [loginError, setLoginError] = useState(false)
    const [signupError, setSignupError] = useState(false)
    const [passwordMismatch, setPasswordMismatch] = useState(false)
    const [shortPassword, setShortPassword] = useState(false)

    const apiUrl =
        import.meta.env.VITE_ENVIRONMENT === 'development' ?
        import.meta.env.VITE_DEV_API_URL :
        import.meta.env.VITE_API_URL

    const login = async (email: string, password: string) => {
        if (!email || !password) return false

        setLoginFailed(false)

        try {
            const { data, status } = await axios.post(apiUrl + 'login', {
                email,
                password
            })

            if (status === 200) {
                const { user, session } = data

                setUser(user)
                setSession(session)

                return true
            } else {
                setLoginFailed(true)

                return false
            }

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
            if (!apiUrl) throw new Error()

            const { data, status } = await axios.post(apiUrl + 'signup', {
                email,
                password
            })

            if (status === 201) {
                const { user, session } = data

                setUser(user)
                setSession(session)

                return true
            } else {
                return false
            }

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

    useEffect(() => {
        const userSession = sessionStorage.getItem('user')

        if (userSession && !user) {
            setUser(JSON.parse(userSession))
        }

        if (user) {
            sessionStorage.setItem('user', JSON.stringify(user))
        }
    }, [user])

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}