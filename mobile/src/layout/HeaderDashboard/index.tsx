import { Text, View, ImageBackground } from 'react-native'
import { styles } from './HeaderDashboardStyles'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'

export function HeaderDashboard() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <ImageBackground
        source={require('../../../assets/beer2.svg')}
        style={styles.backgroundImage}
      />
      <FontAwesomeIcon
        style={styles.notificationIcon}
        size={20}
        icon={faBell}
      />
    </View>
  )
}
