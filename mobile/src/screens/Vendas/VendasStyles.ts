import { StyleSheet } from 'react-native'
import theme from '../../../styles/theme'

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
    textAlign: 'center',
    boxShadow: '1px 3px 10px rgba(0,0,0,0.5)',
  },
  newSaleButtonText: {
    color: theme.COLORS.WHITE,
    fontFamily: theme.FONT_FAMILY.BOLD,
    fontSize: 16,
  },
  listContainer: {
    width: '85%',
    paddingBottom: 30,
  },
  listItem: {
    backgroundColor: theme.COLORS.GRAY_500,
    padding: 18,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    boxShadow: '1px 3px 7px rgba(0,0,0,0.3)',
  },
  text: {
    color: theme.COLORS.GRAY_100,
  },
  canceledText: {
    fontFamily: theme.FONT_FAMILY.BOLD,
    color: theme.COLORS.RED,
  },
})
