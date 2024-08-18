import { productsService } from '../../../services/productsService'
import { HeaderPage } from '../../_ui/HeaderPage'
import { useContext, useEffect, useState } from 'react'
import { ModalCreateNewProduct } from './ModalCreateNewProduct'
import { TableComponent } from '../../_ui/TableComponent'
import { Column } from '../../../models/interfaces/Column'
import { useColumns } from './hooks/useColumns'
import { useRouter } from 'next/router'
import { FilterByName } from '../../_ui/FilterByName'
import { AlertContext } from '../../../contexts/alertContext'
import style from './Products.module.scss'
import { ListMobile } from '../../_ui/ListMobile'
import { useFieldsMobile } from './hooks/useFieldsMobile'
import { httpClientProvider } from '../../../providers/HttpClientProvider'
import { ALERT_NOTIFY_TYPE } from '../../../models/enums/AlertNotifyType'

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
      .getAll({ filters: { ...router.query } }, httpClientProvider)
      .then(({ data: { items } }) => {
        setProducts(items)
      })
      .catch((err) => {
        console.error(err)
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
          .delete({ idProduct: product?._id }, httpClientProvider)
          .then(() => {
            setAlertNotifyConfigs({
              ...alertNotifyConfigs,
              open: true,
              type: ALERT_NOTIFY_TYPE.SUCCESS,
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
              type: ALERT_NOTIFY_TYPE.ERROR,
              text: `Erro ao tentar excluir produto - ${err?.message}`,
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

  const fieldsMobile = useFieldsMobile()

  return (
    <>
      <HeaderPage
        onClickFunction={() => {
          setFormModalOpened(true)
        }}
        buttonText="Novo produto"
        InputFilter={<FilterByName />}
      />

      <div className={style.viewDesktop}>
        <TableComponent
          loading={loadingProducts}
          columns={columns}
          rows={products}
          emptyText="Nenhum produto cadastrado"
        />
      </div>

      <div className={style.viewMobile}>
        <ListMobile
          collapseItems={columns}
          itemFields={fieldsMobile}
          items={products}
          loading={loadingProducts}
          emptyText="Nenhum produto cadastrado"
        />
      </div>

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
