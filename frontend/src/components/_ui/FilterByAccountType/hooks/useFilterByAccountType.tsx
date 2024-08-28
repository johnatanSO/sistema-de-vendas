import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import {
  filterByAccountTypeSchema,
  IFilterByAccountType,
} from '../interfaces/IFilterByAccountType'
import { zodResolver } from '@hookform/resolvers/zod'

export function useFilterByAccountType() {
  const router = useRouter()
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<IFilterByAccountType>({
    defaultValues: {
      accountType: router?.query?.accountType?.toString() || 'all',
    },
    resolver: zodResolver(filterByAccountTypeSchema),
  })

  const accountType = watch('accountType')

  function handleSelectAccountType() {
    if (accountType !== 'all') {
      router.push({
        pathname: router.route,
        query: {
          accountType,
        },
      })

      return
    }

    router.push(router.route)
  }

  useEffect(() => {
    handleSelectAccountType()
  }, [accountType])

  return {
    register,
    errors,
  }
}
