import { ReactNode, createContext, useState } from 'react'
import { PLATFORMS } from '../lib/platforms'

type DataContext = {
    links: Link[]
    userData: UserData
    addLink: () => void
    removeLink: (id: string) => void
    updateLink: (updatedLink: Link) => void
    updateFirstName: (newName: string) => void
    updateLastName: (newName: string) => void
    updateEmail: (newEmail: string) => void
}

export type Link = {
    id: string,
    platform: string
    linkUrl: string
}

export type UserData = {
    firstName: string
    lastName: string
    email: string
    image: string
}

const blankLink = {
    platform: PLATFORMS.GITHUB,
    linkUrl: ''
}

const blankUser = {
    firstName: '',
    lastName: '',
    email: '',
    image: ''
}

export const DataContext = createContext({} as DataContext)

export default function DataProvider({ children }: { children: ReactNode }) {
    const [links, setLinks] = useState<Link[]>([])
    const [userData, setUserData] = useState<UserData>(blankUser)

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

    const value = {
        links,
        userData,
        addLink,
        removeLink,
        updateLink,
        updateFirstName,
        updateLastName,
        updateEmail
    }

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    )
}