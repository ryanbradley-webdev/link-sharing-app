import axios from 'axios'
import { dataIsUserInfo } from './typeCheck'

export const getUserInfo = async (userId: string) => {
    const apiUrl =
        import.meta.env.VITE_ENVIRONMENT === 'development' ?
        import.meta.env.VITE_DEV_API_URL :
        import.meta.env.VITE_API_URL

    if (!userId) {
        return null
    }

    const res = await axios.get(apiUrl + 'userInfo', {
        params: {
            userId
        }
    })

    if (res && res.status === 200) {
        const { userInfo } = res.data

        if (dataIsUserInfo(userInfo)) {
            return userInfo
        }

        return null
    } else {
        return null
    }
}