import { useState } from 'react'
import Button from '../../../components/button/Button'
import styles from '../home.module.css'
import NoLinks from './NoLinks'
import EditableLink from '../../../components/editableLink/EditableLink'
import { PLATFORMS } from '../../../lib/platforms'

export type Link = {
    id: string,
    platform: string
    linkUrl: string
}

const blankLink = {
    platform: PLATFORMS.GITHUB,
    linkUrl: ''
}

export default function Links() {
    const [links, setLinks] = useState<Link[]>([])

    const addLink = () => {
        setLinks(prevLinks => ([
            ...prevLinks,
            {
                ...blankLink,
                id: crypto.randomUUID()
            }
        ]))
    }

    const removeLink = (id: string) => {
        setLinks(prevLinks => prevLinks.filter(link => link.id !== id))
    }

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
                                removeLink={removeLink}
                                setLinks={setLinks}
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