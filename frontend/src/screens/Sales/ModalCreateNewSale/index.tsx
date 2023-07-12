import { ModalLayout } from '../../../components/ModalLayout'
import { FormEvent } from 'react'
import style from './ModalCreateNewSale.module.scss'

interface Props {
  open: boolean
  handleClose: () => void
}

export function ModalCreateNewSale({ open, handleClose }: Props) {
  function onCreateNewSale(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    console.log('CRIAR NOVA VENDA')
  }

  return (
    <ModalLayout
      open={open}
      handleClose={handleClose}
      onSubmit={onCreateNewSale}
      title="Realizar nova venda"
      submitButtonText="Finalizar"
    >
      <div className={style.fieldsContainer}>a</div>
    </ModalLayout>
  )
}
