import { useContext } from "react";
import ImageIcon from "../../assets/ImageIcon";
import PreviewLink from "../previewLink/PreviewLink";
import styles from './profilePreview.module.css'
import { DataContext } from "../../contexts/DataContext";

export default function ProfilePreview({
    bare
}: {
    bare?: boolean
}) {
    const { userData, links, uploadedImg } = useContext(DataContext)

    return (
        <section
            className={bare ? styles.preview_bare : styles.preview}
        >

            <div className={bare ? styles.user_bare : styles.user}>

                {
                    (uploadedImg || userData.image) ? (
                        <img
                            src={uploadedImg || userData.image}
                            alt=''
                            width={104}
                            height={104}
                            className={bare ? styles.img_bare : styles.img}
                        />
                    ) : (
                        <div
                            className={bare ? styles.img_placeholder_bare : styles.img_placeholder}
                            data-transparent={!uploadedImg || !userData.image}
                        >

                            <ImageIcon />

                            <span>
                                No image
                            </span>

                        </div>
                    )
                }

                <h2
                    data-transparent={!userData.firstName && !userData.lastName}
                >
                    {userData.firstName + ' ' + userData.lastName}
                </h2>

                <p
                    data-transparent={!userData.email}
                >
                    {userData.email}
                </p>

            </div>

            <div className={styles.link_list}>

                {links.length > 0 && links.map((link, idx) => {
                    if (!bare || idx < 5) {
                        return (
                            <PreviewLink
                                link={link}
                                key={link.id}
                                bare
                            />
                        )
                    }
                })}

            </div>

        </section>
    )
}