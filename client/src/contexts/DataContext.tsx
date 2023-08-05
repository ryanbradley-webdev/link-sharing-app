import { ReactNode, createContext, useEffect, useState, useContext } from 'react'
import { PLATFORMS } from '../lib/platforms'
import { AuthContext } from './AuthContext'

type DataContext = {
    links: Link[]
    linkOrder: string[]
    userData: UserData
    uploadedImg: string
    addLink: () => void
    removeLink: (id: string) => void
    updateLink: (updatedLink: Link) => void
    addRef: (id: string, ref: React.RefObject<HTMLInputElement>) => void
    reorderLinks: (targetId: string, newIdx: number) => void
    updateFirstName: (newName: string) => void
    updateLastName: (newName: string) => void
    updateEmail: (newEmail: string) => void
    previewImg: (e: React.ChangeEvent<HTMLInputElement>) => void
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

const blankLink = {
    platform: PLATFORMS.GITHUB,
    linkUrl: '',
    inputRef: null
}

const blankUser = {
    firstName: '',
    lastName: '',
    email: '',
    image: ''
}

export const DataContext = createContext({} as DataContext)

export default function DataProvider({ children }: { children: ReactNode }) {
    const { user } = useContext(AuthContext)

    const [links, setLinks] = useState<Link[]>([])
    const [userData, setUserData] = useState<UserData>(blankUser)
    const [uploadedImg, setUploadedImg] = useState<string>('')
    const [linkOrder, setLinkOrder] = useState(links.map(link => link.id))

    const addLink = () => {
        setLinks(prevLinks => ([
            ...prevLinks,
            {
                ...blankLink,
                id: crypto.randomUUID()
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

    const reorderLinks = (targetId: string, newIdx: number) => {
        const targetLink = links.find(link => link.id === targetId)

        if (!targetLink) return

        const otherLinks = links.filter(link => link.id !== targetId)

        const prefixedLinks = otherLinks.slice(0, newIdx)

        const postfixedLinks = otherLinks.slice(newIdx, otherLinks.length)

        setLinks([
            ...prefixedLinks,
            targetLink,
            ...postfixedLinks
        ])
    }

    const updateFirstName = (newName: string) => {
        setUserData(prevData => ({
            ...prevData,
            firstName: newName
        }))
    }

    const updateLastName = (newName: string) => {
        setUserData(prevData => ({
            ...prevData,
            lastName: newName
        }))
    }

    const updateEmail = (newEmail: string) => {
        setUserData(prevData => ({
            ...prevData,
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

    const value = {
        links,
        linkOrder,
        userData,
        uploadedImg,
        addLink,
        removeLink,
        updateLink,
        addRef,
        reorderLinks,
        updateFirstName,
        updateLastName,
        updateEmail,
        previewImg
    }

    useEffect(() => {
        setLinkOrder(links.map(link => link.id))
    }, [links])

    /* useEffect(() => {
        if (user) {
            setLinks(user.links)
            setUserData(user.userData)
        }
    }, [user]) */

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    )
}