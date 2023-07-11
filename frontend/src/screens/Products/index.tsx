import { productsService } from '../../services/productsService'
import { HeaderPage } from '../../components/HeaderPage'
import { useEffect, useState } from 'react'
import { ModalCreateNewProduct } from './ModalCreateNewProduct'
import { TableComponent } from '../../../src/components/TableComponent'
import { Column } from '../../../src/models/columns'
import { useColumns } from './hooks/useColumns'
import { EmptyItems } from '../../../src/components/EmptyItems'
import { useRouter } from 'next/router'
import { FilterByName } from '../../../src/components/FilterByName'

export interface Product {
  _id: string
}

export function Products() {
  const [products, setProducts] = useState<Product[]>([])
  const [loadingProducts, setLoadingProducts] = useState<boolean>(true)
  const [formModalOpened, setFormModalOpened] = useState<boolean>(false)
  const router = useRouter()

  function getProducts() {
    setLoadingProducts(true)
    productsService
      .getAll({ filters: { ...router.query } })
      .then((res) => {
        setProducts(res.data.items)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setLoadingProducts(false)
      })
  }

  useEffect(() => {
    getProducts()
  }, [router.query])

  function handleDeleteProduct(product: Product) {
    console.log('DELETE')
  }

  function handleEditProduct(product: Product) {
    console.log('EDIT')
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
          open={formModalOpened}
          handleClose={() => {
            setFormModalOpened(false)
          }}
        />
      )}
    </>
  )
}
