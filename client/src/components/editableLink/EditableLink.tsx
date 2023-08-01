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
  platform
}: {
  index: number
  id: string
  linkUrl: string
  platform: string
}) {
  const { removeLink, updateLink } = useContext(DataContext)

  const [isDragging, setIsDragging] = useState(false)

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

  const dragEventListener = (e: MouseEvent) => {
    const mousePosition = e.clientY

    if (divRef.current?.parentElement) {
      const children = [...divRef.current.parentElement.children]

      let nextChildIdx = index === children.length - 1 ? null : index + 1
      let prevChildIdx = index === 0 ? null : index - 1

      const findChild = (idx: number | null) => {
        const child = idx != null ? children[idx] as HTMLDivElement : null
        
        return child
      }

      let nextChild = findChild(nextChildIdx)
      let prevChild = findChild(prevChildIdx)

      const { height } = divRef.current.getBoundingClientRect()

      const setChildMargin = () => {
        children.forEach((child, idx) => {
          if (idx === nextChildIdx && prevChild) {
            (child as HTMLDivElement).style.marginTop = height + 'px'
          } else {
            (child as HTMLDivElement).style.marginTop = ''
          }
        })

        if (divRef.current?.parentElement) {
          if (!nextChild) {
            divRef.current.parentElement.style.paddingTop = ''
            divRef.current.parentElement.style.paddingBottom = height + 'px'
          } else if (!prevChild) {
            divRef.current.parentElement.style.paddingTop = height + 'px'
            divRef.current.parentElement.style.paddingBottom = ''
          } else {
            divRef.current.parentElement.style.paddingTop = ''
            divRef.current.parentElement.style.paddingBottom = ''
          }
        }
      }

      setChildMargin()

      const thresholds: {
        up: null | number
        down: null | number
      } = {
        up: null,
        down: null
      }

      const calculateThresholds = () => {
        thresholds.up = prevChild ? prevChild.getBoundingClientRect().top - (height / 4) : null
        thresholds.down = nextChild ? nextChild.getBoundingClientRect().top + (height / 4) : null
      }

      calculateThresholds()

      const topOffset = divRef.current.parentElement.getBoundingClientRect().top

      const divPosition = mousePosition - topOffset - 30

      const maxBottom 
        = divRef.current.parentElement.getBoundingClientRect().height
        - (height / 3)

      divRef.current.style.top
        = divPosition < (-1 * height / 3) ? (-1 * height / 3) + 'px'
        : divPosition > maxBottom ? maxBottom + 'px'
        : divPosition + 'px'

      const targetTop = divRef.current.getBoundingClientRect().top

      if (thresholds.up && targetTop < thresholds.up) {
        if (!nextChildIdx) {
          nextChildIdx = children.length - 1
        } else {
          nextChildIdx--
          if (nextChildIdx === index) {
            nextChildIdx--
          }
        }

        if (prevChildIdx) {
          prevChildIdx--

          if (prevChildIdx === index) {
            prevChildIdx--
          }

          if (prevChildIdx <= 0) {
            prevChildIdx = null
          }
        }

        nextChild = findChild(nextChildIdx)
        prevChild = findChild(prevChildIdx)

        setChildMargin()
        calculateThresholds()
      } 
      
      if (thresholds.down && targetTop > thresholds.down) {
        if (!prevChildIdx) {
          prevChildIdx = 0
        } else {
          prevChildIdx++
          if (prevChildIdx === index) {
            prevChildIdx++
          }
        }

        if (nextChildIdx) {
          nextChildIdx++
          if (nextChildIdx === index) {
            nextChildIdx++
          }

          if (nextChildIdx === children.length) {
            nextChildIdx = null
          }
        }

        nextChild = findChild(nextChildIdx)
        prevChild = findChild(prevChildIdx)

        setChildMargin()
        calculateThresholds()
      }
    }
  }

  const startDrag = () => {
    if (divRef.current) {
      const { top } = divRef.current.getBoundingClientRect()

      const containerTop = divRef.current.parentElement?.getBoundingClientRect().top

      setIsDragging(true)

      divRef.current.style.top = top - (containerTop || 0) + 'px'

      window.addEventListener('mousemove', dragEventListener)

      window.addEventListener('mouseup', endDrag)
    }
  }

  const endDrag = () => {
    if (divRef.current) {
      setIsDragging(false)

      if (divRef.current.parentElement) {
        const childWithMargin = [...divRef.current.parentElement.children].find(child => (
          (child as HTMLDivElement).style.marginTop !== ''
        )) as HTMLDivElement

        if (childWithMargin) childWithMargin.style.marginTop = ''

        divRef.current.parentElement.style.paddingTop = ''
        divRef.current.parentElement.style.paddingBottom = ''
      }

      divRef.current.style.top = ''

      window.removeEventListener('mousemove', dragEventListener)
    }
  }

  return (
    <div
      className={styles.link_wrapper}
      ref={divRef}
      data-drag={isDragging}
      id='id'
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
  )
}
