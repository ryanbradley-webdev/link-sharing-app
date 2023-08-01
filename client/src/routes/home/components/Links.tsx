import { useContext, useEffect, useRef, useState } from 'react'
import Button from '../../../components/button/Button'
import styles from '../home.module.css'
import NoLinks from './NoLinks'
import EditableLink from '../../../components/editableLink/EditableLink'
import { DataContext, Link } from '../../../contexts/DataContext'

export default function Links() {
    const { links, addLink } = useContext(DataContext)

    const [dragIdx, setDragIdx] = useState<null | number>(null)
    const [targetLink, setTargetLink] = useState<null | Link>(null)

    const linksRef = useRef<HTMLDivElement>(null)
    const copyRef = useRef<HTMLDivElement>(null)

    const dragEventListener = (e: MouseEvent) => {
        const mousePosition = e.clientY
    
        if (linksRef.current && copyRef.current) {
            const children = [...linksRef.current.children].filter(child => (
                child.getAttribute('data-copy') !== 'true'
            ))
        
            const { height } = copyRef.current.getBoundingClientRect()
        
            const { top } = linksRef.current.getBoundingClientRect()

            copyRef.current.style.top = mousePosition - top - 30 + 'px'
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

    useEffect(() => {
        if (targetLink && copyRef.current && dragIdx != null) {
            const { height } = copyRef.current.getBoundingClientRect()

            const initialTop = (dragIdx * height) + 'px'

            copyRef.current.style.top = initialTop

            console.log(initialTop)
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
                                isDragging={dragIdx === idx}
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
                >
                    Save
                </Button>

            </div>

        </section>
    )
}