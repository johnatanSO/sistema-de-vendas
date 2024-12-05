import { StyleSheet } from 'react-native'
import theme from '../../styles/theme'

export const styles = StyleSheet.create({
  alertContainer: {
    maxWidth: '85%',
    position: 'absolute',
    borderRadius: 10,
    bottom: 15,
    left: 15,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    gap: 25,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  success: {
    backgroundColor: theme.COLORS.GREEN_500,
  },
  error: {
    backgroundColor: theme.COLORS.RED,
  },
  text: {
    color: theme.COLORS.WHITE,
    fontWeight: '500',
  },
})
