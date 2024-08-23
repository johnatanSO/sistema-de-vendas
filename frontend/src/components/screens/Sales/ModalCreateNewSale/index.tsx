import { ModalLayout } from '../../../_ui/ModalLayout'
import { FormEvent, useState, ChangeEvent, useContext, useEffect } from 'react'
import style from './ModalCreateNewSale.module.scss'
import { CustomTextField } from '../../../_ui/CustomTextField'
import { Autocomplete, MenuItem } from '@mui/material'
import { paymentTypeList } from '../../../../models/constants/PaymentTypeList'
import { productsService } from '../../../../services/productsService'
import { format } from '../../../../utils/format'
import { AlertContext } from '../../../../contexts/alertContext'
import { salesService } from '../../../../services/salesService'
import { useRouter } from 'next/router'
import { clientsService } from '../../../../services/clientsService'
import { httpClientProvider } from '../../../../providers/HttpClientProvider'
import { ALERT_NOTIFY_TYPE } from '../../../../models/enums/AlertNotifyType'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { ISale } from '../../../../models/interfaces/ISale'
import { IProduct } from '../../../../models/interfaces/IProduct'
import { IClient } from '../../../../models/interfaces/IClient'
import { useForm } from 'react-hook-form'
import { INewSale } from '../interfaces/INewSale'
import { useProductsList } from '../hooks/useProductsList'
import { useClientsList } from '../hooks/useClientsList'

interface Props {
  saleToEditData: ISale | null
  open: boolean
  handleClose: () => void
}

export function ModalCreateNewSale({
  open,
  handleClose,
  saleToEditData,
}: Props) {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isLoading },
  } = useForm<INewSale>({
    defaultValues: {
      clientId: null,
      paymentType: null,
      products: [],
      totalValue: 0,
    },
  })

  const products = watch('products')
  const { getProducts, productsList } = useProductsList()
  const { getClients, clientsList } = useClientsList()

  const router = useRouter()

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

  const totalValue = products?.reduce((acc, prod) => {
    acc += Number(prod.value) * Number(prod.amount)
    return acc
  }, 0)

  function onCreateNewSale(newSale: INewSale) {
    if (errors.products) {
      setAlertNotifyConfigs({
        ...alertNotifyConfigs,
        type: ALERT_NOTIFY_TYPE.ERROR,
        open: true,
        text: errors.products.message,
      })
      return
    }

    salesService
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

  function onEditSale(sale: INewSale) {
    if (errors?.products) {
      setAlertNotifyConfigs({
        ...alertNotifyConfigs,
        type: ALERT_NOTIFY_TYPE.ERROR,
        open: true,
        text: errors.products.message,
      })

      return
    }

    salesService
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

  return (
    <ModalLayout
      open={open}
      handleClose={handleClose}
      onSubmit={handleSubmit(saleToEditData ? onEditSale : onCreateNewSale)}
      title={saleToEditData ? 'Editar venda' : 'Realizar nova venda'}
      submitButtonText={saleToEditData ? 'Atualizar' : 'Finalizar'}
      loading={isLoading}
    >
      <div className={style.content}>
        <section className={style.sectionContainer}>
          <h3>Informações da venda</h3>
          <div className={style.fieldsContainer}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={clientsList}
              onFocus={getClients}
              noOptionsText="Nenhum cliente encontrado"
              loadingText="Buscando clientes..."
              onChange={(event, value) => {
                setValue('clientId', value?._id || null)
              }}
              getOptionLabel={(client) => client.name}
              renderInput={(params) => (
                <CustomTextField
                  {...params}
                  size="small"
                  className={style.input}
                  label="Cliente"
                  type="text"
                  placeholder="Digite o nome do cliente"
                />
              )}
            />

            <CustomTextField
              size="small"
              className={style.input}
              label="Forma de pagamento"
              select
              placeholder="Escolha a forma de pagamento"
              {...register('paymentType', { required: true })}
            >
              {paymentTypeList.map(({ text, value }) => {
                return (
                  <MenuItem key={value} value={value}>
                    {text || '--'}
                  </MenuItem>
                )
              })}
            </CustomTextField>

            <CustomTextField
              size="small"
              className={style.input}
              label="Produtos"
              select
              placeholder="Selecione um produto"
              onChange={handleAddNewProduct}
              onFocus={getProducts}
            >
              {productsList.map(({ _id, name }) => {
                return (
                  <MenuItem key={_id} value={_id}>
                    {name || '--'}
                  </MenuItem>
                )
              })}
            </CustomTextField>
          </div>
        </section>
        <section className={style.sectionContainer}>
          <div className={style.headerProductsList}>
            <h3>Produtos</h3>
            {products.length > 0 && (
              <span>{format.formatarReal(totalValue || 0)}</span>
            )}
          </div>
          {products.length > 0 ? (
            <ul className={style.listProducts}>
              {products.map((product, index) => {
                return (
                  <li key={product?._id}>
                    <span>{product?.name}</span>
                    <CustomTextField
                      className={style.inputProduct}
                      label="Quantidade"
                      size="small"
                      InputLabelProps={{ shrink: true }}
                      value={product?.amount}
                      name="amount"
                      type="number"
                      onChange={(event) => {
                        handleChangeProduct(event, index)
                      }}
                    />
                    <CustomTextField
                      className={style.inputProduct}
                      label="Valor"
                      type="number"
                      size="small"
                      InputLabelProps={{ shrink: true }}
                      value={product?.value}
                      name="value"
                      onChange={(event) => {
                        handleChangeProduct(event, index)
                      }}
                    />

                    <FontAwesomeIcon
                      onClick={() => {
                        handleRemoveProduct(product?._id)
                      }}
                      className={style.removeProductIcon}
                      icon={faTrash}
                    />
                  </li>
                )
              })}
            </ul>
          ) : (
            <div>
              <span>Nenhum produto selecionado</span>
            </div>
          )}
        </section>
      </div>
    </ModalLayout>
  )
}
