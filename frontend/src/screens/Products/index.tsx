import { productsService } from '../../services/productsService'
import { HeaderPage } from '../../components/HeaderPage'
import { useEffect, useState } from 'react'
import { ModalCreateNewProduct } from './ModalCreateNewProduct'
import { TableComponent } from '../../../src/components/TableComponent'
import { Column } from '../../../src/models/columns'
import { useColumns } from './hooks/useColumns'

interface Product {
  _id: string
}

export function Products() {
  const [products, setProducts] = useState<Product[]>([])
  const [loadingProducts, setLoadingProducts] = useState<boolean>(true)
  const [formModalOpened, setFormModalOpened] = useState<boolean>(false)

  function getProducts() {
    setLoadingProducts(true)
    productsService
      .getAll({ filters: {} })
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
  }, [])

  const columns: Column[] = useColumns()

  return (
    <>
      <HeaderPage
        onClickFunction={() => {
          setFormModalOpened(true)
        }}
        buttonText="Novo produto"
      />
      {loadingProducts && <span>carregando produtos...</span>}

      <TableComponent columns={columns} rows={products} />

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
