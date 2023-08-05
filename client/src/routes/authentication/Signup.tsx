import { useRef, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import DevlinksLogoLg from "../../assets/DevlinksLogoLg"
import Button from "../../components/button/Button"
import EmailIcon from "../../assets/EmailIcon"
import LockIcon from "../../assets/LockIcon"
import styles from './authentication.module.css'
import useForm from "../../hooks/useForm"
import { AuthContext } from "../../contexts/AuthContext"

export default function Signup() {
    const {
        signup,
        passwordMismatch,
        shortPassword,
        signupError
    } = useContext(AuthContext)

    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const passwordConfirmRef = useRef<HTMLInputElement>(null)

    const {
        validateInput,
        validateForm,
    } = useForm([
        emailRef,
        passwordRef,
        passwordConfirmRef
    ])

    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (
            !emailRef.current ||
            !passwordRef.current ||
            !passwordConfirmRef.current
        ) return

        const success = await signup(
            emailRef.current.value,
            passwordRef.current.value,
            passwordConfirmRef.current.value
        )

        if (success) {
            navigate('/')
        }
    }

    return (
        <main className={styles.main}>

            <DevlinksLogoLg />

            <div className={styles.header}>

                <h2>
                    Create Account
                </h2>

                <p>
                    Let&apos;s get you started sharing your links!
                </p>

            </div>

            <form
                action=""
                onSubmit={handleSubmit}
                className={styles.form}
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
                        placeholder="e.g. alex@email.com"
                        onChange={validateInput}
                        required
                    />
                    
                </label>

                <label htmlFor="create-password">
                    
                    <LockIcon />
                    
                    <span>
                        Create password
                    </span>
                    
                    <input
                        type="password"
                        name="create-password"
                        id="create-password"
                        ref={passwordRef}
                        placeholder="At least 8 characters"
                        onChange={validateInput}
                        required
                    />
                    
                </label>

                <label htmlFor="confirm-password">
                    
                    <LockIcon />
                    
                    <span>
                        Confirm password
                    </span>
                    
                    <input
                        type="password"
                        name="confirm-password"
                        id="confirm-password"
                        ref={passwordConfirmRef}
                        placeholder="At least 8 characters"
                        onChange={validateInput}
                        required
                    />
                    
                </label>

                <p className={shortPassword ? styles.login_failure : styles.password_reqs}>
                    Password must contain at least 8 characters
                </p>

                {passwordMismatch && <p className={styles.login_failure}>
                    Passwords do not match
                </p>}

                {signupError && <p className={styles.login_failure}>
                    Failed to create account
                </p>}

                <Button
                    onClick={validateForm}
                >
                    {signupError ? 'Something went wrong' : 'Create new account'}
                </Button>

            </form>

            <p style={{ textAlign: 'center' }}>
                Already have an account? <Link to='/login'>Login</Link>
            </p>

        </main>
    )
}