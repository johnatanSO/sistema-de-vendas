import { StyleSheet } from 'react-native'
import theme from '../../../styles/theme'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: theme.COLORS.GRAY_600,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingIndicator: {
    color: theme.COLORS.PRIMARY_COLOR,
  },
})
