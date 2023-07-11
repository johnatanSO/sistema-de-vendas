import { ScrollView, Text, View } from 'react-native'
import { styles } from './SummaryStyle'
import { formatting } from '../../utils/formatting'
import { EmptyItems } from '../EmptyItems'
import { PaymentType } from '../../screens/Dashboard'
import { Loading } from '../Loading'

interface SummaryProps {
  paymentTypes: PaymentType[]
  loadingPayments: boolean
}

export function Summary({ paymentTypes, loadingPayments }: SummaryProps) {
  return (
    <View style={styles.summaryContainer}>
      <Text style={styles.titleContainer}>Formas de pagamento</Text>
      <ScrollView
        contentContainerStyle={{
          width: '100%',
          rowGap: 10,
          padding: 17,
        }}
      >
        {loadingPayments ? (
          <Loading />
        ) : (
          paymentTypes?.map((formaDePagamento, key) => {
            return (
              <View key={key} style={styles.card}>
                <Text style={styles.text}>
                  {formatting.formatarFormaDePagamento(
                    formaDePagamento?.type,
                  ) || '--'}
                </Text>
                <Text style={styles.text}>
                  {formatting.formatarReal(formaDePagamento?.value || 0)}
                </Text>
              </View>
            )
          })
        )}
        {paymentTypes?.length === 0 && !loadingPayments && (
          <EmptyItems text="Nenhuma venda encontrada" />
        )}
      </ScrollView>
    </View>
  )
}
