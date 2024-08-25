import { ModalLayout } from '../../../_ui/ModalLayout'
import { useState, useContext } from 'react'
import style from './ModalCreateNewProduct.module.scss'
import { CustomTextField } from '../../../_ui/CustomTextField'
import { productsService } from '../../../../services/productsService'
import { AlertContext } from '../../../../contexts/alertContext'
import { useRouter } from 'next/router'
import { Checkbox, FormControlLabel, Popover, Typography } from '@mui/material'
import { httpClientProvider } from '../../../../providers/HttpClientProvider'
import { ALERT_NOTIFY_TYPE } from '../../../../models/enums/AlertNotifyType'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { useForm } from 'react-hook-form'
import { IProduct } from '../../../../models/interfaces/IProduct'
import { INewProduct, newProductSchema } from '../interfaces/INewProduct'
import { zodResolver } from '@hookform/resolvers/zod'

interface Props {
  productDataToEdit: IProduct | null
  open: boolean
  handleClose: () => void
}

export function ModalCreateNewProduct({
  open,
  handleClose,
  productDataToEdit,
}: Props) {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isLoading },
  } = useForm<INewProduct>({
    defaultValues: productDataToEdit || {
      name: '',
      stock: 0,
      value: 0,
      isDefault: false,
    },
    resolver: zodResolver(newProductSchema),
  })

  const isDefault = watch('isDefault')

  const router = useRouter()
  const [anchorEl, setAnchorEl] = useState<Element | null>(null)

  function onCreateNewProduct(newProduct: INewProduct) {
    if (!newProduct?.name) {
      setAlertNotifyConfigs({
        ...alertNotifyConfigs,
        open: true,
        type: ALERT_NOTIFY_TYPE.ERROR,
        text: 'Nenhum nome foi informado',
      })

      return
    }

    productsService
      .create({ ...newProduct }, httpClientProvider)
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
          text: 'Produto cadastrado com sucesso',
        })
      })
      .catch((err) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          type: ALERT_NOTIFY_TYPE.ERROR,
          text: `Erro ao tentar cadastrar produto - ${err?.message}`,
        })
      })
  }

  function onEditProduct(product: INewProduct) {
    if (!product.name) {
      setAlertNotifyConfigs({
        ...alertNotifyConfigs,
        open: true,
        type: ALERT_NOTIFY_TYPE.ERROR,
        text: 'Nenhum nome foi informado',
      })

      return
    }

    productsService
      .update({ ...product, _id: product._id || '' }, httpClientProvider)
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
          text: 'Dados do produto atualizado com sucesso',
        })
      })
      .catch((err) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          open: true,
          type: ALERT_NOTIFY_TYPE.ERROR,
          text: 'Erro ao tentar atualizar dados produto ' + `(${err?.message})`,
        })
      })
  }

  return (
    <ModalLayout
      open={open}
      handleClose={handleClose}
      onSubmit={handleSubmit(
        productDataToEdit ? onEditProduct : onCreateNewProduct,
      )}
      title="Cadastro de produto"
      submitButtonText="Cadastrar"
      loading={isLoading}
    >
      <div className={style.fieldsContainer}>
        <CustomTextField
          size="small"
          required
          label="Nome"
          type="text"
          placeholder="Digite o nome"
          {...register('name', { required: true })}
          error={!!errors?.name}
          helperText={errors.name && errors?.name?.message}
        />

        <CustomTextField
          size="small"
          label="Quantidade"
          type="number"
          placeholder="Digite a quantidade"
          {...register('stock', { required: true, valueAsNumber: true })}
          error={!!errors.stock}
          helperText={errors.stock && errors?.stock?.message}
        />

        <div className={style.labelDefaultProduct}>
          <FormControlLabel
            onChange={(event: any) => {
              setValue('isDefault', event.target.checked)
            }}
            control={
              <Checkbox
                checked={isDefault}
                sx={{
                  '&.Mui-checked': { color: '#ff6600' },
                }}
              />
            }
            label="Tornar este produto padrão"
          />

          <FontAwesomeIcon
            icon={faInfoCircle}
            className={style.infoIcon}
            onClick={(event) => {
              setAnchorEl(event.currentTarget)
            }}
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
          {...register('value', { valueAsNumber: true })}
        />
      </div>
    </ModalLayout>
  )
}
