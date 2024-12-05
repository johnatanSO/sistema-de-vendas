import { StyleSheet } from 'react-native'
import theme from '../../styles/theme'

export const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.COLORS.PRIMARY_COLOR,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    marginTop: 25,
    borderRadius: 10,
    lineHeight: 1,
    gap: 10,
    width: '85%',
  },
  buttonText: {
    color: theme.COLORS.WHITE,
    fontFamily: theme.FONT_FAMILY.BOLD,
    fontSize: 16,
  },
})
