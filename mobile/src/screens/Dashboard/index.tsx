import { View } from 'react-native'
import { styles } from './DashboardStyles'
import { Summary } from '../../components/Summary'
import TotalValue from '../../components/TotalValue'
import { useEffect, useState, useContext } from 'react'
import { HeaderDashboard } from '../../layout/HeaderDashboard'
import http from '../../http'
import { AlertContext } from '../../contexts/alertContext'

export interface PaymentType {
  type: string
  value: number
}

interface DashboardProps {
  navigation: any
}

export function Dashboard({ navigation }: DashboardProps) {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)
  const [paymentTypes, setPaymentTypes] = useState<PaymentType[]>([])
  const [loadingPayments, setLoadingPayments] = useState<boolean>(true)

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setLoadingPayments(true)
      http
        .get('/dashboard/formasDePagamento')
        .then((res) => {
          setPaymentTypes(res.data.items)
        })
        .catch((err) => {
          console.log(err)
          setAlertNotifyConfigs({
            ...alertNotifyConfigs,
            open: true,
            type: 'error',
            text: 'Erro ao buscar formas de pagamento',
          })
        })
        .finally(() => {
          setLoadingPayments(false)
        })
    })

    return unsubscribe
  }, [navigation])

  return (
    <View style={styles.container}>
      <HeaderDashboard />
      <Summary loadingPayments={loadingPayments} paymentTypes={paymentTypes} />
      <TotalValue paymentTypes={paymentTypes} />
    </View>
  )
}
