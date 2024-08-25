import { useEffect, useState } from 'react'
import { ISale } from '../../../../models/interfaces/ISale'
import { useRouter } from 'next/router'
import { salesService } from '../../../../services/salesService'
import { httpClientProvider } from '../../../../providers/HttpClientProvider'

export function useSaleList() {
  const [sales, setSales] = useState<ISale[]>([])
  const [loadingSales, setLoadingSales] = useState<boolean>(true)

  const router = useRouter()

  function getSales() {
    setLoadingSales(true)
    salesService
      .getAll({ filters: { ...(router.query as any) } }, httpClientProvider)
      .then((res) => {
        setSales(res.data.items)
      })
      .catch((err) => {
        console.log('ERRO AO BUSCAR VENDAS, ', err)
      })
      .finally(() => {
        setLoadingSales(false)
      })
  }

  useEffect(() => {
    getSales()
  }, [router.query])

  return {
    sales,
    loadingSales,
  }
}
