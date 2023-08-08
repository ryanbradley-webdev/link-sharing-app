import { PLATFORMS } from "./platforms"

export const generateMatchExp = (platform: string) => {
    switch (platform) {
        
        case PLATFORMS.GITHUB:
            return 'https://github.com/'

        case PLATFORMS.FRONTEND_MENTOR:
            return 'https://www.frontendmentor.io/profile/'

        case PLATFORMS.TWITTER:
            return 'https://twitter.com/'

        case PLATFORMS.LINKEDIN:
            return 'https://www.linkedin.com/in/'

        case PLATFORMS.YOUTUBE:
            return 'youtube.com/channel/'

        case PLATFORMS.FACEBOOK:
            return 'https://www.facebook.com/'

        case PLATFORMS.TWITCH:
            return 'https://www.twitch.tv/'

        case PLATFORMS.DEVTO:
            return 'https://dev.to/'

        case PLATFORMS.CODEWARS:
            return 'https://www.codewars.com/users/'

        case PLATFORMS.CODEPEN:
            return 'https://codepen.io/'

        case PLATFORMS.FREE_CODE_CAMP:
            return 'https://www.freecodecamp.org/'

        case PLATFORMS.GITLAB:
            return 'https://gitlab.com/'

        case PLATFORMS.HASHNODE:
            return 'https://hashnode.com/'

        case PLATFORMS.STACK_OVERFLOW:
            return 'https://stackoverflow.com/users/'

        default:
            return ''
    }
}

export const urlIsValid = (url: string, platform: string) => {
    const matchExp = generateMatchExp(platform)

    if (!url || !matchExp || !platform) return false

    const matchFound = url.includes(matchExp) && url.indexOf(matchExp) === 0 && url.replace(matchExp, '').length > 0

    return matchFound
}