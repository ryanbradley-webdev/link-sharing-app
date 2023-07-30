import EmailIcon from "../assets/EmailIcon"
import LinksIconHeader from "../assets/LinksIconHeader"

export const generatePlatformIcon = (platform: string) => {
    return platform ? (
        <LinksIconHeader />
    ) : (
        <EmailIcon />
    )
}