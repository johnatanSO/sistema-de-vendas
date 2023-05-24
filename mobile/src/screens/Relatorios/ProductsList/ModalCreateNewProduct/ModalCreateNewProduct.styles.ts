import { StyleSheet } from 'react-native'
import theme from '../../../../../styles/theme'

export const styles = StyleSheet.create({
  modalOverlay: {
    backgroundColor: 'rgba(0,0,0,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    flex: 1,
  },
  modalContainer: {
    backgroundColor: theme.COLORS.GRAY_600,
    width: '85%',
    maxHeight: '85%',
    borderRadius: 15,
    alignItems: 'center',
    padding: 25,
  },
  headerModal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  closeModalIcon: {
    color: theme.COLORS.RED,
  },
  titleModal: {
    color: theme.COLORS.GRAY_100,
    fontSize: 23,
    fontFamily: theme.FONT_FAMILY.BOLD,
  },
  fieldsContainer: {
    backgroundColor: theme.COLORS.GRAY_700,
    borderRadius: 15,
    width: '100%',
    marginTop: 30,
    padding: 15,
    gap: 15,
  },
  input: {
    backgroundColor: theme.COLORS.GRAY_600,
    width: '100%',
    borderRadius: 10,
    padding: 15,
    color: theme.COLORS.GRAY_200,
  },
  confirmButton: {
    backgroundColor: theme.COLORS.PRIMARY_COLOR,
    width: '100%',
    marginTop: '15px',
    borderRadius: 10,
    alignItems: 'center',
    padding: 15,
  },
  confirmButtonText: {
    color: theme.COLORS.WHITE,
    fontFamily: theme.FONT_FAMILY.BOLD,
  },
  labelField: {
    color: theme.COLORS.GRAY_200,
    marginLeft: '5px',
    marginBottom: '3px',
  },
})
