import CodepenIcon from "../assets/CodepenIcon"
import CodewarsIcon from "../assets/CodewarsIcon"
import DevtoIcon from "../assets/DevtoIcon"
import FacebookIcon from "../assets/FacebookIcon"
import FreeCodeCampIcon from "../assets/FreeCodeCampIcon"
import FrontendMentorIcon from "../assets/FrontendMentorIcon"
import GitHubIcon from "../assets/GitHubIcon"
import GitLabIcon from "../assets/GitLabIcon"
import HashnodeIcon from "../assets/HashnodeIcon"
import LinkIcon from "../assets/LinkIcon"
import LinkedInIcon from "../assets/LinkedInIcon"
import StackOverflowIcon from "../assets/StackOverflowIcon"
import TwitchIcon from "../assets/TwitchIcon"
import TwitterIcon from "../assets/TwitterIcon"
import YouTubeIcon from "../assets/YouTubeIcon"
import { PLATFORMS } from "./platforms"

export const generatePlatformIcon = (platform: string, color?: boolean) => {
    switch (platform) {

        case PLATFORMS.GITHUB:
            return <GitHubIcon color={color} />

        case PLATFORMS.FRONTEND_MENTOR:
            return <FrontendMentorIcon />

        case PLATFORMS.TWITTER:
            return <TwitterIcon color={color} />

        case PLATFORMS.LINKEDIN:
            return <LinkedInIcon color={color} />

        case PLATFORMS.YOUTUBE:
            return <YouTubeIcon color={color} />

        case PLATFORMS.FACEBOOK:
            return <FacebookIcon color={color} />

        case PLATFORMS.TWITCH:
            return <TwitchIcon color={color} />

        case PLATFORMS.DEVTO:
            return <DevtoIcon color={color} />

        case PLATFORMS.CODEWARS:
            return <CodewarsIcon color={color} />

        case PLATFORMS.CODEPEN:
            return <CodepenIcon color={color} />

        case PLATFORMS.FREE_CODE_CAMP:
            return <FreeCodeCampIcon color={color} />

        case PLATFORMS.GITLAB:
            return <GitLabIcon color={color} />

        case PLATFORMS.HASHNODE:
            return <HashnodeIcon color={color} />

        case PLATFORMS.STACK_OVERFLOW:
            return <StackOverflowIcon color={color} />

        default:
            return <LinkIcon />

    }
}