import { ModalLayout } from '@/src/components/ModalLayout'
import { FormEvent } from 'react'
import style from './ModalCreateNewProduct.module.scss'

interface Props {
  open: boolean
  handleClose: () => void
}

export function ModalCreateNewProduct({ open, handleClose }: Props) {
  function onCreateNewProduct(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
  }

  return (
    <ModalLayout
      open={open}
      handleClose={handleClose}
      onSubmit={onCreateNewProduct}
      title="Cadastro de produto"
      submitButtonText="Cadastrar"
    >
      <div className={style.fieldsContainer}>a</div>
    </ModalLayout>
  )
}
