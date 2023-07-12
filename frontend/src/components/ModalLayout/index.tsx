import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Modal, Box } from '@mui/material'
import { ReactNode, FormEvent } from 'react'
import style from './ModalLayout.module.scss'

interface Props {
  title: string
  open: boolean
  submitButtonText: string
  handleClose: () => void
  children: ReactNode
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  loading: boolean
}
export function ModalLayout({
  title,
  open,
  submitButtonText,
  handleClose,
  children,
  onSubmit,
  loading,
}: Props) {
  return (
    <Modal className={style.overlay} open={open} onClose={handleClose}>
      <Box className={style.container} onSubmit={onSubmit} component="form">
        <Box className={style.header} component="header">
          <h3>{title || 'Modal'}</h3>
          <FontAwesomeIcon
            onClick={handleClose}
            className={style.closeButton}
            icon={faXmark}
          />
        </Box>

        <Box className={style.mainContent} component="main">
          {children}
        </Box>
        <Box className={style.footer} component="footer">
          <button disabled={loading} type="submit">
            {loading ? 'carregando...' : submitButtonText || 'Confirmar'}
          </button>
        </Box>
      </Box>
    </Modal>
  )
}
