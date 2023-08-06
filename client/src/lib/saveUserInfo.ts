import axios from 'axios'

export const saveUserInfo = async (userId: string, userInfo: UserInfo) => {
    const apiUrl =
        import.meta.env.VITE_ENVIRONMENT === 'development' ?
        import.meta.env.VITE_DEV_API_URL :
        import.meta.env.VITE_API_URL

    if (!userId || !userInfo) {
        return null
    }

    const res = await axios.patch(apiUrl + 'links', {
        userId,
        userInfo
    }) 

    return res
}