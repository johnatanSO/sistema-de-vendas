import { ModalLayout } from '../../../_ui/ModalLayout'
import { useContext } from 'react'
import style from './ModalCreateNewSupplier.module.scss'
import { CustomTextField } from '../../../_ui/CustomTextField'
import { AlertContext } from '../../../../contexts/alertContext'
import { useRouter } from 'next/router'
import { suppliersService } from '../../../../services/suppliersService'
import { httpClientProvider } from '../../../../providers/HttpClientProvider'
import { ALERT_NOTIFY_TYPE } from '../../../../models/enums/AlertNotifyType'
import { INewSupplier } from '../interfaces/INewSupplier'
import { useForm } from 'react-hook-form'

interface Props {
  supplierDataToEdit: INewSupplier | null
  open: boolean
  handleClose: () => void
}

export function ModalCreateNewSupplier({
  open,
  handleClose,
  supplierDataToEdit,
}: Props) {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)
  const {
    register,
    handleSubmit,
    reset,
    formState: { isLoading, errors },
  } = useForm<INewSupplier>({
    defaultValues: supplierDataToEdit || {
      name: '',
      cnpj: '',
      phone: '',
      email: '',
    },
  })

  const router = useRouter()

  function onCreateNewSupplier(newSupplier: INewSupplier) {
    suppliersService
      .create({ ...newSupplier }, httpClientProvider)
      .then(() => {
        router.push({
          pathname: router.route,
          query: router.query,
        })
        reset()

        handleClose()

        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          type: ALERT_NOTIFY_TYPE.SUCCESS,
          text: 'Fornecedor cadastrado com sucesso',
        })
      })
      .catch((err) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          type: ALERT_NOTIFY_TYPE.ERROR,
          text: 'Erro ao tentar cadastrar fornecedor ' + `(${err?.message})`,
        })
      })
  }

  function onEditSupplier(supplier: INewSupplier) {
    suppliersService
      .update({ ...supplier, _id: supplier._id || '' }, httpClientProvider)
      .then(() => {
        router.push({
          pathname: router.route,
          query: router.query,
        })
        reset()

        handleClose()

        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          type: ALERT_NOTIFY_TYPE.SUCCESS,
          text: 'Dados do fornecedor atualizados com sucesso',
        })
      })
      .catch((err) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          type: ALERT_NOTIFY_TYPE.ERROR,
          text:
            'Erro ao tentar atualizar dados do fornecedor ' +
            `(${err?.message})`,
        })
      })
  }

  return (
    <ModalLayout
      open={open}
      handleClose={handleClose}
      onSubmit={handleSubmit(
        supplierDataToEdit ? onEditSupplier : onCreateNewSupplier,
      )}
      title="Cadastro de fornecedor"
      submitButtonText="Cadastrar"
      loading={isLoading}
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
