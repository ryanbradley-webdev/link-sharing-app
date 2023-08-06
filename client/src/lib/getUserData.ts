import axios from 'axios'
import { dataIsUserInfo } from './typeCheck'

export const getUserData = async (userId: string) => {
    const apiUrl =
        import.meta.env.VITE_ENVIRONMENT === 'development' ?
        import.meta.env.VITE_DEV_API_URL :
        import.meta.env.VITE_API_URL

    if (!userId) {
        return null
    }

    const userData: UserData = {
        userInfo: {
            firstName: '',
            lastName: '',
            email: '',
            profileImg: ''
        },
        links: []
    }

    const res = await axios.get(apiUrl, {
        params: {
            userId
        }
    })

    if (res && !res.data.error) {
        const { userInfo, links } = res.data

        if (dataIsUserInfo(userInfo)) {
            userData.userInfo = userInfo
        }

        if (links.length > 0) {
            userData.links = links
        }

        return userData
    } else {
        return null
    }
}