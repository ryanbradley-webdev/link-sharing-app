import { Dispatch, SetStateAction } from 'react'
import styles from './header.module.css'

export default function Header({
    page,
    setPage
}: {
    page: string,
    setPage: Dispatch<SetStateAction<string>>
}) {
    return (
        <header className={styles.header}>

            header {page}

        </header>
    )
}