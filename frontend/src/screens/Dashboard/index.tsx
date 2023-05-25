import { dashboardService } from '../../services/dashboardService'
import { useEffect, useState } from 'react'

export function Dashboard() {
  const [paymentTypes, setPaymentTypes] = useState<any[]>([])

  console.log(paymentTypes)

  function getPaymentTypes() {
    dashboardService
      .getPaymentTypes({})
      .then((res) => {
        setPaymentTypes(res.data.paymentTypes)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {})
  }

  useEffect(() => {
    getPaymentTypes()
  }, [])

  return (
    <>
      <h1>Dashboard</h1>
    </>
  )
}
