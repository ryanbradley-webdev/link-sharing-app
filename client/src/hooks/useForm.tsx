import { useState } from "react"

export default function useForm(inputs: React.RefObject<HTMLInputElement>[]) {
    const [formInvalid, setFormInvalid] = useState(false)

    const validateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.value) {
            e.target.classList.add('invalid')
        } else {
            e.target.classList.remove('invalid')
        }
    }

    const validateForm = () => {
        inputs.forEach(input => {
            if (!input.current) return

            if (!input.current.value) {
                input.current.classList.add('invalid')
                setFormInvalid(true)
            }
        })
    }

    return {
        validateInput,
        validateForm,
        formInvalid
    }
}