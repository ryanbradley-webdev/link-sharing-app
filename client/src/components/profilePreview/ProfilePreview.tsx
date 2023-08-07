import { useContext } from "react";
import ImageIcon from "../../assets/ImageIcon";
import PreviewLink from "../previewLink/PreviewLink";
import styles from './profilePreview.module.css'
import { DataContext } from "../../contexts/DataContext";

export default function ProfilePreview({
    bare,
    userData
}: {
    bare?: boolean,
    userData?: UserData | null | undefined
}) {
    const { userInfo, links, imgPreviewPath } = useContext(DataContext)

    const firstName = userData?.userInfo.firstName || userInfo?.firstName
    const lastName = userData?.userInfo.lastName || userInfo?.lastName
    const email = userData?.userInfo.email || userInfo?.email
    const profileImg = userData?.userInfo.profileImg || userInfo?.profileImg
    const displayLinks = userData?.links || links

    return (
        <section
            className={bare ? styles.preview_bare : styles.preview}
        >

            <div className={bare ? styles.user_bare : styles.user}>

                {
                    (imgPreviewPath || profileImg) ? (
                        <img
                            src={imgPreviewPath || profileImg}
                            alt=''
                            width={104}
                            height={104}
                            className={bare ? styles.img_bare : styles.img}
                        />
                    ) : (
                        <div
                            className={bare ? styles.img_placeholder_bare : styles.img_placeholder}
                            data-transparent={!imgPreviewPath || !profileImg}
                        >

                            <ImageIcon />

                            <span>
                                No image
                            </span>

                        </div>
                    )
                }

                <h2
                    data-transparent={!firstName && !lastName}
                >
                    {firstName + ' ' + lastName}
                </h2>

                <p
                    data-transparent={!email}
                >
                    {email}
                </p>

            </div>

            <div className={styles.link_list}>

                {displayLinks.length > 0 && displayLinks.map((link, idx) => {
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