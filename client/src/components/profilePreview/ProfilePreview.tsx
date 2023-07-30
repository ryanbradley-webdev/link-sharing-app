import { useContext } from "react";
import ImageIcon from "../../assets/ImageIcon";
import PreviewLink from "../previewLink/PreviewLink";
import styles from './profilePreview.module.css'
import { DataContext } from "../../contexts/DataContext";

export default function ProfilePreview() {
    const { userData, links, uploadedImg } = useContext(DataContext)

    return (
        <section className={styles.preview}>

            <div className={styles.user}>

                {
                    (uploadedImg || userData.image) ? (
                        <img src={uploadedImg || userData.image} alt='' width={104} height={104} className={styles.img} />
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
    )
}