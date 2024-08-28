import { useEffect, useState } from 'react'
import { IAccount } from '../models/interfaces/IAccount'
import { accountsService } from '../services/accountsService'
import { httpClientProvider } from '../providers/HttpClientProvider'
import { useRouter } from 'next/router'
import { ACCOUNT_STATUS } from '../models/enums/AccountStatus'

interface Props {
  otherFilters: {
    status?: ACCOUNT_STATUS
  } | null
}

export function useAccountList({ otherFilters }: Props) {
  const [accounts, setAccounts] = useState<IAccount[]>([])
  const [loadingAccounts, setLoadingAccounts] = useState<boolean>(true)

  const router = useRouter()

  function getAccounts() {
    setLoadingAccounts(true)
    accountsService
      .getAll(
        {
          filters: {
            ...router.query,
            ...otherFilters,
          },
        },
        httpClientProvider,
      )
      .then((res) => {
        setAccounts(res.data.items)
      })
      .catch((err) => {
        console.log('ERRO AO BUSCAR CONTAS, ', err)
      })
      .finally(() => {
        setLoadingAccounts(false)
      })
  }

  useEffect(() => {
    getAccounts()
  }, [router.query])

  return {
    accounts,
    loadingAccounts,
  }
}
