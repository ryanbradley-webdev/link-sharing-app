import { useParams } from 'react-router-dom'
import DevlinksLogoLg from '../../assets/DevlinksLogoLg'
import ProfilePreview from '../../components/profilePreview/ProfilePreview'
import styles from './user.module.css'
import { useQuery } from '@tanstack/react-query'
import { getUserData } from '../../lib/getUserData'

export default function User() {
    const { user } = useParams()

    const {
        data
    } = useQuery({
        queryKey: [`user-${user}`],
        queryFn: () => getUserData(user)
    })

    return (
        <>
            <header>

                <DevlinksLogoLg />

            </header>

            <main className={styles.main}>
                
                <div className={styles.background}></div>
                
                <ProfilePreview
                    userData={data}
                />

            </main>

            <footer>

                &copy; FrontendMentor.io

            </footer>
        </>
    )
}