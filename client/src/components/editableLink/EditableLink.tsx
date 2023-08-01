import { useContext, useRef, useState } from 'react'
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
  containerRef
}: {
  index: number
  id: string
  linkUrl: string
  platform: string
  containerRef: React.RefObject<HTMLDivElement>
}) {
  const { removeLink, updateLink, reorderLinks } = useContext(DataContext)

  const [isDragging, setIsDragging] = useState(false)
  const [fillerHeight, setFillerHeight] = useState(0)
  const [fillerWidth, setFillerWidth] = useState(0)

  const divRef = useRef<HTMLDivElement>(null)
  const fillerRef = useRef<HTMLDivElement>(null)

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

  const dragEventListener = (e: MouseEvent) => {
    const mousePosition = e.clientY

    if (divRef.current?.parentElement) {
      const { height } = divRef.current.getBoundingClientRect()

      const topOffset = divRef.current.parentElement.getBoundingClientRect().top

      const divPosition = mousePosition - topOffset - 30

      const maxBottom 
        = divRef.current.parentElement.getBoundingClientRect().height
        - (height / 3)

      divRef.current.style.top
        = divPosition < (-1 * height / 3) ? (-1 * height / 3) + 'px'
        : divPosition > maxBottom ? maxBottom + 'px'
        : divPosition + 'px'

      const children = [...divRef.current.parentElement.children].filter(child => (
        child.classList.length !== 0
      ))

      const prefixChild = children.find((_, idx) => {
        if (index === 0) return false

        return idx === index - 1
      })

      const suffixChild = children.find((_, idx) => {
        if (index === children.length - 1) return false

        return idx === index + 1
      })

      const upThreshold = prefixChild ? prefixChild.getBoundingClientRect().top - (height / 4) : null
      const downThreshold = suffixChild ? suffixChild.getBoundingClientRect().top + (height / 4) : null
      const targetTop = divRef.current.getBoundingClientRect().top

      if (upThreshold && targetTop < upThreshold) {
        reorderLinks(id, index - 1)
      } 
      
      if (downThreshold && targetTop > downThreshold) {
        reorderLinks(id, index + 1)
      }
    }
  }

  const startDrag = () => {
    if (containerRef.current && divRef.current) {
      const { height, width, top } = divRef.current.getBoundingClientRect()

      const containerTop = divRef.current.parentElement?.getBoundingClientRect().top

      setFillerWidth(width)
      setFillerHeight(height)

      setIsDragging(true)

      divRef.current.style.top = top - (containerTop || 0) + 'px'

      document.addEventListener('mousemove', dragEventListener)

      document.addEventListener('mouseup', endDrag)
    }
  }

  const endDrag = () => {
    if (containerRef.current && divRef.current) {
      setIsDragging(false)

      divRef.current.style.top = ''

      document.removeEventListener('mousemove', dragEventListener)
    }
  }

  return (
    <>
      <div
        className={styles.link_wrapper}
        ref={divRef}
        data-drag={isDragging}
      >

        <div className={styles.link_head}>

          <button
            className={styles.drag_btn}
            onMouseDown={startDrag}
          >

            <DragIcon />

          </button>

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
      {isDragging && (
        <div
          ref={fillerRef}
          style={{ 
            height: fillerHeight, 
            width: fillerWidth 
          }}
        ></div>
      )}
    </>
  )
}
