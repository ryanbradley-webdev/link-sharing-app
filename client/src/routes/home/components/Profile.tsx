import { useContext } from 'react'
import ImageIcon from '../../../assets/ImageIcon'
import Button from '../../../components/button/Button'
import { DataContext } from '../../../contexts/DataContext'
import styles from '../home.module.css'

export default function Profile() {
    const {
        userData,
        uploadedImg,
        updateFirstName,
        updateLastName,
        updateEmail,
        previewImg
    } = useContext(DataContext)

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

                    <div className={styles.img_container}>

                        {
                            (uploadedImg || userData.image) && (
                                <img src={uploadedImg || userData.image} alt="" />
                            )
                        }

                        <input
                            type="file"
                            name="image"
                            id="image"
                            onChange={previewImg}
                        />

                        <div
                            className={`${styles.img_upload} ${(uploadedImg || userData.image) ? styles.img_upload_hidden : ''}`}
                        >

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
                        value={userData.firstName}
                        onChange={e => updateFirstName(e.target.value)}
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
                        value={userData.lastName}
                        onChange={e => updateLastName(e.target.value)}
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
                        value={userData.email}
                        onChange={e => updateEmail(e.target.value)}
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