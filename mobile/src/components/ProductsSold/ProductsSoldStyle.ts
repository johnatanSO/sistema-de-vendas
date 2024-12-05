import { StyleSheet } from 'react-native'
import theme from '../../styles/theme'

export const styles = StyleSheet.create({
  productsSoldContainer: {
    width: '85%',
    backgroundColor: theme.COLORS.GRAY_600,
    borderRadius: 20,
    margin: 20,
    boxShadow: '1px 3px 10px rgba(255,0,0)',
    shadowColor: 'rgba(0,0,0,0.5)',
    /* shadowOffset: {width: 1, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 10, */
  },
  card: {
    boxShadow: '0px 3px 7px rgba(0,0,0,0.2)',
    backgroundColor: theme.COLORS.GRAY_500,

    width: '100%',
    padding: 20,
    borderRadius: 15,

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    color: theme.COLORS.WHITE,
    fontFamily: theme.FONT_FAMILY.REGULAR,
  },
  titleContainer: {
    color: theme.COLORS.WHITE,
    fontFamily: theme.FONT_FAMILY.BOLD,
    textAlign: 'center',
    fontSize: 16,
    marginTop: 15,
  },
})
