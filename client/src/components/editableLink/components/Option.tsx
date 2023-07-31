import { generatePlatformIcon } from "../../../lib/generatePlatformIcon"
import styles from '../editableLink.module.css'

export default function Option({
    platform,
    onClick
}: {
    platform: string
    onClick: () => void
}) {
    return (
        <div
            onClick={onClick}
            className={styles.option}
        >

            {generatePlatformIcon(platform)}

            {platform}
            
        </div>
    )
}