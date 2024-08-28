import { useForm } from 'react-hook-form'
import { ISale } from '../../../../models/interfaces/ISale'
import { httpClientProvider } from '../../../../providers/HttpClientProvider'
import { salesService } from '../../../../services/salesService'
import { INewSale, newSaleSchema } from '../interfaces/INewSale'
import { zodResolver } from '@hookform/resolvers/zod'
import { ALERT_NOTIFY_TYPE } from '../../../../models/enums/AlertNotifyType'
import { useRouter } from 'next/router'
import { ChangeEvent, useContext, useEffect } from 'react'
import { AlertContext } from '../../../../contexts/alertContext'
import { productsService } from '../../../../services/productsService'
import { IProduct } from '../../../../models/interfaces/IProduct'

type Props = {
  handleClose: () => void
  saleToEditData: ISale | null
  productsList: IProduct[]
}
export function useFormSale({
  handleClose,
  saleToEditData,
  productsList,
}: Props) {
  const router = useRouter()

  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<INewSale>({
    defaultValues: saleToEditData || {
      clientId: null,
      paymentType: undefined,
      products: [],
      totalValue: 0,
    },
    resolver: zodResolver(newSaleSchema),
  })

  async function onCreateNewSale(newSale: INewSale) {
    await salesService
      .create({ newSaleData: newSale, totalValue }, httpClientProvider)
      .then(() => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          type: ALERT_NOTIFY_TYPE.SUCCESS,
          open: true,
          text: 'Venda realizada com sucesso',
        })

        reset()

        router.push({
          pathname: router.route,
          query: router.query,
        })

        handleClose()
      })
      .catch((err) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          type: ALERT_NOTIFY_TYPE.ERROR,
          open: true,
          text: `Erro ao tentar realizar venda - ${err?.message}`,
        })

        console.error(err)
      })
  }

  async function onEditSale(sale: INewSale) {
    await salesService
      .update({ saleData: sale, totalValue }, httpClientProvider)
      .then(() => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          type: ALERT_NOTIFY_TYPE.SUCCESS,
          open: true,
          text: 'Venda atualizada com sucesso',
        })

        reset()

        router.push({
          pathname: router.route,
          query: router.query,
        })

        handleClose()
      })
      .catch((err) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          type: ALERT_NOTIFY_TYPE.ERROR,
          open: true,
          text: 'Erro ao tentar atualizar venda' + err?.message,
        })
        console.log('[ERROR]: ', err?.message)
      })
  }

  function handleAddNewProduct(event: any) {
    const { value } = event.target
    const newProduct = productsList.find((prodItem) => prodItem?._id === value)
    if (!newProduct) return

    const alreadExistProductInList = !!products.find(
      (product) => product?._id === newProduct?._id,
    )
    if (alreadExistProductInList) return

    newProduct.amount = 1

    setValue('products', [...products, newProduct])
  }

  function handleChangeProduct(
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    index: number,
  ) {
    const { name, value } = event.target

    const copyProducts: any[] = [...products]

    copyProducts[index][name] = value

    setValue('products', copyProducts)
  }

  function handleRemoveProduct(productId: string) {
    const filteredProducts = products.filter((prod) => prod._id !== productId)

    setValue('products', filteredProducts)
  }

  const products = watch('products')

  const totalValue = products?.reduce((acc, prod) => {
    acc += Number(prod.value) * Number(prod.amount)
    return acc
  }, 0)

  useEffect(() => {
    console.log('errors', errors)

    if (errors.products) {
      setAlertNotifyConfigs({
        ...alertNotifyConfigs,
        type: ALERT_NOTIFY_TYPE.ERROR,
        open: true,
        text: String(errors.products.message),
      })
    }
  }, [errors.products])

  useEffect(() => {
    if (!saleToEditData)
      productsService
        .getDefaultProducts(httpClientProvider)
        .then(({ data: { items } }) => {
          const defaultProducts = items

          const defaultProductsList = defaultProducts.map(
            (product: IProduct) => ({
              ...product,
              amount: 1,
            }),
          )

          setValue('products', defaultProductsList)
        })
        .catch((err) => {
          console.log('ERRO AO BUSCAR PRODUTO PADRÃO, ' + err?.message)
        })
  }, [saleToEditData])

  return {
    onEditSale,
    onCreateNewSale,
    register,
    handleSubmit,
    setValue,
    errors,
    isSubmitting,
    products,
    totalValue,
    handleAddNewProduct,
    handleChangeProduct,
    handleRemoveProduct,
  }
}
