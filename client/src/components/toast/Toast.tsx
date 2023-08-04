import { ReactNode, useEffect, useState } from "react"
import styles from './toast.module.css'

export default function Toast({
    children,
    isVisible
}: {
    children: ReactNode
    isVisible: boolean
}) {
    const [display, setDisplay] = useState('none')

    useEffect(() => {
        if (isVisible) {
            setDisplay('')

            setTimeout(() => {
                setDisplay('none')
            }, 3400)
        }
    }, [isVisible])

    return (
        <div
            className={styles.toast}
            style={{
                display
            }}
        >
            
            {children}

        </div>
    )
}