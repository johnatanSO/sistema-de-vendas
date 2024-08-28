import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { filterDateSchema, IFilterDate } from '../interfaces/IFilterData'
import { zodResolver } from '@hookform/resolvers/zod'

export function useFilterDate() {
  const {
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFilterDate>({
    defaultValues: {
      startDate: dayjs().startOf('month').toISOString(),
      endDate: dayjs().endOf('month').toISOString(),
    },
    resolver: zodResolver(filterDateSchema),
  })

  const [startDate, endDate] = watch(['startDate', 'endDate'])

  const router = useRouter()

  async function onFilterByDate({ startDate, endDate }: IFilterDate) {
    await router.push({
      pathname: router.route,
      query: {
        startDate,
        endDate,
      },
    })
  }

  return {
    onFilterByDate,
    handleSubmit,
    setValue,
    errors,
    startDate,
    endDate,
  }
}
