import { useRouter } from 'next/router'
import { ALERT_NOTIFY_TYPE } from '../../../../models/enums/AlertNotifyType'
import { ISupplier } from '../../../../models/interfaces/ISupplier'
import { httpClientProvider } from '../../../../providers/HttpClientProvider'
import { suppliersService } from '../../../../services/suppliersService'
import { INewSupplier } from '../interfaces/INewSupplier'
import { useForm } from 'react-hook-form'
import { useContext } from 'react'
import { AlertContext } from '../../../../contexts/alertContext'

type Props = {
  handleClose: () => void
  supplierDataToEdit: ISupplier | null
}
export function useFormSupplier({ handleClose, supplierDataToEdit }: Props) {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<INewSupplier>({
    defaultValues: supplierDataToEdit || {
      name: '',
      cnpj: '',
      phone: '',
      email: '',
    },
  })

  const router = useRouter()

  async function onCreateNewSupplier(newSupplier: INewSupplier) {
    await suppliersService
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

  async function onEditSupplier(supplier: INewSupplier) {
    await suppliersService
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

  return {
    onCreateNewSupplier,
    onEditSupplier,
    register,
    errors,
    isSubmitting,
    handleSubmit,
  }
}
