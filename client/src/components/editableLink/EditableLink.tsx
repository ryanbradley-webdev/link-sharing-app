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
  platform,
  initialTop,
  startDrag,
  isDragging,
  copyRef
}: {
  index: number | null
  id: string
  linkUrl: string
  platform: string
  initialTop?: string
  startDrag: ((id: string, top: number) => void) | null
  isDragging: boolean
  copyRef?: React.RefObject<HTMLDivElement>
}) {
  const { removeLink, updateLink } = useContext(DataContext)

  const divRef = useRef<HTMLDivElement>(null)

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

  const handleMouseDown = () => {
    if (divRef.current && startDrag) {
      const { top } = divRef.current.getBoundingClientRect()

      startDrag(id, top)
    }
  }

  return (
    <div
      className={styles.link_wrapper}
      ref={copyRef || divRef}
      data-copy={typeof copyRef != 'undefined'}
      style={{
        top: initialTop || '',
        opacity: isDragging ? '0.3' : ''
      }}
      id={id}
    >

      <div className={styles.link_head}>

        <button
          className={styles.drag_btn}
          onMouseDown={handleMouseDown}
        >

          <DragIcon />

        </button>

        <span>
          Link #{(index || 0) + 1}
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
