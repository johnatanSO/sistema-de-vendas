import { StyleSheet } from 'react-native'
import theme from '../../styles/theme'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  newSaleButton: {
    backgroundColor: theme.COLORS.PRIMARY_COLOR,
    padding: 15,
    borderRadius: 10,
    marginTop: 25,
    marginBottom: 25,
    width: '60%',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  newSaleButtonText: {
    color: theme.COLORS.WHITE,
    fontFamily: theme.FONT_FAMILY.BOLD,
    fontSize: 16,
    textAlign: 'center',
  },
  listContainer: {
    width: '85%',
    marginBottom: 13,
  },
  listItem: {
    backgroundColor: theme.COLORS.GRAY_500,
    padding: 18,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 7,
  },
  text: {
    color: theme.COLORS.GRAY_100,
    fontFamily: theme.FONT_FAMILY.BOLD,
  },
  canceledText: {
    fontFamily: theme.FONT_FAMILY.BOLD,
    color: theme.COLORS.RED,
  },
})
