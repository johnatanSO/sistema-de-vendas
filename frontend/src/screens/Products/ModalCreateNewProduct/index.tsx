import { ModalLayout } from '../../../components/ModalLayout'
import { FormEvent, useState, useContext } from 'react'
import style from './ModalCreateNewProduct.module.scss'
import { CustomTextField } from '../../../../src/components/CustomTextField'
import { productsService } from '../../../../src/services/productsService'
import { AlertContext } from '../../../../src/contexts/alertContext'
import { useRouter } from 'next/router'

interface Props {
  open: boolean
  handleClose: () => void
}

export interface NewProductData {
  name: string
  stock: string
  value: string
}

export function ModalCreateNewProduct({ open, handleClose }: Props) {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)
  const defaultNewProductValues = {
    name: '',
    stock: '0',
    value: '0',
  }
  const [newProductData, setNewProductData] = useState<NewProductData>(
    defaultNewProductValues,
  )
  const [loadingCreateNewProduct, setLoadingCreateNewProduct] =
    useState<boolean>(false)
  const router = useRouter()
  function onCreateNewProduct(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    /* if (!newProductData?.name) {
      setAlertNotifyConfigs({
        ...alertNotifyConfigs,
        open: true,
        type: 'error',
        text: 'Nenhum nome foi informado',
      })
      return
    } */
    productsService
      .create({ newProductData })
      .then(() => {
        router.push({
          pathname: router.route,
          query: router.query,
        })
        setNewProductData(defaultNewProductValues)
        handleClose()
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          type: 'success',
          text: 'Produto cadastrado com sucesso',
        })
      })
      .catch((err) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          type: 'error',
          text:
            'Erro ao tentar cadastrar produto ' +
            `(${err.response.data.message})`,
        })
      })
      .finally(() => {
        setLoadingCreateNewProduct(false)
      })
  }

  return (
    <ModalLayout
      open={open}
      handleClose={handleClose}
      onSubmit={onCreateNewProduct}
      title="Cadastro de produto"
      submitButtonText="Cadastrar"
      loading={loadingCreateNewProduct}
    >
      <div className={style.fieldsContainer}>
        <CustomTextField
          size="small"
          label="Nome"
          type="text"
          placeholder="Digite o nome"
          value={newProductData?.name}
          onChange={(event) => {
            setNewProductData({
              ...newProductData,
              name: event.target.value,
            })
          }}
        />
        <CustomTextField
          size="small"
          label="Quantidade"
          type="number"
          placeholder="Digite a quantidade"
          value={newProductData?.stock}
          onChange={(event) => {
            setNewProductData({
              ...newProductData,
              stock: event.target.value,
            })
          }}
        />
        <CustomTextField
          size="small"
          label="Valor"
          type="number"
          placeholder="Digite o valor"
          value={newProductData?.value}
          onChange={(event) => {
            setNewProductData({
              ...newProductData,
              value: event.target.value,
            })
          }}
        />
      </div>
    </ModalLayout>
  )
}
