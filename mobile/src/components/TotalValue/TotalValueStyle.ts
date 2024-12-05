import { StyleSheet } from 'react-native'
import theme from '../../styles/theme'

export const styles = StyleSheet.create({
  totalValueContainer: {
    backgroundColor: theme.COLORS.BLUE_500,
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderRadius: 15,
    padding: 20,
    paddingRight: 25,
    paddingLeft: 25,
    marginTop: 'auto',
    marginBottom: 16,
    width: '85%',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  text: {
    color: theme.COLORS.WHITE,
    fontSize: 18,
    fontFamily: theme.FONT_FAMILY.BOLD,
  },
})
