import { useRef } from "react"
import { Link } from "react-router-dom"
import DevlinksLogoLg from "../../assets/DevlinksLogoLg"
import Button from "../../components/button/Button"
import EmailIcon from "../../assets/EmailIcon"
import LockIcon from "../../assets/LockIcon"
import styles from './authentication.module.css'

export default function Login() {
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)

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

            <form action="" className={styles.form}>

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
                        placeholder="Enter your password"
                        required
                    />

                </label>

                <Button>
                    Login
                </Button>

            </form>

            <p style={{ textAlign: 'center' }}>
                Don&apos;t have an account? <Link to='/signup'>Create account</Link>
            </p>

        </main>
    )
}