import { productsService } from '../../services/productsService'
import { HeaderPage } from '../../components/HeaderPage'
import { useContext, useEffect, useState } from 'react'
import { ModalCreateNewProduct } from './ModalCreateNewProduct'
import { TableComponent } from '../../../src/components/TableComponent'
import { Column } from '../../../src/models/columns'
import { useColumns } from './hooks/useColumns'
import { EmptyItems } from '../../../src/components/EmptyItems'
import { useRouter } from 'next/router'
import { FilterByName } from '../../../src/components/FilterByName'
import { AlertContext } from '../../../src/contexts/alertContext'

export interface Product {
  _id: string
  name: string
  value: number
}

export function Products() {
  const {
    alertDialogConfirmConfigs,
    setAlertDialogConfirmConfigs,
    alertNotifyConfigs,
    setAlertNotifyConfigs,
  } = useContext(AlertContext)
  const [products, setProducts] = useState<Product[]>([])
  const [loadingProducts, setLoadingProducts] = useState<boolean>(true)
  const [formModalOpened, setFormModalOpened] = useState<boolean>(false)
  const [productDataToEdit, setProductDataToEdit] = useState<any>(undefined)
  const router = useRouter()

  function getProducts() {
    setLoadingProducts(true)
    productsService
      .getAll({ filters: { ...router.query } })
      .then((res) => {
        setProducts(res.data.items)
      })
      .catch((err) => {
        console.log('ERRO AO BUSCAR PRODUTOS, ', err)
      })
      .finally(() => {
        setLoadingProducts(false)
      })
  }

  useEffect(() => {
    getProducts()
  }, [router.query])

  function handleDeleteProduct(product: Product) {
    setAlertDialogConfirmConfigs({
      ...alertDialogConfirmConfigs,
      open: true,
      title: 'Alerta de confirmação',
      text: 'Deseja realmente excluir este produto?',
      onClickAgree: () => {
        productsService
          .delete({ idProduct: product?._id })
          .then(() => {
            setAlertNotifyConfigs({
              ...alertNotifyConfigs,
              open: true,
              type: 'success',
              text: 'Produto excluído com sucesso',
            })
            router.push({
              pathname: router.route,
              query: router.query,
            })
          })
          .catch((err) => {
            setAlertNotifyConfigs({
              ...alertNotifyConfigs,
              open: true,
              type: 'error',
              text: `Erro ao tentar excluir produto (${err.response.data.error})`,
            })
          })
      },
    })
  }

  function handleEditProduct(product: Product) {
    setProductDataToEdit(product)
    setFormModalOpened(true)
  }

  const columns: Column[] = useColumns({
    handleEditProduct,
    handleDeleteProduct,
  })

  return (
    <>
      <HeaderPage
        onClickFunction={() => {
          setFormModalOpened(true)
        }}
        buttonText="Novo produto"
        InputFilter={<FilterByName />}
      />

      {products?.length > 0 && (
        <TableComponent
          loading={loadingProducts}
          columns={columns}
          rows={products}
        />
      )}

      {products?.length === 0 && !loadingProducts && (
        <EmptyItems text="Nenhum produto foi encontrado" />
      )}

      {formModalOpened && (
        <ModalCreateNewProduct
          productDataToEdit={productDataToEdit}
          open={formModalOpened}
          handleClose={() => {
            setFormModalOpened(false)
            setProductDataToEdit(undefined)
          }}
        />
      )}
    </>
  )
}
