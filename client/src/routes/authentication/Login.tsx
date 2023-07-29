import { Link } from "react-router-dom"
import DevlinksLogoLg from "../../assets/DevlinksLogoLg"
import styles from './authentication.module.css'
import Button from "../../components/button/Button"

export default function Login() {
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
                    <span>
                        Email address
                    </span>
                    <input type="email" name="email" id="email" required />
                </label>

                <label htmlFor="password">
                    <span>
                        Password
                    </span>
                    <input type="password" name="password" id="password" required />
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