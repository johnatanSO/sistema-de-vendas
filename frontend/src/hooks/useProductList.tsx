import { useEffect, useState } from 'react'
import { IProduct } from '../models/interfaces/IProduct'
import { useRouter } from 'next/router'
import { productsService } from '../services/productsService'
import { httpClientProvider } from '../providers/HttpClientProvider'

export function useProductList() {
  const [products, setProducts] = useState<IProduct[]>([])
  const [loadingProducts, setLoadingProducts] = useState<boolean>(true)

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

  return {
    products,
    loadingProducts,
  }
}
