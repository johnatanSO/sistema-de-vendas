import { StyleSheet } from 'react-native'
import theme from '../../styles/theme'

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    fontSize: 30,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 5,
  },
  emptyText: {
    color: theme.COLORS.GRAY_200,
    fontSize: 20,
    marginTop: 10,
    fontWeight: '500',
  },
  emptyIcon: {
    opacity: 0.8,
    color: theme.COLORS.GRAY_200,
  },
})
