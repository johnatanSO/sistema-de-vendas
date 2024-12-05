import { StyleSheet } from 'react-native'
import theme from '../../../styles/theme'

export const styles = StyleSheet.create({
  subHeader: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    gap: 15,
  },
  menuButton: {
    borderBottomWidth: 2,
    borderColor: theme.COLORS.GRAY_300,
    paddingBottom: 10,
    marginTop: 30,
    paddingLeft: 35,
    paddingRight: 35,
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: theme.COLORS.GRAY_100,
    fontWeight: '500',
    fontSize: 17,
  },
  buttonIcon: {
    color: theme.COLORS.GRAY_100,
  },

  // Estilização do botão ativo.
  activeMenuButton: {
    borderBottomWidth: 2,
    borderColor: theme.COLORS.PRIMARY_COLOR,
    paddingBottom: 10,
    marginTop: 30,
    paddingLeft: 35,
    paddingRight: 35,
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
  },
  activeButtonText: {
    color: theme.COLORS.PRIMARY_COLOR,
    fontWeight: '500',
    fontSize: 17,
  },
  activeButtonIcon: {
    color: theme.COLORS.PRIMARY_COLOR,
  },
})
