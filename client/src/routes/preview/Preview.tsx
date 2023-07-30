import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/button/Button'
import styles from './preview.module.css'
import { DataContext } from '../../contexts/DataContext'
import ImageIcon from '../../assets/ImageIcon'
import PreviewLink from '../../components/previewLink/PreviewLink'

export default function Preview() {
    const { userData, links } = useContext(DataContext)

    const navigate = useNavigate()

    return (
        <main className={styles.main}>

            <div className={styles.background}></div>
            
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

            <section className={styles.preview}>

                <div className={styles.user}>

                    {
                        userData.image ? (
                            <img src={userData.image} alt='' width={104} height={104} className={styles.img} />
                        ) : (
                            <div className={styles.img_placeholder}>

                                <ImageIcon />

                                <span>
                                    No image
                                </span>

                            </div>
                        )
                    }

                    <h2>
                        {userData.firstName + ' ' + userData.lastName}
                    </h2>

                    <p>
                        {userData.email}
                    </p>

                </div>

                <div className={styles.link_list}>

                    {links.length > 0 && links.map(link => (
                        <PreviewLink
                            link={link}
                            key={link.id}
                        />
                    ))}

                </div>

            </section>

        </main>
    )
}