import { Link } from 'react-router-dom'
import Logo from '/rbwd-logo.svg'
import React from '/react.png'
import Postgres from '/sql.png'
import Node from '/node.png'
import Supabase from '/supabase.png'
import TypeScript from '/ts.png'
import styles from './footer.module.css'

export default function Footer() {
    return (
        <footer className={styles.footer}>

            <div className={styles.credits}>

                <img src={Logo} alt="" />

                <div>

                    <span>
                        Developed by&nbsp;<Link to='https://ryanbradleyportfolio.com' target='_blank' rel='noopener nofollower'>Ryan Bradley</Link>
                    </span>

                    <span>
                        App design by&nbsp;<Link to='https://frontendmentor.io' target='_blank' rel='noopener nofollower'>Frontend Mentor</Link>
                    </span>

                </div>

            </div>

            <p>
                Built with the following technologies:
            </p>

            <div className={styles.stack}>

                <img src={React} alt="" width={30} height={30} />
                <img src={TypeScript} alt="" width={30} height={30} />
                <img src={Node} alt="" width={30} height={30} />
                <img src={Supabase} alt="" width={30} height={30} />
                <img src={Postgres} alt="" width={30} height={30} />

            </div>
            
        </footer>
    )
}