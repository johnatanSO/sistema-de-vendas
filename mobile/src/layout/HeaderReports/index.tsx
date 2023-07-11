import { Text, View } from 'react-native'
import { styles } from './HeaderReportsStyles'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faClipboard } from '@fortawesome/free-solid-svg-icons'

export default function HeaderReports() {
  return (
    <View style={styles.container}>
      <FontAwesomeIcon size={20} style={styles.icon} icon={faClipboard} />
      <Text style={styles.title}>Relatórios</Text>
    </View>
  )
}
