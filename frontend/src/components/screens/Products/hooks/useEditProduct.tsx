import { useState } from 'react'
import { IProduct } from '../../../../models/interfaces/IProduct'

export function useEditProduct() {
  const [formModalOpened, setFormModalOpened] = useState<boolean>(false)
  const [productDataToEdit, setProductDataToEdit] = useState<IProduct | null>(
    null,
  )

  function handleEditProduct(product: IProduct) {
    setProductDataToEdit(product)
    setFormModalOpened(true)
  }

  return {
    handleEditProduct,
    formModalOpened,
    setFormModalOpened,
    productDataToEdit,
    setProductDataToEdit,
  }
}
