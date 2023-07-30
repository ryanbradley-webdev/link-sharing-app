import { useContext } from 'react'
import Button from '../../../components/button/Button'
import styles from '../home.module.css'
import NoLinks from './NoLinks'
import EditableLink from '../../../components/editableLink/EditableLink'
import { DataContext } from '../../../contexts/DataContext'

export default function Links() {
    const { links, addLink } = useContext(DataContext)

    return (
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
                    onClick={addLink}
                >
                    &#43; Add new link
                </Button>

            </div>

            <div className={styles.links}>

                {
                    links?.length > 0 ? (
                        links.map((link, idx) => (
                            <EditableLink
                                key={link.id}
                                index={idx}
                                { ...link }
                            />
                        ))
                    ) : (
                        <NoLinks />
                    )
                }

            </div>

            <div className={styles.save_btn_container}>

                <Button
                    disabled={!links || links.length === 0}
                >
                    Save
                </Button>

            </div>

        </section>
    )
}