import NoLinksIcon from "../../../assets/NoLinksIcon";
import styles from '../home.module.css'

export default function NoLinks() {
    return (
        <div className={styles.no_links}>

            <NoLinksIcon />

            <h3>
                Let&apos;s get you started
            </h3>

            <p>
                Use the &quot;Add new link&quot; button to get started. Once you have more than one link, you can reorder and edit them. We&apos;re here to help you share your profiles with everyone!
            </p>

        </div>
    )
}