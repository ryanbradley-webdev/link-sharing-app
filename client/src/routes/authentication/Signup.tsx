import { Link } from "react-router-dom"
import DevlinksLogoLg from "../../assets/DevlinksLogoLg"
import styles from './authentication.module.css'
import Button from "../../components/button/Button"
import EmailIcon from "../../assets/EmailIcon"
import LockIcon from "../../assets/LockIcon"

export default function Signup() {
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

            <form action="" onSubmit={e => e.preventDefault()} className={styles.form}>

                <label htmlFor="email">
                    
                    <EmailIcon />
                    
                    <span>
                        Email address
                    </span>
                    
                    <input type="email" name="email" id="email" required />
                    
                </label>

                <label htmlFor="create-password">
                    
                    <LockIcon />
                    
                    <span>
                        Create password
                    </span>
                    
                    <input type="password" name="create-password" id="create-password" required />
                    
                </label>

                <label htmlFor="confirm-password">
                    
                    <LockIcon />
                    
                    <span>
                        Confirm password
                    </span>
                    
                    <input type="password" name="confirm-password" id="confirm-password" required />
                    
                </label>

                <p className={styles.password_reqs}>
                    Password must contain at least 8 characters
                </p>

                <Button>
                    Create new account
                </Button>

            </form>

            <p style={{ textAlign: 'center' }}>
                Already have an account? <Link to='/login'>Login</Link>
            </p>

        </main>
    )
}