import { Text, View } from 'react-native'
import { styles } from './HeaderSalesStyles'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faDollar } from '@fortawesome/free-solid-svg-icons'

export default function HeaderSales() {
  return (
    <View style={styles.container}>
      <FontAwesomeIcon size={20} style={styles.icon} icon={faDollar} />
      <Text style={styles.title}>Vendas</Text>
    </View>
  )
}
