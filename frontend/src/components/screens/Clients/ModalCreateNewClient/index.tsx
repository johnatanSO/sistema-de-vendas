import { ModalLayout } from '../../../_ui/ModalLayout'
import { FormEvent, useState, useContext } from 'react'
import style from './ModalCreateNewClient.module.scss'
import { CustomTextField } from '../../../_ui/CustomTextField'
import { AlertContext } from '../../../../contexts/alertContext'
import { useRouter } from 'next/router'
import { clientsService } from '../../../../services/clientsService'

export interface NewClientData {
  _id?: string
  name: string
  cpf: string
  phone: string
  email: string
}

interface Props {
  clientDataToEdit: NewClientData
  open: boolean
  handleClose: () => void
}

export function ModalCreateNewClient({
  open,
  handleClose,
  clientDataToEdit,
}: Props) {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)
  const defaultNewClientValues = {
    name: '',
    cpf: '',
    phone: '',
    email: '',
  }
  const [newClientData, setNewClientData] = useState<NewClientData>(
    clientDataToEdit || defaultNewClientValues,
  )
  const [loadingCreateNewClient, setLoadingCreateNewClient] =
    useState<boolean>(false)
  const router = useRouter()
  function onCreateNewClient(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    clientsService
      .create({ ...newClientData })
      .then(() => {
        router.push({
          pathname: router.route,
          query: router.query,
        })
        setNewClientData(defaultNewClientValues)
        handleClose()
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          type: 'success',
          text: 'Cliente cadastrado com sucesso',
        })
      })
      .catch((err) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          type: 'error',
          text:
            'Erro ao tentar cadastrar cliente ' +
            `(${err.response.data.message})`,
        })
      })
      .finally(() => {
        setLoadingCreateNewClient(false)
      })
  }

  function onEditClient(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const clientId = clientDataToEdit._id

    if (!clientId) return

    clientsService
      .update({ ...newClientData, clientId })
      .then(() => {
        router.push({
          pathname: router.route,
          query: router.query,
        })
        setNewClientData(defaultNewClientValues)
        handleClose()
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          type: 'success',
          text: 'Dados do cliente atualizados com sucesso',
        })
      })
      .catch((err) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          type: 'error',
          text:
            'Erro ao tentar atualizar dados do cliente ' +
            `(${err.response.data.message})`,
        })
      })
      .finally(() => {
        setLoadingCreateNewClient(false)
      })
  }

  return (
    <ModalLayout
      open={open}
      handleClose={handleClose}
      onSubmit={clientDataToEdit ? onEditClient : onCreateNewClient}
      title="Cadastro de cliente"
      submitButtonText="Cadastrar"
      loading={loadingCreateNewClient}
      customStyle={{ width: '500px' }}
    >
      <div className={style.fieldsContainer}>
        <CustomTextField
          size="small"
          label="Nome"
          type="text"
          placeholder="Digite o nome do cliente"
          value={newClientData?.name}
          onChange={(event) => {
            setNewClientData({
              ...newClientData,
              name: event.target.value,
            })
          }}
        />
        <CustomTextField
          size="small"
          label="E-mail"
          type="email"
          placeholder="Digite o e-mail"
          value={newClientData?.email}
          onChange={(event) => {
            setNewClientData({
              ...newClientData,
              email: event.target.value,
            })
          }}
        />

        <CustomTextField
          size="small"
          label="CPF"
          type="text"
          placeholder="Digite o CPF do cliente"
          value={newClientData?.cpf}
          onChange={(event) => {
            setNewClientData({
              ...newClientData,
              cpf: event.target.value,
            })
          }}
        />

        <CustomTextField
          size="small"
          label="Telefone"
          type="tel"
          placeholder="Digite o telefone"
          value={newClientData?.phone}
          onChange={(event) => {
            setNewClientData({
              ...newClientData,
              phone: event.target.value,
            })
          }}
        />
      </div>
    </ModalLayout>
  )
}
