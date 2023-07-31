import { PLATFORMS } from "../../../lib/platforms"
import Option from "./Option"
import styles from '../editableLink.module.css'
import { generatePlatformIcon } from "../../../lib/generatePlatformIcon"
import Chevron from "../../../assets/Chevron"
import { useState } from "react"

export default function Select({
    selectedPlatform
}: {
    selectedPlatform: string
}) {
    const [isVisible, setIsVisible] = useState(false)

    return (
        <label
            className={styles.label}
        >

            {generatePlatformIcon(selectedPlatform)}

            <span>
                Platform
            </span>

            <div
                className={styles.input}
                onClick={() => setIsVisible(!isVisible)}
            >
                {selectedPlatform}
            </div>
            
            <div
                className={styles.dropdown}
                aria-hidden={!isVisible}
            >

                {Object.values(PLATFORMS).map(platform => (

                    <Option
                        key={crypto.randomUUID()}
                        platform={platform}
                    />

                ))}

            </div>

            <Chevron />

        </label>
    )
}