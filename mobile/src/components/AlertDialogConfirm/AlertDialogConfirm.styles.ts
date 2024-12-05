import { StyleSheet } from 'react-native'
import theme from '../../styles/theme'

export const styles = StyleSheet.create({
  alertOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertContainer: {
    maxWidth: '85%',
    borderRadius: 10,
    alignItems: 'center',
    padding: 30,
    gap: 25,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 4 },
    shadowOpacity: 0.7,
    shadowRadius: 10,
    backgroundColor: theme.COLORS.GRAY_400,
  },
  title: {
    color: theme.COLORS.GRAY_100,
    fontWeight: '600',
  },
  text: {
    color: theme.COLORS.GRAY_200,
    fontWeight: '500',
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    gap: 15,
  },
  button: {
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    flex: 1,
    borderRadius: 7,
    padding: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: theme.COLORS.RED,
  },
  confirmButton: {
    backgroundColor: theme.COLORS.BLUE_400,
  },
  textButton: {
    color: theme.COLORS.WHITE,
  },
})
