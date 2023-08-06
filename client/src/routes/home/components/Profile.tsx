import { useContext } from 'react'
import ImageIcon from '../../../assets/ImageIcon'
import Button from '../../../components/button/Button'
import { DataContext } from '../../../contexts/DataContext'
import styles from '../home.module.css'
import SavedIcon from '../../../assets/SavedIcon'
import Toast from '../../../components/toast/Toast'
import useForm from '../../../hooks/useForm'

export default function Profile() {
    const {
        userInfo,
        imgPreviewPath,
        updateFirstName,
        updateLastName,
        updateEmail,
        previewImg,
        saveUserInfoToDb
    } = useContext(DataContext)

    const {
        validateInput,
        submitForm,
        success
    } = useForm(saveUserInfoToDb)

    const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateFirstName(e.target.value)
        validateInput(e)
    }

    const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateLastName(e.target.value)
        validateInput(e)
    }

    const handleSave = () => {
        if (!userInfo.firstName || !userInfo.lastName) return

        submitForm()
    }

    return (
        <>

            <section className={styles.section}>
                
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
                                (imgPreviewPath || userInfo.profileImg) && (
                                    <img src={imgPreviewPath || userInfo.profileImg} alt="" />
                                )
                            }

                            <input
                                type="file"
                                name="image"
                                id="image"
                                accept='image/png, image/jpeg, image/jpg'
                                onChange={previewImg}
                            />

                            <div
                                className={`${styles.img_upload} ${(imgPreviewPath || userInfo.profileImg) ? styles.img_upload_hidden : ''}`}
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
                            value={userInfo.firstName}
                            onChange={handleFirstNameChange}
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
                            value={userInfo.lastName}
                            onChange={handleLastNameChange}
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
                            value={userInfo.email}
                            onChange={e => updateEmail(e.target.value)}
                            required
                        />

                    </label>

                </div>

                <div className={styles.save_btn_container}>

                    <Button
                        disabled={!userInfo.firstName || !userInfo.lastName}
                        onClick={handleSave}
                    >
                        Save
                    </Button>

                </div>
                
            </section>

            
            <Toast
                isVisible={success}
            >

                <SavedIcon />

                <span>
                    Your changes have been successfully saved!
                </span>

            </Toast>

        </>
    )
}