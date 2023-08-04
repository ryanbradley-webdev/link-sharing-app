import { useContext, useEffect, useRef } from 'react'
import DragIcon from '../../assets/DragIcon'
import LinkIcon from '../../assets/LinkIcon'
import styles from './editableLink.module.css'
import { DataContext } from '../../contexts/DataContext'
import Select from './components/Select'
import useForm from '../../hooks/useForm'
import { generateMatchExp } from '../../lib/urlValidator'

export default function EditableLink({
  index,
  id,
  linkUrl,
  platform,
  inputRef,
  initialTop,
  startDrag,
  isDragging,
  copyRef
}: {
  index: number | null
  id: string
  linkUrl: string
  platform: string
  inputRef: React.RefObject<HTMLInputElement> | null
  initialTop?: string
  startDrag: ((id: string, top: number) => void) | null
  isDragging: boolean
  copyRef?: React.RefObject<HTMLDivElement>
}) {
  const { removeLink, updateLink, addRef } = useContext(DataContext)

  const divRef = useRef<HTMLDivElement>(null)
  const linkRef = useRef<HTMLInputElement>(null)

  const {
    validateInput
  } = useForm([linkRef])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    validateInput(e)

    updateLink({
      id,
      linkUrl: e.target.value,
      platform,
      inputRef
    })
  }

  const changePlatform = (newPlatform: string) => {
    updateLink({
      id,
      linkUrl,
      platform: newPlatform,
      inputRef
    })
  }

  const handleMouseDown = () => {
    if (divRef.current && startDrag) {
      const { top } = divRef.current.getBoundingClientRect()

      startDrag(id, top)
    }
  }

  useEffect(() => {
    if (linkRef && !inputRef) {
      addRef(id, linkRef)
    }
  }, [id, inputRef, addRef])

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
            placeholder={`e.g. ${generateMatchExp(platform)}johnappleseed`}
            value={linkUrl}
            onChange={handleChange}
            ref={linkRef}
            data-url
          />

        </label>

      </div>

    </div>
  )
}
