export type User = {
    id: string
    email: string
    userData: UserData
    links: Link[]
}

export type Link = {
    id: string,
    platform: string
    linkUrl: string
    inputRef: React.RefObject<HTMLInputElement> | null
}

export type UserData = {
    firstName: string
    lastName: string
    email: string
    image: string
}