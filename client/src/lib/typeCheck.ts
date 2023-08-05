export const dataIsLink = (data: unknown): data is Link => {
    if (!data) return false

    return Object.keys(data).includes('linkUrl') && Object.keys(data).includes('platform')
}

export const dataIsUserData = (data: unknown): data is UserData => {
    if (!data) return false

    const res =
        Object.keys(data).includes('firstName')
        && Object.keys(data).includes('lastName')
        && Object.keys(data).includes('links')

    return res
}