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
    listIndex: number
}

export type UserInfo = {
    firstName: string
    lastName: string
    email: string
    image: string
}

export type UserData = UserInfo & {
    links: Link[]
}

export type APIData = unknown[] | unknown