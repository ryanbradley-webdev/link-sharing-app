import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/button/Button'
import styles from './preview.module.css'
import ProfilePreview from '../../components/profilePreview/ProfilePreview'
import Toast from '../../components/toast/Toast'
import LinksIconHeader from '../../assets/LinksIconHeader'
import { AuthContext } from '../../contexts/AuthContext'
import { DataContext } from '../../contexts/DataContext'

export default function Preview() {
    const { user } = useContext(AuthContext)
    const { slug } = useContext(DataContext)

    const [linkCopied, setLinkCopied] = useState(false)

    const navigate = useNavigate()

    const copyLink = () => {
        if (user) {
            navigator.clipboard.writeText(`http://localhost:5173/${slug}`)

            setLinkCopied(true)

            setTimeout(() => {
                setLinkCopied(false)
            }, 3500)
        }
    }

    return (
        <main className={styles.main}>

            <div className={styles.background}></div>
            
            <div className={styles.btn_div_wrapper}>

                <section className={styles.btn_div}>

                    <Button
                        alt
                        onClick={() => navigate(-1)}
                    >
                        Back to Editor
                    </Button>

                    <Button
                        onClick={copyLink}
                    >
                        Share Link
                    </Button>

                </section>

            </div>

            <ProfilePreview />

            <Toast
                isVisible={linkCopied}
            >

                <LinksIconHeader />

                <span>
                    The link has been copied to your clipboard!
                </span>

            </Toast>

        </main>
    )
}