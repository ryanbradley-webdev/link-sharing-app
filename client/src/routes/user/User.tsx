import { Link, useParams } from 'react-router-dom'
import DevlinksLogoLg from '../../assets/DevlinksLogoLg'
import ProfilePreview from '../../components/profilePreview/ProfilePreview'
import styles from './user.module.css'
import { useQuery } from '@tanstack/react-query'
import Button from '../../components/button/Button'
import { getUserDataBySlug } from '../../lib/getUserDataBySlug'

export default function User() {
    const { userSlug } = useParams()

    const {
        data
    } = useQuery({
        queryKey: [`user-${userSlug}`],
        queryFn: () => getUserDataBySlug(userSlug)
    })

    return (
        <>
            <header className={styles.header}>

                <DevlinksLogoLg />

                <Link
                    to='/signup'
                >

                    <Button alt>
                        Create Your Own!
                    </Button>

                </Link>

            </header>

            <main className={styles.main}>
                
                <div className={styles.background}></div>
                
                <ProfilePreview
                    userData={data}
                />

                <section className={styles.ad}>

                    <p>
                        Want to show off your own social links?
                    </p>

                    <p>
                        Create a free account <Link to='/signup'>here!</Link>
                    </p>

                </section>

            </main>

            <footer className={styles.footer}>

                &copy; FrontendMentor.io

            </footer>
        </>
    )
}