import { useContext, useEffect } from 'react'
import { AuthContext } from "../../contexts/AuthContext"
import { useNavigate } from 'react-router-dom'

export default function Home() {
    const { user } = useContext(AuthContext)

    const navigate = useNavigate()

    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
    }, [user, navigate])

    return (
        <main>



        </main>
    )
}