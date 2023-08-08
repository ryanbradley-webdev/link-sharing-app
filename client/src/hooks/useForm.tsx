import { useState } from "react"
import { urlIsValid } from "../lib/urlValidator"

export default function useForm(
    submitFn: (() => Promise<null | undefined>) | null
) {
    const [submitting, setSubmitting] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)

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

    const validateURL = (link: Link) => {
        if (!link.inputRef?.current) return false

        const input = link.inputRef.current

        if (!urlIsValid(link.linkUrl, link.platform)) {
            input.setAttribute('data-valid-url', 'false')

            return false
        } else {
            input.setAttribute('data-valid-url', 'true')

            return true
        }
    }

    const submitForm = () => {
        if (submitFn == null) return

        setError(false)
        setSubmitting(true)

        submitFn()
            .then(() => {
                setSubmitting(false)
                setSuccess(true)

                setTimeout(() => {
                    setSuccess(false)
                }, 3500)
            })
            .catch(() => {
                setSubmitting(false)
                setError(true)
            })
    }

    return {
        validateInput,
        validateURL,
        submitForm,
        submitting,
        success,
        error
    }
}