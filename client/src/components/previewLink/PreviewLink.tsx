import RightArrowIcon from '../../assets/RightArrowIcon'
import { generateBackgroundColor } from '../../lib/generateBackgroundColor'
import { generatePlatformIcon } from '../../lib/generatePlatformIcon'
import { PLATFORMS } from '../../lib/platforms'
import styles from './previewLink.module.css'

export default function PreviewLink({
    link,
    bare
}: {
    link: Link
    bare?: boolean
}) {
    const isFrontEndMentor = link.platform === PLATFORMS.FRONTEND_MENTOR

    return (
        <a
            href={link.linkUrl}
            target='_blank'
            rel='noopener nofollower'
        >

            <button
                className={styles.button}
                style={{
                    backgroundColor: generateBackgroundColor(link.platform),
                    border: isFrontEndMentor ? '1px solid var(--clr-border)' : 'none',
                    height: bare ? '44px' : '56px'
                }}
            >

                {generatePlatformIcon(link.platform, true)}

                <span
                    style={{
                        color: isFrontEndMentor ? 'var(--clr-dark-grey)' : 'var(--clr-white-pri)'
                    }}
                >
                    {link.platform}
                </span>

                <RightArrowIcon
                    grey={isFrontEndMentor}
                />

            </button>

        </a>
    )
}