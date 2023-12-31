type DataContext = {
    links: Link[]
    userInfo: UserInfo
    slug: string
    imgPreviewPath: string
    addLink: () => void
    removeLink: (id: string) => void
    updateLink: (updatedLink: Link) => void
    addRef: (id: string, ref: React.RefObject<HTMLInputElement>) => void
    reorderLinks: (targetId: string, newIdx: number) => void
    updateFirstName: (newName: string) => void
    updateLastName: (newName: string) => void
    updateEmail: (newEmail: string) => void
    previewImg: (e: React.ChangeEvent<HTMLInputElement>) => void
    saveLinksToDb: () => Promise<null | undefined>
    saveUserInfoToDb: () => Promise<null | undefined>
}

type AuthContext = {
    user: null | User
    session: Session | null
    login: (email: string, password: string) => Promise<boolean>
    signup: (email: string, password: string, passwordConfirm: string) => Promise<boolean>
    loginFailed: boolean
    loginError: boolean
    signupError: boolean
    passwordMismatch: boolean
    shortPassword: boolean
}

type Link = {
    id: string,
    platform: string
    linkUrl: string
    inputRef: React.RefObject<HTMLInputElement> | null
    listIndex: number
}

type UserInfo = {
    firstName: string
    lastName: string
    email: string
    profileImg: string
}

type UserData = {
    userInfo: UserInfo
    links: Link[]
    slug: string
}

type APIData = unknown[] | unknown