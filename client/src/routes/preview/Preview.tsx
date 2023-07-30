import { useNavigate } from 'react-router-dom'
import Button from '../../components/button/Button'
import styles from './preview.module.css'

export default function Preview() {
    const navigate = useNavigate()

    return (
        <main className={styles.main}>
            
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

            <section>

        

            </section>

        </main>
    )
}