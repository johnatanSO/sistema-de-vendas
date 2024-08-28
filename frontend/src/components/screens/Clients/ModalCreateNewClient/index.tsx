import { ModalLayout } from '../../../_ui/ModalLayout'
import style from './ModalCreateNewClient.module.scss'
import { CustomTextField } from '../../../_ui/CustomTextField'
import { IClient } from '../../../../models/interfaces/IClient'
import { useFormClient } from '../hooks/useFormClient'

type Props = {
  clientDataToEdit: IClient | null
  open: boolean
  handleClose: () => void
}

export function ModalCreateNewClient({
  open,
  handleClose,
  clientDataToEdit,
}: Props) {
  const {
    errors,
    handleSubmit,
    isSubmitting,
    onCreateNewClient,
    onEditClient,
    register,
  } = useFormClient({
    handleClose,
    clientDataToEdit,
  })

  return (
    <ModalLayout
      open={open}
      handleClose={handleClose}
      onSubmit={handleSubmit(
        clientDataToEdit ? onEditClient : onCreateNewClient,
      )}
      title="Cadastro de cliente"
      submitButtonText="Cadastrar"
      loading={isSubmitting}
      customStyle={{ width: '500px' }}
    >
      <div className={style.fieldsContainer}>
        <CustomTextField
          size="small"
          label="Nome *"
          type="text"
          placeholder="Digite o nome do cliente"
          {...register('name', { required: true })}
          error={!!errors.name}
          helperText={errors.name && errors.name.message}
        />

        <CustomTextField
          size="small"
          label="Telefone *"
          type="tel"
          placeholder="Digite o telefone"
          {...register('phone', { required: true })}
          error={!!errors.phone}
          helperText={errors.phone && errors.phone.message}
        />

        <CustomTextField
          size="small"
          label="E-mail"
          type="email"
          placeholder="Digite o e-mail"
          {...register('email')}
        />

        <CustomTextField
          size="small"
          label="CPF"
          type="number"
          placeholder="Digite o CPF do cliente"
          {...register('cpf')}
        />
      </div>
    </ModalLayout>
  )
}
