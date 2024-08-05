import { Modal, Box } from '@mui/material'
import { ReactNode, FormEvent, CSSProperties } from 'react'
import style from './ModalLayout.module.scss'
import { Loading } from '../Loading'
import { X } from '@phosphor-icons/react'

interface Props {
  title: string
  open: boolean
  submitButtonText: string
  handleClose: () => void
  children: ReactNode
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
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

          <X size={32} onClick={handleClose} />
        </Box>

        <Box className={style.mainContent} component="main">
          {children}
        </Box>
        <Box className={style.footer} component="footer">
          <button disabled={loading} type="submit">
            {loading ? <Loading size={17} /> : submitButtonText || 'Confirmar'}
          </button>
        </Box>
      </Box>
    </Modal>
  )
}
