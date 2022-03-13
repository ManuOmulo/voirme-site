import ReactDOM from 'react-dom'
import { useState, useEffect } from 'react'
import { BsX } from 'react-icons/bs'

import styles from './modal.module.scss'

const Modal = ({ show, onClose, children }) => {
  const [isBrowser, setIsBrowser] = useState(false)

  useEffect(() => {
    setIsBrowser(true)
  }, [])

  const handleClose = (e) => {
    e.preventDefault()
    onClose()
  }

  const modalContent = show ? (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <button onClick={handleClose}><BsX /></button>
        </div>

        <div className={styles.body}>{children}</div>
      </div>
    </div>
  ) : null

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("modal-root")
    )
  } else {
    return null
  }
}

export default Modal