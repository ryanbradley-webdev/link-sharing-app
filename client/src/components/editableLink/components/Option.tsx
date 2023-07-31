import { generatePlatformIcon } from "../../../lib/generatePlatformIcon"

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
        >

            {generatePlatformIcon(platform)}

            {platform}
            
        </div>
    )
}