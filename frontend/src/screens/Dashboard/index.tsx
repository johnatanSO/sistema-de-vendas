import { dashboardService } from '../../services/dashboardService'
import { useEffect, useState } from 'react'

interface PaymentType {}

export function Dashboard() {
  const [paymentTypes, setPaymentTypes] = useState<PaymentType[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  function getPaymentTypes() {
    setLoading(true)
    dashboardService
      .getPaymentTypes({ filters: {} })
      .then((res) => {
        setPaymentTypes(res.data.paymentTypes)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }
  console.log('Loading: ', loading)
  useEffect(() => {
    getPaymentTypes()
  }, [])

  return (
    <>
      <h1>Dashboard</h1>
      {JSON.stringify(paymentTypes)}
    </>
  )
}
