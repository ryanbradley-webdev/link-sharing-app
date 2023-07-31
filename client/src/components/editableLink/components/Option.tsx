import { generatePlatformIcon } from "../../../lib/generatePlatformIcon"

export default function Option({
    platform
}: {
    platform: string
}) {
    return (
        <div>

            {generatePlatformIcon(platform)}

            {platform}
            
        </div>
    )
}