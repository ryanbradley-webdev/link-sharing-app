import { ReactNode } from "react"
import styles from './toast.module.css'

export default function Toast({
    children
}: {
    children: ReactNode
}) {
    return (
        <div
            className={styles.toast}
        >
            
            {children}

        </div>
    )
}