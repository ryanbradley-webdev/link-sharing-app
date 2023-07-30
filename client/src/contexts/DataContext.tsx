import { ReactNode, createContext, useState } from 'react'
import { PLATFORMS } from '../lib/platforms'

type DataContext = {
    links: Link[]
    addLink: () => void
    removeLink: (id: string) => void
    updateLink: (updatedLink: Link) => void
}

export type Link = {
    id: string,
    platform: string
    linkUrl: string
}

const blankLink = {
    platform: PLATFORMS.GITHUB,
    linkUrl: ''
}

export const DataContext = createContext({} as DataContext)

export default function DataProvider({ children }: { children: ReactNode }) {
    const [links, setLinks] = useState<Link[]>([])

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

    const value = {
        links,
        addLink,
        removeLink,
        updateLink
    }

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    )
}