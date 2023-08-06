import { ReactNode, createContext, useEffect, useState, useContext } from 'react'
import { PLATFORMS } from '../lib/platforms'
import { AuthContext } from './AuthContext'
import { getUserData } from '../lib/getUserData'
import { dataIsLink } from '../lib/typeCheck'
import { getLinks } from '../lib/getLinks'
import { saveLinks } from '../lib/saveLinks'
import { getUserInfo } from '../lib/getUserInfo'
import { saveUserInfo } from '../lib/saveUserInfo'

const blankLink = {
    platform: PLATFORMS.GITHUB,
    linkUrl: '',
    inputRef: null
}

const blankUser = {
    firstName: '',
    lastName: '',
    email: '',
    profileImg: ''
}

export const DataContext = createContext({} as DataContext)

export default function DataProvider({ children }: { children: ReactNode }) {
    const { user } = useContext(AuthContext)

    const [links, setLinks] = useState<Link[]>([])
    const [userInfo, setUserInfo] = useState<UserInfo>(blankUser)
    const [uploadedImg, setUploadedImg] = useState<string>('')

    const addLink = () => {
        setLinks(prevLinks => ([
            ...prevLinks,
            {
                ...blankLink,
                id: crypto.randomUUID(),
                listIndex: prevLinks.length
            }
        ]))
    }

    const removeLink = (id: string) => {
        setLinks(prevLinks => prevLinks.filter(link => link.id !== id))
    }

    const updateLink = (updatedLink: Link) => {
        setLinks(prevLinks => prevLinks.map(link => {
            if (link.id === updatedLink.id) {
                return updatedLink
            }

            return link
        }))
    }

    const addRef = (id: string, ref: React.RefObject<HTMLInputElement>) => {
        setLinks(prevLinks => prevLinks.map(link => {
            if (link.id === id) {
                return {
                    ...link,
                    inputRef: ref
                }
            }

            return link
        }))
    }

    const loadLinks = async () => {
        if (user) {
            const links = await getLinks(user.id)

            setLinks(links.map(link => ({
                ...link,
                id: crypto.randomUUID(),
                inputRef: null
            })))
        }
    }

    const saveLinksToDb = async () => {
        if (user) {
            await saveLinks(user.id, links)

            loadLinks()

            return null
        }
    }

    const reorderLinks = (targetId: string, newIdx: number) => {
        const targetLink = links.find(link => link.id === targetId)

        if (!targetLink) return

        const otherLinks = links.filter(link => link.id !== targetId)

        const prefixedLinks = otherLinks.slice(0, newIdx)

        const postfixedLinks = otherLinks.slice(newIdx, otherLinks.length)

        const reorderedLinks = [
            ...prefixedLinks,
            targetLink,
            ...postfixedLinks
        ]

        setLinks(reorderedLinks.map((link, idx) => ({
            ...link,
            listIndex: idx
        })))
    }

    const updateFirstName = (newName: string) => {
        setUserInfo(prevInfo => ({
            ...prevInfo,
            firstName: newName
        }))
    }

    const updateLastName = (newName: string) => {
        setUserInfo(prevInfo => ({
            ...prevInfo,
            lastName: newName
        }))
    }

    const updateEmail = (newEmail: string) => {
        setUserInfo(prevInfo => ({
            ...prevInfo,
            email: newEmail
        }))
    }

    const previewImg = (e: React.ChangeEvent<HTMLInputElement>) => {
        const images = e.target.files

        if (!images || images.length === 0) return

        const newImg = images[images.length - 1]
        const imgSrc = URL.createObjectURL(newImg)

        setUploadedImg(imgSrc)
    }

    const loadUserInfo = async () => {
        if (user) {
            const userInfo = await getUserInfo(user.id)

            if (userInfo) {
                setUserInfo(userInfo)
            }
        }
    }

    const saveUserInfoToDb = async () => {
        if (user) {
            await saveUserInfo(user.id, userInfo)

            loadUserInfo()

            return null
        }
    }

    const value = {
        links,
        userInfo,
        uploadedImg,
        addLink,
        removeLink,
        updateLink,
        addRef,
        reorderLinks,
        updateFirstName,
        updateLastName,
        updateEmail,
        previewImg,
        saveLinksToDb,
        saveUserInfoToDb
    }

    useEffect(() => {
        const loadUserData = async () => {
            if (user?.id) {
                const data = await getUserData(user.id)

                if (!data) return

                const { userInfo, links } = data
    
                setUserInfo(userInfo)

                const formattedLinks: Link[] = links.filter((link: unknown) => dataIsLink(link))
                
                setLinks(formattedLinks.map(link => ({
                    ...link,
                    id: crypto.randomUUID(),
                    inputRef: null
                })))
            }
        }

        if (user) {
            loadUserData()
        }
    }, [user])

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    )
}