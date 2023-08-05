import axios from 'axios'

export const saveLinks = async (userId: string, links: Link[]) => {
    const apiUrl =
        import.meta.env.VITE_ENVIRONMENT === 'development' ?
        import.meta.env.VITE_DEV_API_URL :
        import.meta.env.VITE_API_URL

    if (!userId) {
        return null
    }

    const res = await axios.patch(apiUrl + 'links', {
        userId,
        links: links.map(link => ({
            platform: link.platform,
            linkUrl: link.linkUrl
        }))
    }) 

    return res
}