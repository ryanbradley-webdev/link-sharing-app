import RightArrowIcon from '../../assets/RightArrowIcon'
import { Link } from '../../contexts/DataContext'
import { generatePlatformIcon } from '../../lib/generatePlatformIcon'
import styles from './previewLink.module.css'

export default function PreviewLink({
    link
}: {
    link: Link
}) {
    return (
        <button
            className={styles.button}
        >

            {generatePlatformIcon(link.platform)}

            <span>
                {link.platform}
            </span>

            <RightArrowIcon />

        </button>
    )
}