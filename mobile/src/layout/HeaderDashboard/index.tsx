import { Text, View } from 'react-native'
import { styles } from './HeaderDashboardStyles'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBeer, faBell } from '@fortawesome/free-solid-svg-icons'

export function HeaderDashboard() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <FontAwesomeIcon size={30} style={styles.backgroundImage} icon={faBeer} />
      <FontAwesomeIcon
        style={styles.notificationIcon}
        size={20}
        icon={faBell}
      />
    </View>
  )
}
