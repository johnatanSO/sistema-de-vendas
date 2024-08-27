import { ModalLayout } from '../../../_ui/ModalLayout'
import style from './ModalCreateNewSupplier.module.scss'
import { CustomTextField } from '../../../_ui/CustomTextField'
import { useFormSupplier } from '../hooks/useFormSupplier'
import { ISupplier } from '../../../../models/interfaces/ISupplier'

interface Props {
  supplierDataToEdit: ISupplier | null
  open: boolean
  handleClose: () => void
}

export function ModalCreateNewSupplier({
  open,
  handleClose,
  supplierDataToEdit,
}: Props) {
  const {
    errors,
    handleSubmit,
    isSubmitting,
    onCreateNewSupplier,
    onEditSupplier,
    register,
  } = useFormSupplier({
    handleClose,
    supplierDataToEdit,
  })

  return (
    <ModalLayout
      open={open}
      handleClose={handleClose}
      onSubmit={handleSubmit(
        supplierDataToEdit ? onEditSupplier : onCreateNewSupplier,
      )}
      title="Cadastro de fornecedor"
      submitButtonText="Cadastrar"
      loading={isSubmitting}
      customStyle={{ width: '500px' }}
    >
      <div className={style.fieldsContainer}>
        <CustomTextField
          size="small"
          label="Nome"
          type="text"
          placeholder="Digite o nome do fornecedor"
          {...register('name', { required: true })}
          error={!!errors.name}
          helperText={errors.name && errors.name.message}
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
          label="CNPJ"
          type="number"
          placeholder="Digite o CNPJ do fornecedor"
          {...register('cnpj')}
        />

        <CustomTextField
          size="small"
          label="Telefone"
          type="tel"
          placeholder="Digite o telefone"
          {...register('phone')}
        />
      </div>
    </ModalLayout>
  )
}
