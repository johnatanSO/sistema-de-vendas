import { useEffect, useState } from 'react'
import { IPaymentType } from '../../../../models/interfaces/IPaymentType'
import { httpClientProvider } from '../../../../providers/HttpClientProvider'
import { dashboardService } from '../../../../services/dashboardService'
import { format } from '../../../../utils/format'
import { useRouter } from 'next/router'
import dayjs from 'dayjs'

export function usePayments() {
  const [paymentTypes, setPaymentTypes] = useState<IPaymentType[]>([])

  const router = useRouter()

  const { startDate, endDate } = router.query

  const datesFilter = {
    startDate: startDate || dayjs().startOf('month').toISOString(),
    endDate: endDate || dayjs().endOf('month').toISOString(),
  }

  function getPaymentTypes() {
    dashboardService
      .getPaymentTypes({ filters: { ...datesFilter } }, httpClientProvider)
      .then(({ data: { items } }) => {
        const formatedPayments: any[] = formatPaymentsToGraph(items)

        setPaymentTypes(formatedPayments)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  function formatPaymentsToGraph(payments: IPaymentType[]) {
    return payments?.map((payment) => {
      return {
        label: format.formatarFormaDePagamento(payment.type),
        formatedData: format.formatarReal(payment.value || 0),
        Valor: payment.value || 0,
      }
    })
  }

  useEffect(() => {
    getPaymentTypes()
  }, [router.query])

  return {
    paymentTypes,
  }
}
