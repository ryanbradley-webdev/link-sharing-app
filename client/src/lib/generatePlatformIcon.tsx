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

export const generatePlatformIcon = (platform: string) => {
    switch (platform) {

        case PLATFORMS.GITHUB:
            return <GitHubIcon />

        case PLATFORMS.FRONTEND_MENTOR:
            return <FrontendMentorIcon />

        case PLATFORMS.TWITTER:
            return <TwitterIcon />

        case PLATFORMS.LINKEDIN:
            return <LinkedInIcon />

        case PLATFORMS.YOUTUBE:
            return <YouTubeIcon />

        case PLATFORMS.FACEBOOK:
            return <FacebookIcon />

        case PLATFORMS.TWITCH:
            return <TwitchIcon />

        case PLATFORMS.DEVTO:
            return <DevtoIcon />

        case PLATFORMS.CODEWARS:
            return <CodewarsIcon />

        case PLATFORMS.CODEPEN:
            return <CodepenIcon />

        case PLATFORMS.FREE_CODE_CAMP:
            return <FreeCodeCampIcon />

        case PLATFORMS.GITLAB:
            return <GitLabIcon />

        case PLATFORMS.HASHNODE:
            return <HashnodeIcon />

        case PLATFORMS.STACK_OVERFLOW:
            return <StackOverflowIcon />

        default:
            return <LinkIcon />

    }
}