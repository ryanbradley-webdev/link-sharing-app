import { Dispatch, SetStateAction } from 'react'
import styles from './header.module.css'
import DevLinksLogoSm from '../../assets/DevLinksLogoSm'
import PreviewIcon from '../../assets/PreviewIcon'
import LinksIconHeader from '../../assets/LinksIconHeader'
import ProfileIconHeader from '../../assets/ProfileIconHeader'
import { Link } from 'react-router-dom'

export default function Header({
    page,
    setPage
}: {
    page: string,
    setPage: Dispatch<SetStateAction<string>>
}) {
    return (
        <header className={styles.header}>

            <DevLinksLogoSm />

            <nav>

                <button
                    className={styles.nav_btn}
                    data-active={page === 'links'}
                    onClick={() => setPage('links')}
                >

                    <LinksIconHeader />

                    <span>
                        Links
                    </span>

                </button>

                <button
                    className={styles.nav_btn}
                    data-active={page === 'profile'}
                    onClick={() => setPage('profile')}
                >

                    <ProfileIconHeader />

                    <span>
                        Profile Details
                    </span>

                </button>

            </nav>

            <Link to='/preview'>

                <button
                    className={styles.preview_btn}
                >

                    <PreviewIcon />

                    <span>
                        Preview
                    </span>

                </button>

            </Link>

        </header>
    )
}