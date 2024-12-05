import { Dimensions, StyleSheet } from 'react-native'
import theme from '../../styles/theme'

const windowHeight = Dimensions.get('window').height

export const styles = StyleSheet.create({
  summaryContainer: {
    width: '85%',
    marginTop: -windowHeight / 16.4,
    backgroundColor: theme.COLORS.GRAY_600,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
  },
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    backgroundColor: theme.COLORS.GRAY_400,
    flex: 1,
    padding: 20,
    borderRadius: 15,

    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    color: theme.COLORS.GRAY_100,
    fontFamily: theme.FONT_FAMILY.REGULAR,
  },
  titleContainer: {
    color: theme.COLORS.GRAY_100,
    paddingBottom: 7,
    paddingLeft: 25,
    paddingRight: 25,
    fontFamily: theme.FONT_FAMILY.BOLD,
    textAlign: 'center',
    fontSize: 18,
    marginTop: 25,
  },
})
