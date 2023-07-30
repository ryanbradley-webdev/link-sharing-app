import { useNavigate } from 'react-router-dom'
import Button from '../../components/button/Button'
import styles from './preview.module.css'
import ProfilePreview from '../../components/profilePreview/ProfilePreview'

export default function Preview() {
    const navigate = useNavigate()

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

                    <Button>
                        Share Link
                    </Button>

                </section>

            </div>

            <ProfilePreview />

        </main>
    )
}