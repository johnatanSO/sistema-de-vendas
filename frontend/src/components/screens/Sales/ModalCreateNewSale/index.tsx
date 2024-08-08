import { ModalLayout } from '../../../_ui/ModalLayout'
import { FormEvent, useState, ChangeEvent, useContext, useEffect } from 'react'
import style from './ModalCreateNewSale.module.scss'
import { CustomTextField } from '../../../_ui/CustomTextField'
import { Autocomplete, MenuItem } from '@mui/material'
import { paymentTypesList } from '../../../../models/paymentTypesList'
import { productsService } from '../../../../services/productsService'
import { Product } from '../../Products'
import { format } from '../../../../utils/format'
import { AlertContext } from '../../../../contexts/alertContext'
import { salesService } from '../../../../services/salesService'
import { useRouter } from 'next/router'
import { clientsService } from '../../../../services/clientsService'
import { Trash } from '@phosphor-icons/react'

interface ProductSale extends Product {
  amount: number
}

interface Client {
  _id: string
  name: string
}

export interface NewSaleData {
  clientId: string | null
  paymentType: string | null
  products: ProductSale[]
  totalValue: number
}

interface Props {
  saleToEditData: NewSaleData | undefined
  open: boolean
  handleClose: () => void
}

export function ModalCreateNewSale({
  open,
  handleClose,
  saleToEditData,
}: Props) {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()
  const defaultValuesNewSale = {
    clientId: null,
    paymentType: null,
    products: [],
    totalValue: 0,
  }
  const [newSaleData, setNewSaleData] = useState<NewSaleData>(
    saleToEditData || defaultValuesNewSale,
  )
  const [productsList, setProductsList] = useState<ProductSale[]>([])
  const [clientsList, setClientsList] = useState<Client[]>([])

  function getProducts() {
    productsService
      .getAll({ filters: {} })
      .then((res) => {
        setProductsList(res.data.items)
      })
      .catch((err) => {
        console.log('ERRO AO BUSCAR PRODUTOS: ', err)
      })
  }

  function getClientsList() {
    clientsService
      .getAll()
      .then((res) => {
        setClientsList(res.data.items)
      })
      .catch((err) => {
        console.error(err)

        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          type: 'error',
          open: true,
          text: 'Erro ao buscar clientes',
        })
      })
  }

  function handleAddNewProduct(event: any) {
    const { value } = event.target
    const newProduct = productsList.find((prodItem) => prodItem?._id === value)
    if (!newProduct) return

    const alreadExistProductInList = !!newSaleData.products.find(
      (product) => product?._id === newProduct?._id,
    )
    if (alreadExistProductInList) return
    newProduct.amount = 1

    setNewSaleData({
      ...newSaleData,
      products: [...newSaleData.products, newProduct],
    })
  }

  function handleChangeProduct(
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    index: number,
  ) {
    const { name, value } = event.target

    const copyNewSaleData: any = { ...newSaleData }
    copyNewSaleData.products[index][name] = value
    setNewSaleData(copyNewSaleData)
  }

  function handleRemoveProduct(productId: string) {
    const newProducts = newSaleData.products.filter(
      (prod) => prod._id !== productId,
    )
    setNewSaleData({
      ...newSaleData,
      products: newProducts,
    })
  }

  const totalValue = newSaleData?.products?.reduce((acc, prod) => {
    acc += Number(prod.value) * Number(prod.amount)
    return acc
  }, 0)

  function onCreateNewSale(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!newSaleData.paymentType) {
      setAlertNotifyConfigs({
        ...alertNotifyConfigs,
        type: 'error',
        open: true,
        text: 'Forma de pagamento não informada',
      })
      return
    }
    if (newSaleData.products.length === 0) {
      setAlertNotifyConfigs({
        ...alertNotifyConfigs,
        type: 'error',
        open: true,
        text: 'Nenhum produto selecionado',
      })
      return
    }

    setLoading(true)
    salesService
      .create({ newSaleData, totalValue })
      .then(() => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          type: 'success',
          open: true,
          text: 'Venda realizada com sucesso',
        })
        setNewSaleData(defaultValuesNewSale)
        router.push({
          pathname: router.route,
          query: router.query,
        })
        handleClose()
      })
      .catch((err) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          type: 'error',
          open: true,
          text: `Erro ao tentar realizar venda - ${
            err?.response?.data?.message || err?.message
          }`,
        })

        console.error(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  function onEditSale(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!newSaleData.paymentType) {
      setAlertNotifyConfigs({
        ...alertNotifyConfigs,
        type: 'error',
        open: true,
        text: 'Forma de pagamento não informada',
      })
      console.log('Forma de pagamento não informada')
      return
    }
    if (newSaleData.products.length === 0) {
      setAlertNotifyConfigs({
        ...alertNotifyConfigs,
        type: 'error',
        open: true,
        text: 'Nenhum produto selecionado',
      })
      console.log('Nenhum produto selecionado')
      return
    }

    setLoading(true)
    salesService
      .update({ saleData: newSaleData, totalValue })
      .then(() => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          type: 'success',
          open: true,
          text: 'Venda atualizada com sucesso',
        })
        setNewSaleData(defaultValuesNewSale)
        router.push({
          pathname: router.route,
          query: router.query,
        })
        handleClose()
      })
      .catch((err) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          type: 'error',
          open: true,
          text: 'Erro ao tentar atualizar venda' + err.response.data.message,
        })
        console.log('[ERROR]: ', err.response.data.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    if (!saleToEditData)
      productsService
        .getDefaultProducts()
        .then((res) => {
          const defaultProducts = res.data.items
          const defaultProductsList = defaultProducts.map(
            (product: Product) => ({
              ...product,
              amount: 1,
            }),
          )
          setNewSaleData({
            ...newSaleData,
            products: defaultProductsList,
          })
        })
        .catch((err) => {
          console.log(
            'ERRO AO BUSCAR PRODUTO PADRÃO, ' + err.response.data.message,
          )
        })
  }, [saleToEditData])

  return (
    <ModalLayout
      open={open}
      handleClose={handleClose}
      onSubmit={saleToEditData ? onEditSale : onCreateNewSale}
      title={saleToEditData ? 'Editar venda' : 'Realizar nova venda'}
      submitButtonText={saleToEditData ? 'Atualizar' : 'Finalizar'}
      loading={loading}
    >
      <div className={style.content}>
        <section className={style.sectionContainer}>
          <h3>Informações da venda</h3>
          <div className={style.fieldsContainer}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={clientsList}
              onFocus={getClientsList}
              noOptionsText="Nenhum cliente encontrado"
              loadingText="Buscando clientes..."
              onChange={(event, value) => {
                setNewSaleData({
                  ...newSaleData,
                  clientId: value?._id || null,
                })
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
              required
              select
              placeholder="Escolha a forma de pagamento"
              value={newSaleData?.paymentType}
              onChange={(event) => {
                setNewSaleData({
                  ...newSaleData,
                  paymentType: event.target.value,
                })
              }}
            >
              {paymentTypesList.map(({ text, value }) => {
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
            {newSaleData.products.length > 0 && (
              <span>{format.formatarReal(totalValue || 0)}</span>
            )}
          </div>
          {newSaleData.products.length > 0 ? (
            <ul className={style.listProducts}>
              {newSaleData.products.map((product, index) => {
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

                    <Trash
                      size={23}
                      className={style.removeProductIcon}
                      weight="bold"
                      onClick={() => {
                        handleRemoveProduct(product?._id)
                      }}
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
