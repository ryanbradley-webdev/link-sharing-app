import { PLATFORMS } from "./platforms"

export const generateBackgroundColor = (platform: string) => {
    switch (platform) {

        case PLATFORMS.GITHUB:
            return '#1A1A1A'

        case PLATFORMS.FRONTEND_MENTOR:
            return '#FFFFFF'

        case PLATFORMS.TWITTER:
            return '#43B7E9'

        case PLATFORMS.LINKEDIN:
            return '#2D68FF'

        case PLATFORMS.YOUTUBE:
            return '#EE3939'

        case PLATFORMS.FACEBOOK:
            return '#2442AC'

        case PLATFORMS.TWITCH:
            return '#EE3FC8'

        case PLATFORMS.DEVTO:
            return '#333333'

        case PLATFORMS.CODEWARS:
            return '#8A1A50'

        case PLATFORMS.CODEPEN:
            return '#333333'

        case PLATFORMS.FREE_CODE_CAMP:
            return '#302267'

        case PLATFORMS.GITLAB:
            return '#EB4925'

        case PLATFORMS.HASHNODE:
            return '#0330D1'

        case PLATFORMS.STACK_OVERFLOW:
            return '#EC7100'

        default:
            return 'var(--clr-purple-pri)'

    }
}