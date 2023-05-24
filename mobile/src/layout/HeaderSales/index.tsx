import { Text, View } from 'react-native'
import { styles } from './HeaderSalesStyles'

export default function HeaderSales() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vendas</Text>
    </View>
  )
}
