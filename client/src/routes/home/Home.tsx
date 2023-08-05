import { useContext, useEffect, useState } from 'react'
import { AuthContext } from "../../contexts/AuthContext"
import { useNavigate } from 'react-router-dom'
import Header from '../../components/header/Header'
import Footer from '../../components/footer/Footer'
import Links from './components/Links'
import Profile from './components/Profile'
import styles from './home.module.css'
import ProfilePreview from '../../components/profilePreview/ProfilePreview'
import Phone from '../../assets/Phone'

export default function Home() {
    const {
        user
    } = useContext(AuthContext)

    const [page, setPage] = useState('links')

    const navigate = useNavigate()

    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
    }, [user, navigate])

    return (
        <>

            <Header
                page={page}
                setPage={setPage}
            />

                <main className={styles.main}>

                    <section className={styles.snapshot}>

                        <Phone />

                        <ProfilePreview
                            bare
                        />

                    </section>

                    {page === 'links' ? <Links /> : <Profile />}

                </main>

            <Footer />
        </>
    )
}