import styles from './button.module.css'

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    children: string
}

export default function Button({
    children,
    ...props
}: ButtonProps) {
    return (
        <button
            className={styles.button}
            {...props}
        >

            {children}
            
        </button>
    )
}