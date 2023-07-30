import styles from './button.module.css'

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    children: string
    alt?: boolean
    disabled?: boolean
}

export default function Button({
    children,
    alt,
    disabled,
    ...props
}: ButtonProps) {
    return (
        <button
            className={alt ? styles.alt_btn : styles.btn}
            disabled={disabled}
            {...props}
        >

            {children}
            
        </button>
    )
}