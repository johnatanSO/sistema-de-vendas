import { useState } from 'react'
import { ISale } from '../../../../models/interfaces/ISale'

export function useEditSale() {
  const [formModalOpened, setFormModalOpened] = useState<boolean>(false)
  const [saleToEditData, setSaleToEditData] = useState<ISale | null>(null)

  function handleEditSale(sale: ISale) {
    setSaleToEditData(sale)
    setFormModalOpened(true)
  }

  return {
    handleEditSale,
    formModalOpened,
    saleToEditData,
    setFormModalOpened,
    setSaleToEditData,
  }
}
