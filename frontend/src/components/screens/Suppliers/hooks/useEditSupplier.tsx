import { useState } from 'react'
import { ISupplier } from '../../../../models/interfaces/ISupplier'

export function useEditSupplier() {
  const [formModalOpened, setFormModalOpened] = useState<boolean>(false)
  const [supplierDataToEdit, setSupplierDataToEdit] =
    useState<ISupplier | null>(null)

  function handleEditSupplier(supplier: ISupplier) {
    setSupplierDataToEdit(supplier)
    setFormModalOpened(true)
  }

  return {
    handleEditSupplier,
    formModalOpened,
    setFormModalOpened,
    supplierDataToEdit,
    setSupplierDataToEdit,
  }
}
