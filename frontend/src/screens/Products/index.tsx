import { productsService } from '../../services/productsService'
import { HeaderPage } from '../../components/HeaderPage'
import { useEffect, useState } from 'react'
import style from './Products.module.scss'
import { ModalCreateNewProduct } from './ModalCreateNewProduct'

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

  return (
    <>
      <HeaderPage
        onClickFunction={() => {
          setFormModalOpened(true)
        }}
        buttonText="Novo produto"
      />
      {loadingProducts && <span>carregando produtos...</span>}
      <table className={style.table}>
        <thead>
          <tr>
            <th>Title 1</th>
            <th>Title 2</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((sale) => {
            return (
              <tr key={sale._id}>
                <td>Corpo 1</td>
                <td>Corpo 2</td>
              </tr>
            )
          })}
        </tbody>
        <tfoot>
          <tr>
            <td>Footer 1</td>
            <td>Footer 2</td>
          </tr>
        </tfoot>
      </table>

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
