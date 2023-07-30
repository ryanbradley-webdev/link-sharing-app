import Button from '../../components/button/Button'
import styles from './preview.module.css'

export default function Preview() {
    return (
        <main className={styles.main}>
            
            <section className={styles.btn_div}>

                <Button
                    alt
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