import { useRouter } from 'next/router'
import { useContext } from 'react'
import { AlertContext } from '../../../../contexts/alertContext'
import { useForm } from 'react-hook-form'
import { INewClient, newClientSchema } from '../interfaces/INewClient'
import { zodResolver } from '@hookform/resolvers/zod'
import { clientsService } from '../../../../services/clientsService'
import { httpClientProvider } from '../../../../providers/HttpClientProvider'
import { ALERT_NOTIFY_TYPE } from '../../../../models/enums/AlertNotifyType'
import { IClient } from '../../../../models/interfaces/IClient'

type Props = {
  clientDataToEdit: IClient | null
  handleClose: () => void
}

export function useFormClient({ clientDataToEdit, handleClose }: Props) {
  const router = useRouter()

  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<INewClient>({
    defaultValues: clientDataToEdit || {
      name: '',
      cpf: '',
      phone: '',
      email: '',
    },
    resolver: zodResolver(newClientSchema),
  })

  async function onCreateNewClient(newClientData: INewClient) {
    await clientsService
      .create({ ...newClientData }, httpClientProvider)
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
          text: 'Cliente cadastrado com sucesso',
        })
      })
      .catch((err) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          type: ALERT_NOTIFY_TYPE.ERROR,
          text: 'Erro ao tentar cadastrar cliente ' + `(${err?.message})`,
        })
      })
  }

  async function onEditClient(clientData: INewClient) {
    await clientsService
      .update({ ...clientData, _id: clientData?._id || '' }, httpClientProvider)
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
          text: 'Dados do cliente atualizados com sucesso',
        })
      })
      .catch((err) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          type: ALERT_NOTIFY_TYPE.ERROR,
          text:
            'Erro ao tentar atualizar dados do cliente ' + `(${err?.message})`,
        })
      })
  }

  return {
    onEditClient,
    onCreateNewClient,
    register,
    errors,
    handleSubmit,
    isSubmitting,
  }
}
