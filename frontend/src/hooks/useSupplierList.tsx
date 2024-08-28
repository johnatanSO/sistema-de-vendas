import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { suppliersService } from '../services/suppliersService'
import { ISupplier } from '../models/interfaces/ISupplier'
import { httpClientProvider } from '../providers/HttpClientProvider'

export function useSupplierList() {
  const [suppliers, setSuppliers] = useState<ISupplier[]>([])
  const [loadingSuppliers, setLoadingSuppliers] = useState<boolean>(true)

  const router = useRouter()

  function getSuppliers() {
    setLoadingSuppliers(true)
    suppliersService
      .getAll(httpClientProvider)
      .then((res) => {
        setSuppliers(res.data.items)
      })
      .catch((err) => {
        console.log('ERRO AO BUSCAR FORNECEDORES, ', err)
      })
      .finally(() => {
        setLoadingSuppliers(false)
      })
  }

  useEffect(() => {
    getSuppliers()
  }, [router.query])

  return {
    suppliers,
    loadingSuppliers,
  }
}
