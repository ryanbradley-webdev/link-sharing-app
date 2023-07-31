import { useContext } from 'react'
import DragIcon from '../../assets/DragIcon'
import LinkIcon from '../../assets/LinkIcon'
import styles from './editableLink.module.css'
import { DataContext } from '../../contexts/DataContext'
import Select from './components/Select'

export default function EditableLink({
  index,
  id,
  linkUrl,
  platform
}: {
  index: number
  id: string
  linkUrl: string
  platform: string
}) {
  const { removeLink, updateLink } = useContext(DataContext)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateLink({
      id,
      linkUrl: e.target.value,
      platform
    })
  }

  const changePlatform = (newPlatform: string) => {
    updateLink({
      id,
      linkUrl,
      platform: newPlatform
    })
  }

  return (
    <div className={styles.link_wrapper}>

      <div className={styles.link_head}>

        <DragIcon />

        <span>
          Link #{index + 1}
        </span>

        <button
          onClick={() => removeLink(id)}
        >
          Remove
        </button>

      </div>

      <div className={styles.link_inputs}>

        <Select
          selectedPlatform={platform}
          changePlatform={changePlatform}
        />

        <label htmlFor={`link-${id}`}>

          <LinkIcon />

          <span>
            Link
          </span>

          <input
            type="text"
            name={`link-${id}`}
            id={`link-${id}`}
            placeholder='e.g. https://www.github.com/johnappleseed'
            value={linkUrl}
            onChange={handleChange}
          />

        </label>

      </div>

    </div>
  )
}
