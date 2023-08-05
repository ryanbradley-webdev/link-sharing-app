import axios from 'axios'
import { Link } from '../../types'
import { dataIsLink } from './typeCheck'

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

        const verifiedLinks: Link[] = []

        links.forEach((link: unknown) => {
            if (dataIsLink(link)) {
                verifiedLinks.push(link)
            }
        })

        return verifiedLinks
    } else {
        return []
    }
}