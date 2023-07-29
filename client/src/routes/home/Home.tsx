import { useContext, useEffect, useState } from 'react'
import { AuthContext } from "../../contexts/AuthContext"
import { useNavigate } from 'react-router-dom'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import Links from './components/Links'
import Profile from './components/Profile'

export default function Home() {
    const { user } = useContext(AuthContext)

    const [page, setPage] = useState('links')

    const navigate = useNavigate()

    useEffect(() => {
        /* if (!user) {
            navigate('/login')
        } */
    }, [user, navigate])

    return (
        <>

            <Header
                page={page}
                setPage={setPage}
            />

            {page === 'links' ? <Links /> : <Profile />}

            <Footer />
        </>
    )
}