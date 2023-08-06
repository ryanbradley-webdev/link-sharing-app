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
    const { userInfo, links, imgPreviewPath } = useContext(DataContext)

    return (
        <section
            className={bare ? styles.preview_bare : styles.preview}
        >

            <div className={bare ? styles.user_bare : styles.user}>

                {
                    (imgPreviewPath || userInfo.profileImg) ? (
                        <img
                            src={imgPreviewPath || userInfo.profileImg}
                            alt=''
                            width={104}
                            height={104}
                            className={bare ? styles.img_bare : styles.img}
                        />
                    ) : (
                        <div
                            className={bare ? styles.img_placeholder_bare : styles.img_placeholder}
                            data-transparent={!imgPreviewPath || !userInfo.profileImg}
                        >

                            <ImageIcon />

                            <span>
                                No image
                            </span>

                        </div>
                    )
                }

                <h2
                    data-transparent={!userInfo.firstName && !userInfo.lastName}
                >
                    {userInfo.firstName + ' ' + userInfo.lastName}
                </h2>

                <p
                    data-transparent={!userInfo.email}
                >
                    {userInfo.email}
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