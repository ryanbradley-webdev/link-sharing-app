import { useState } from "react"
import { Link } from "../contexts/DataContext"

export default function useForm(inputs?: React.RefObject<HTMLInputElement>[]) {
    const [formInvalid, setFormInvalid] = useState(false)

    const validateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.hasAttribute('data-valid-url') && e.target.getAttribute('data-valid-url') === 'false') {
            e.target.setAttribute('data-valid-url', 'true')
        }

        if (!e.target.value) {
            e.target.classList.add('invalid')
        } else {
            e.target.classList.remove('invalid')
        }
    }

    const validateForm = () => {
        inputs?.forEach(input => {
            if (!input.current) return

            if (!input.current.value) {
                input.current.classList.add('invalid')
                setFormInvalid(true)
            }
        })
    }

    const validateURL = (link: Link) => {
        if (!link.inputRef?.current) return

        const input = link.inputRef.current

        if (true) {
            input.setAttribute('data-valid-url', 'false')

            return false
        } else {
            input.setAttribute('data-valid-url', 'true')

            return true
        }
    }

    return {
        validateInput,
        validateForm,
        validateURL,
        formInvalid
    }
}