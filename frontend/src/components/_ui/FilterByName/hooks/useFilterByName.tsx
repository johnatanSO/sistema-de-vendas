import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { filterByNameSchema, IFilterByName } from '../interfaces/IFilterByName'
import { zodResolver } from '@hookform/resolvers/zod'

export function useFilterByName() {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFilterByName>({
    defaultValues: {
      searchString: '',
    },
    resolver: zodResolver(filterByNameSchema),
  })

  async function onFilterByName({ searchString }: IFilterByName) {
    if (searchString) {
      await router.push({
        pathname: router.route,
        query: {
          searchString,
        },
      })

      return
    }

    await router.push(router.route)
  }

  return {
    register,
    onFilterByName,
    errors,
    handleSubmit,
  }
}
