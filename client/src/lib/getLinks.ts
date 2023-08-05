import axios from 'axios'

export const getLinks = async (userId: string) => {
    const apiUrl =
        import.meta.env.VITE_ENVIRONMENT === 'development' ?
        import.meta.env.VITE_DEV_API_URL :
        import.meta.env.VITE_API_URL

    if (!userId) {
        return []
    }

    const res = await axios.get(apiUrl + 'links', {
        params: {
            userId
        }
    })

    if (res && res.status === 200) {
        const { links } = res.data

        return links
    } else {
        return []
    }
}