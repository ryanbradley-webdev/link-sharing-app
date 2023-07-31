import { useContext, useRef } from 'react'
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

  const platformRef = useRef<HTMLSelectElement>(null)
  const linkRef = useRef<HTMLInputElement>(null)

  const handleChange = () => {
    updateLink({
      id,
      linkUrl: linkRef?.current?.value || '',
      platform: platformRef?.current?.value || ''
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
            ref={linkRef}
          />

        </label>

      </div>

    </div>
  )
}
