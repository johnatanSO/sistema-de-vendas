import { useEffect, useState } from 'react'
import { clientsService } from '../services/clientsService'
import { httpClientProvider } from '../providers/HttpClientProvider'
import { useRouter } from 'next/router'
import { IClient } from '../models/interfaces/IClient'

export function useClientList() {
  const [clients, setClients] = useState<IClient[]>([])
  const [loadingClients, setLoadingClients] = useState<boolean>(true)

  const router = useRouter()

  function getClients() {
    setLoadingClients(true)
    clientsService
      .getAll(httpClientProvider)
      .then((res) => {
        setClients(res.data.items)
      })
      .catch((err) => {
        console.log('ERRO AO BUSCAR CLIENTES, ', err)
      })
      .finally(() => {
        setLoadingClients(false)
      })
  }

  useEffect(() => {
    getClients()
  }, [router.query])

  return {
    clients,
    loadingClients,
  }
}
