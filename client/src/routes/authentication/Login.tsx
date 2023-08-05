import { useRef, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import DevlinksLogoLg from "../../assets/DevlinksLogoLg"
import Button from "../../components/button/Button"
import EmailIcon from "../../assets/EmailIcon"
import LockIcon from "../../assets/LockIcon"
import styles from './authentication.module.css'
import useForm from "../../hooks/useForm"
import { AuthContext } from "../../contexts/AuthContext"

export default function Login() {
    const {
        login,
        loginFailed,
        loginError
    } = useContext(AuthContext)

    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)

    const {
        validateInput,
        validateForm
    } = useForm([
        emailRef,
        passwordRef
    ])

    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (
            !emailRef.current ||
            !passwordRef.current
        ) return

        const success = await login(emailRef.current.value, passwordRef.current.value)

        if (success) {
            navigate('/')
        }
    }

    return (
        <main className={styles.main}>

            <DevlinksLogoLg />

            <div className={styles.header}>

                <h2>
                    Login
                </h2>

                <p>
                    Add your details below to get back into the app
                </p>

            </div>

            <form
                action=""
                className={styles.form}
                onSubmit={handleSubmit}
            >

                <label htmlFor="email">

                    <EmailIcon />

                    <span>
                        Email address
                    </span>

                    <input
                        type="email"
                        name="email"
                        id="email"
                        ref={emailRef}
                        onChange={validateInput}
                        placeholder="e.g. alex@email.com"
                        required
                    />

                </label>

                <label htmlFor="password">

                    <LockIcon />

                    <span>
                        Password
                    </span>

                    <input
                        type="password"
                        name="password"
                        id="password"
                        ref={passwordRef}
                        onChange={validateInput}
                        placeholder="Enter your password"
                        required
                    />

                </label>

                {loginFailed && <p className={styles.login_failure}>
                    Please check your login credentials
                </p>}

                {loginError && <p className={styles.login_failure}>
                    Something went wrong
                </p>}

                <Button
                    onClick={validateForm}
                >
                    {loginError ? 'Something went wrong' : 'Login'}
                </Button>

            </form>

            <p style={{ textAlign: 'center' }}>
                Don&apos;t have an account? <Link to='/signup'>Create account</Link>
            </p>

        </main>
    )
}