import { useContext, useEffect, useRef, useState } from 'react'
import Button from '../../../components/button/Button'
import styles from '../home.module.css'
import NoLinks from './NoLinks'
import EditableLink from '../../../components/editableLink/EditableLink'
import { DataContext, Link } from '../../../contexts/DataContext'
import useForm from '../../../hooks/useForm'

export default function Links() {
    const { links, addLink, reorderLinks } = useContext(DataContext)

    const [dragIdx, setDragIdx] = useState<null | number>(null)
    const [targetLink, setTargetLink] = useState<null | Link>(null)

    const linksRef = useRef<HTMLDivElement>(null)
    const copyRef = useRef<HTMLDivElement>(null)

    const {
        validateURL
    } = useForm()

    const dragEventListener = (e: MouseEvent) => {
        const mousePosition = e.clientY
    
        if (linksRef.current && copyRef.current) {
            const children = [...linksRef.current.children].filter(child => (
                child.getAttribute('data-copy') !== 'true'
            ))
        
            const { top, height } = linksRef.current.getBoundingClientRect()
            const divHeight = copyRef.current.getBoundingClientRect().height

            const maxHeight = 0
            const minHeight = height - divHeight

            const newPosition = mousePosition - top - 30

            copyRef.current.style.top
                = newPosition < maxHeight ? maxHeight + 'px'
                : newPosition > minHeight ? minHeight + 'px'
                : newPosition + 'px'

            children.forEach((child, idx) => {
                const childTop = (child as HTMLDivElement).offsetTop

                if (Math.abs(childTop - newPosition) < 100 && idx !== dragIdx && copyRef.current) {
                    reorderLinks(copyRef.current.id, idx)
                }
            })
        }
    }
    
    const startDrag = (id: string) => {
        const targetLink = links.find(link => link.id === id)

        if (!targetLink) return

        const targetIdx = links.indexOf(targetLink)

        setDragIdx(targetIdx)

        setTargetLink(targetLink)

        window.addEventListener('mousemove', dragEventListener)

        window.addEventListener('mouseup', endDrag)
    }

    const endDrag = () => {
        if (copyRef.current) {
            if (copyRef.current.parentElement) {
                copyRef.current.style.top = ''

                setTargetLink(null)
                setDragIdx(null)

                window.removeEventListener('mousemove', dragEventListener)
            }
        }
    }

    const handleSave = () => {
        links.forEach(link => {
            validateURL(link)
        })
    }

    useEffect(() => {
        if (targetLink && copyRef.current && dragIdx != null) {
            const { height } = copyRef.current.getBoundingClientRect()

            const initialTop = (dragIdx * height) + 'px'

            copyRef.current.style.top = initialTop
        }
    }, [targetLink, dragIdx])

    return (
        <section className={styles.section}>

            <div className={styles.heading}>

                <h3>
                    Customize your links
                </h3>

                <p>
                    Add/edit/remove links below and then share all your profiles with the world!
                </p>

                <Button
                    alt
                    onClick={addLink}
                >
                    &#43; Add new link
                </Button>

            </div>

            <div
                className={styles.links}
                ref={linksRef}
            >

                {
                    links?.length > 0 ? (
                        links.map((link, idx) => (
                            <EditableLink
                                key={link.id}
                                index={idx}
                                isDragging={targetLink?.id === link.id}
                                startDrag={startDrag}
                                { ...link }
                            />
                        ))
                    ) : (
                        <NoLinks />
                    )
                }

                {targetLink && <EditableLink
                    index={dragIdx}
                    copyRef={copyRef}
                    isDragging={false}
                    startDrag={null}
                    { ...targetLink }
                />}

            </div>

            <div className={styles.save_btn_container}>

                <Button
                    disabled={!links || links.length === 0}
                    onClick={handleSave}
                >
                    Save
                </Button>

            </div>

        </section>
    )
}