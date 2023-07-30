import ImageIcon from '../../../assets/ImageIcon'
import Button from '../../../components/button/Button'
import styles from '../home.module.css'

export default function Profile() {
    return (
        <section>
            
            <div className={styles.heading}>

                <h3>
                    Profile Details
                </h3>

                <p>
                    Add your details to create a personal touch to your profile.
                </p>

            </div>

            <div className={styles.profile_pic}>

                <label htmlFor="image">

                    <span>
                        Profile Picture
                    </span>

                    <div>

                        <input type="file" name="image" id="image" />

                        <div className={styles.img_upload}>

                            <ImageIcon />

                            <span>
                                &#43; Upload Image
                            </span>

                        </div>

                    </div>

                    <p>
                        Image must be below 1024x1024px. Use PNG or JPG format.
                    </p>

                </label>

            </div>

            <div className={styles.profile_details}>

                <label htmlFor="first-name">

                    <span>
                        First name*
                    </span>

                    <input
                        type="text"
                        name="first-name"
                        id="first-name"
                        placeholder='e.g. John'
                        required
                    />

                </label>

                <label htmlFor="last-name">

                    <span>
                        Last name*
                    </span>

                    <input
                        type="text"
                        name="last-name"
                        id="last-name"
                        placeholder='e.g. Appleseed'
                        required
                    />

                </label>

                <label htmlFor="email">

                    <span>
                        Email
                    </span>

                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder='e.g. email@example.com'
                        required
                    />

                </label>

            </div>

            <div className={styles.save_btn_container}>

                <Button
                    disabled={false}
                >
                    Save
                </Button>

            </div>
            
        </section>
    )
}