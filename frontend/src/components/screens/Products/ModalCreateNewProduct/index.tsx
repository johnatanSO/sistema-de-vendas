import { ModalLayout } from '../../../_ui/ModalLayout'
import { FormEvent, useState, useContext } from 'react'
import style from './ModalCreateNewProduct.module.scss'
import { CustomTextField } from '../../../_ui/CustomTextField'
import { productsService } from '../../../../services/productsService'
import { AlertContext } from '../../../../contexts/alertContext'
import { useRouter } from 'next/router'
import { Checkbox, FormControlLabel, Popover, Typography } from '@mui/material'
import { Info } from '@phosphor-icons/react'

export interface NewProductData {
  name: string
  stock: number | string
  value: number | string
  isDefault: boolean
}

interface Props {
  productDataToEdit: NewProductData
  open: boolean
  handleClose: () => void
}

export function ModalCreateNewProduct({
  open,
  handleClose,
  productDataToEdit,
}: Props) {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)
  const defaultNewProductValues = {
    name: '',
    stock: 0,
    value: 0,
    isDefault: false,
  }
  const [newProductData, setNewProductData] = useState<NewProductData>(
    productDataToEdit || defaultNewProductValues,
  )
  const [loadingCreateNewProduct, setLoadingCreateNewProduct] =
    useState<boolean>(false)
  const router = useRouter()
  const [anchorEl, setAnchorEl] = useState<any>(null)

  function onCreateNewProduct(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setLoadingCreateNewProduct(true)

    if (!newProductData?.name) {
      setAlertNotifyConfigs({
        ...alertNotifyConfigs,
        open: true,
        type: 'error',
        text: 'Nenhum nome foi informado',
      })
      return
    }
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
          text: `Erro ao tentar cadastrar produto - ${
            err?.response?.data?.message || err?.message
          }`,
        })
      })
      .finally(() => {
        setLoadingCreateNewProduct(false)
      })
  }

  function onEditProduct(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setLoadingCreateNewProduct(true)

    if (!newProductData?.name) {
      setAlertNotifyConfigs({
        ...alertNotifyConfigs,
        open: true,
        type: 'error',
        text: 'Nenhum nome foi informado',
      })
      return
    }
    productsService
      .update({ productData: newProductData })
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
          text: 'Dados do produto atualizado com sucesso',
        })
      })
      .catch((err) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          type: 'error',
          text:
            'Erro ao tentar atualizar dados produto ' +
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
      onSubmit={productDataToEdit ? onEditProduct : onCreateNewProduct}
      title="Cadastro de produto"
      submitButtonText="Cadastrar"
      loading={loadingCreateNewProduct}
    >
      <div className={style.fieldsContainer}>
        <CustomTextField
          size="small"
          required
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

        <div className={style.labelDefaultProduct}>
          <FormControlLabel
            onChange={(event: any) => {
              setNewProductData({
                ...newProductData,
                isDefault: event.target.checked,
              })
            }}
            control={
              <Checkbox
                checked={newProductData?.isDefault}
                sx={{
                  '&.Mui-checked': { color: '#ff6600' },
                }}
              />
            }
            label="Tornar este produto padrão"
          />

          <Info
            onClick={(event) => {
              setAnchorEl(event.currentTarget)
            }}
            size={25}
            className={style.infoIcon}
          />

          <Popover
            id="simple-popover"
            open={!!anchorEl}
            anchorEl={anchorEl}
            onClose={() => {
              setAnchorEl(null)
            }}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <Typography sx={{ p: 2 }} className={style.popover}>
              Ao definir um produto como padrão, ele será selecionado
              automaticamente no momento de realizar uma venda.
            </Typography>
          </Popover>
        </div>

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
