import { ModalLayout } from '../../../_ui/ModalLayout'
import { FormEvent, useState, useContext } from 'react'
import style from './ModalCreateNewSupplier.module.scss'
import { CustomTextField } from '../../../_ui/CustomTextField'
import { AlertContext } from '../../../../contexts/alertContext'
import { useRouter } from 'next/router'
import { suppliersService } from '../../../../services/suppliersService'
import { httpClientProvider } from '../../../../providers/HttpClientProvider'

export interface NewSupplierData {
  _id?: string
  name: string
  cnpj: string
  phone: string
  email: string
}

interface Props {
  supplierDataToEdit: NewSupplierData
  open: boolean
  handleClose: () => void
}

export function ModalCreateNewSupplier({
  open,
  handleClose,
  supplierDataToEdit,
}: Props) {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)
  const defaultNewSupplierValues = {
    name: '',
    cnpj: '',
    phone: '',
    email: '',
  }
  const [newSupplierData, setNewSupplierData] = useState<NewSupplierData>(
    supplierDataToEdit || defaultNewSupplierValues,
  )
  const [loadingCreateNewSupplier, setLoadingCreateNewSupplier] =
    useState<boolean>(false)

  const router = useRouter()

  function onCreateNewSupplier(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    suppliersService
      .create({ ...newSupplierData }, httpClientProvider)
      .then(() => {
        router.push({
          pathname: router.route,
          query: router.query,
        })
        setNewSupplierData(defaultNewSupplierValues)
        handleClose()
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          type: 'success',
          text: 'Fornecedor cadastrado com sucesso',
        })
      })
      .catch((err) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          type: 'error',
          text: 'Erro ao tentar cadastrar fornecedor ' + `(${err?.message})`,
        })
      })
      .finally(() => {
        setLoadingCreateNewSupplier(false)
      })
  }

  function onEditSupplier(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const supplierId = supplierDataToEdit._id

    if (!supplierId) return

    suppliersService
      .update({ ...newSupplierData, supplierId }, httpClientProvider)
      .then(() => {
        router.push({
          pathname: router.route,
          query: router.query,
        })
        setNewSupplierData(defaultNewSupplierValues)
        handleClose()
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          type: 'success',
          text: 'Dados do fornecedor atualizados com sucesso',
        })
      })
      .catch((err) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          type: 'error',
          text:
            'Erro ao tentar atualizar dados do fornecedor ' +
            `(${err?.message})`,
        })
      })
      .finally(() => {
        setLoadingCreateNewSupplier(false)
      })
  }

  return (
    <ModalLayout
      open={open}
      handleClose={handleClose}
      onSubmit={supplierDataToEdit ? onEditSupplier : onCreateNewSupplier}
      title="Cadastro de fornecedor"
      submitButtonText="Cadastrar"
      loading={loadingCreateNewSupplier}
      customStyle={{ width: '500px' }}
    >
      <div className={style.fieldsContainer}>
        <CustomTextField
          size="small"
          label="Nome"
          type="text"
          placeholder="Digite o nome do fornecedor"
          value={newSupplierData?.name}
          onChange={(event) => {
            setNewSupplierData({
              ...newSupplierData,
              name: event.target.value,
            })
          }}
        />
        <CustomTextField
          size="small"
          label="E-mail"
          type="email"
          placeholder="Digite o e-mail"
          value={newSupplierData?.email}
          onChange={(event) => {
            setNewSupplierData({
              ...newSupplierData,
              email: event.target.value,
            })
          }}
        />

        <CustomTextField
          size="small"
          label="CNPJ"
          type="number"
          placeholder="Digite o CNPJ do fornecedor"
          value={newSupplierData?.cnpj}
          onChange={(event) => {
            setNewSupplierData({
              ...newSupplierData,
              cnpj: event.target.value,
            })
          }}
        />

        <CustomTextField
          size="small"
          label="Telefone"
          type="tel"
          placeholder="Digite o telefone"
          value={newSupplierData?.phone}
          onChange={(event) => {
            setNewSupplierData({
              ...newSupplierData,
              phone: event.target.value,
            })
          }}
        />
      </div>
    </ModalLayout>
  )
}
