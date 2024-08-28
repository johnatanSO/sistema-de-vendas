import { useContext, useState } from 'react'
import { INewProduct, newProductSchema } from '../interfaces/INewProduct'
import { useRouter } from 'next/router'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { AlertContext } from '../../../../contexts/alertContext'
import { IProduct } from '../../../../models/interfaces/IProduct'
import { productsService } from '../../../../services/productsService'
import { httpClientProvider } from '../../../../providers/HttpClientProvider'
import { ALERT_NOTIFY_TYPE } from '../../../../models/enums/AlertNotifyType'

type Props = {
  handleClose: () => void
  productDataToEdit: IProduct | null
}

export function useFormProduct({ handleClose, productDataToEdit }: Props) {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
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

  async function onEditProduct(product: INewProduct) {
    await productsService
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

  return {
    onCreateNewProduct,
    onEditProduct,
    register,
    handleSubmit,
    setValue,
    errors,
    isSubmitting,
    isDefault,
    anchorEl,
    setAnchorEl,
  }
}
