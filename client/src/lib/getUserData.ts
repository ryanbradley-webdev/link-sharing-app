import axios from 'axios'
import { dataIsUserData } from './typeCheck'

export const getUserData = async (userId: string) => {
    const apiUrl =
        import.meta.env.VITE_ENVIRONMENT === 'development' ?
        import.meta.env.VITE_DEV_API_URL :
        import.meta.env.VITE_API_URL

    if (!userId) {
        return null
    }

    const res = await axios.get(apiUrl + 'userData', {
        params: {
            userId
        }
    })

    if (res && res.status === 200) {
        const { userData } = res.data

        if (userData.length !== 1) return null

        if (dataIsUserData(userData[0])) {

            const {
                firstName,
                lastName,
                email,
                image,
                links
            } = userData[0]

            return {
                userInfo: {
                    firstName,
                    lastName,
                    email,
                    image
                },
                links
            }
        }
    } else {
        return null
    }
}