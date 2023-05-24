import { StyleSheet } from 'react-native'
import theme from '../../../styles/theme'

export const styles = StyleSheet.create({
  totalValueContainer: {
    backgroundColor: theme.COLORS.BLUE_500,
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderRadius: 15,
    padding: '20px',
    paddingRight: '25px',
    paddingLeft: '25px',
    marginTop: 'auto',
    marginBottom: '2rem',
    width: '85%',
    boxShadow: '1px 3px 10px rgba(0,0,0,0.3)',
  },
  text: {
    color: theme.COLORS.WHITE,
    fontSize: 18,
    fontFamily: theme.FONT_FAMILY.BOLD,
  },
})
