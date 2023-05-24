import { ScrollView, Text, View } from 'react-native'
import { styles } from './ProductsSoldStyle'
import { formatting } from '../../utils/formatting'

export interface Venda {
  text: string
  value: number
  paymentType: string
  _id: string
}

interface ProductsSoldProps {
  vendas: Venda[]
}

export default function ProductsSold({ vendas }: ProductsSoldProps) {
  return (
    <View style={styles.productsSoldContainer}>
      <Text style={styles.titleContainer}>Produtos vendidos</Text>
      <ScrollView
        contentContainerStyle={{
          width: '100%',
          rowGap: 10,
          padding: 17,
        }}
      >
        {vendas?.map((venda) => {
          return (
            <View style={styles.card} key={venda._id}>
              <Text style={styles.text}>{venda.paymentType}</Text>
              <Text style={styles.text}>
                {formatting.formatarReal(venda.value)}
              </Text>
            </View>
          )
        })}
      </ScrollView>
    </View>
  )
}
