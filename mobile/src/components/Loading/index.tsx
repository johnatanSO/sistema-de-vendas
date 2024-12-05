import { ActivityIndicator, View } from 'react-native'
import theme from '../../styles/theme'
import { styles } from './LoadingStyles'

export function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={theme.COLORS.PRIMARY_COLOR} />
    </View>
  )
}
