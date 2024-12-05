import { StyleSheet, Dimensions } from 'react-native'
import theme from '../../styles/theme'
const windowHeight = Dimensions.get('window').height

export const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.GRAY_600,
    width: '100%',
    paddingTop: windowHeight / 15,
    paddingBottom: 20,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    zIndex: 5,
  },
  title: {
    color: theme.COLORS.WHITE,
    fontFamily: theme.FONT_FAMILY.BOLD,
    fontSize: 25,
  },
  backArrow: {
    position: 'absolute',
    top: windowHeight / 15,
    left: 20,
  },
})
