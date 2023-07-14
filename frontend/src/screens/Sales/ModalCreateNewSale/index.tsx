import { ModalLayout } from '../../../components/ModalLayout'
import { FormEvent, useState } from 'react'
import style from './ModalCreateNewSale.module.scss'
import { CustomTextField } from '../../../components/CustomTextField'
import { MenuItem } from '@mui/material'
import { paymentTypesList } from '../../../models/paymentTypesList'
import { productsService } from '../../../services/productsService'
import { Product } from '../../Products'

interface Props {
  open: boolean
  handleClose: () => void
}

interface ProductSale extends Product {
  amount: number
}

interface NewSaleData {
  client: string
  paymentType: string
  products: ProductSale[]
  totalValue: number
}

export function ModalCreateNewSale({ open, handleClose }: Props) {
  const defaultValuesNewSale = {
    client: '',
    paymentType: '',
    products: [],
    totalValue: 0,
  }
  const [newSaleData, setNewSaleData] =
    useState<NewSaleData>(defaultValuesNewSale)
  const [productsList, setProductsList] = useState<ProductSale[]>([])

  function onCreateNewSale(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
  }

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

  function handleAddNewProduct({ value }: any) {
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

  return (
    <ModalLayout
      open={open}
      handleClose={handleClose}
      onSubmit={onCreateNewSale}
      title="Realizar nova venda"
      submitButtonText="Finalizar"
      loading={true}
    >
      <div className={style.content}>
        <section className={style.sectionContainer}>
          <h3>Informações da venda</h3>
          <div className={style.fieldsContainer}>
            <CustomTextField
              size="small"
              className={style.input}
              label="Cliente"
              type="text"
              placeholder="Digite o nome do cliente"
              value={newSaleData?.client}
              onChange={(event) => {
                setNewSaleData({
                  ...newSaleData,
                  client: event.target.value,
                })
              }}
            />
            <CustomTextField
              size="small"
              className={style.input}
              label="Forma de pagamento"
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
              value={undefined}
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
          <h3>Produtos</h3>
          {newSaleData.products.length > 0 ? (
            <ul className={style.listProducts}>
              {newSaleData.products.map((product) => {
                return <li key={product?._id}></li>
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
