import styles from './button.module.css'

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    children: string
    alt?: boolean
}

export default function Button({
    children,
    alt,
    ...props
}: ButtonProps) {
    return (
        <button
            className={alt ? styles.alt_btn : styles.btn}
            {...props}
        >

            {children}
            
        </button>
    )
}