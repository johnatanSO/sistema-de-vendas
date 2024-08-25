import { ModalLayout } from '../../../_ui/ModalLayout'
import { useContext } from 'react'
import style from './ModalCreateNewClient.module.scss'
import { CustomTextField } from '../../../_ui/CustomTextField'
import { AlertContext } from '../../../../contexts/alertContext'
import { useRouter } from 'next/router'
import { clientsService } from '../../../../services/clientsService'
import { httpClientProvider } from '../../../../providers/HttpClientProvider'
import { ALERT_NOTIFY_TYPE } from '../../../../models/enums/AlertNotifyType'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { INewClient, newClientSchema } from '../interfaces/INewClient'
import { IClient } from '../../../../models/interfaces/IClient'

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
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)
  const {
    register,
    handleSubmit,
    reset,
    formState: { isLoading, errors },
  } = useForm<INewClient>({
    defaultValues: clientDataToEdit || {
      name: '',
      cpf: '',
      phone: '',
      email: '',
    },
    resolver: zodResolver(newClientSchema),
  })

  const router = useRouter()

  function onCreateNewClient(newClientData: INewClient) {
    clientsService
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

  function onEditClient(clientData: INewClient) {
    clientsService
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

  return (
    <ModalLayout
      open={open}
      handleClose={handleClose}
      onSubmit={handleSubmit(
        clientDataToEdit ? onEditClient : onCreateNewClient,
      )}
      title="Cadastro de cliente"
      submitButtonText="Cadastrar"
      loading={isLoading}
      customStyle={{ width: '500px' }}
    >
      <div className={style.fieldsContainer}>
        <CustomTextField
          size="small"
          label="Nome *"
          type="text"
          placeholder="Digite o nome do cliente"
          {...register('name')}
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
          label="CPF"
          type="number"
          placeholder="Digite o CPF do cliente"
          {...register('cpf')}
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
