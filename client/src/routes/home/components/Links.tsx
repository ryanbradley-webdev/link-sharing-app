import { useState } from 'react'
import Button from '../../../components/button/Button'
import styles from '../home.module.css'
import NoLinks from './NoLinks'

export default function Links() {
    const [links, setLinks] = useState([])

    return (
        <main className={styles.main}>

            <section className={styles.snapshot}>



            </section>

            <section>

                <div className={styles.heading}>

                    <h3>
                        Customize your links
                    </h3>

                    <p>
                        Add/edit/remove links below and then share all your profiles with the world!
                    </p>

                    <Button
                        alt
                        onClick={undefined}
                    >
                        &#43; Add new link
                    </Button>

                </div>

                <div className={styles.links}>

                    {
                        links?.length > 0 ? (
                            links.map(link => <p key={crypto.randomUUID()}>{link}</p>)
                        ) : (
                            <NoLinks />
                        )
                    }

                </div>

            </section>

        </main>
    )
}