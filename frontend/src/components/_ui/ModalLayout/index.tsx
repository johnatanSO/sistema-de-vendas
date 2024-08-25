import { Modal, Box } from '@mui/material'
import { ReactNode, FormEvent, CSSProperties } from 'react'
import style from './ModalLayout.module.scss'
import { Loading } from '../Loading'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

interface Props {
  title: string
  open: boolean
  submitButtonText: string
  handleClose: () => void
  children: ReactNode
  onSubmit: (params: FormEvent<HTMLFormElement> | any) => void
  loading: boolean
  customStyle?: CSSProperties
}
export function ModalLayout({
  title,
  open,
  submitButtonText,
  handleClose,
  children,
  onSubmit,
  loading,
  customStyle,
}: Props) {
  return (
    <Modal className={style.overlay} open={open} onClose={handleClose}>
      <Box
        style={customStyle ?? customStyle}
        className={style.container}
        onSubmit={onSubmit}
        component="form"
      >
        <Box className={style.header} component="header">
          <h3>{title || 'Modal'}</h3>

          <FontAwesomeIcon
            className={style.closeButton}
            onClick={handleClose}
            icon={faXmark}
          />
        </Box>

        <Box className={style.mainContent} component="main">
          {children}
        </Box>
        <Box className={style.footer} component="footer">
          <button disabled={loading} type="submit">
            {loading ? <Loading size={21} /> : submitButtonText || 'Confirmar'}
          </button>
        </Box>
      </Box>
    </Modal>
  )
}
