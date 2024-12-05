import { StyleSheet } from 'react-native'
import theme from '../../../styles/theme'

export const styles = StyleSheet.create({
  text: {
    color: theme.COLORS.GRAY_100,
  },
  canceledText: {
    fontFamily: theme.FONT_FAMILY.BOLD,
    color: theme.COLORS.RED,
  },
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
    height: '85%',
    alignItems: 'center',
    borderRadius: 15,
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
  infosContainer: {
    backgroundColor: theme.COLORS.GRAY_700,
    borderRadius: 15,
    width: '100%',
    flexGrow: 1,
    marginTop: 30,
    padding: 15,
  },
  fieldContainer: {
    borderBottomWidth: 1,
    borderColor: theme.COLORS.GRAY_500,
    padding: 15,
    paddingLeft: 7,
    width: '100%',
  },
  productItem: {
    marginLeft: 7,
    padding: 5,
    paddingLeft: 10,
    borderLeftColor: theme.COLORS.GRAY_300,
    borderLeftWidth: 1,
  },
  titleField: {
    fontSize: 18,
    fontFamily: theme.FONT_FAMILY.BOLD,
    color: theme.COLORS.GRAY_100,
  },
  cancelButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    backgroundColor: theme.COLORS.RED,
    width: '100%',
    padding: 15,
    borderRadius: 10,
    justifyContent: 'center',
    gap: 15,
    lineHeight: 1,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    backgroundColor: theme.COLORS.BLUE_400,
    width: '100%',
    padding: 15,
    borderRadius: 10,
    justifyContent: 'center',
    gap: 15,
    lineHeight: 1,
    opacity: 0.3,
  },
  textButton: {
    color: theme.COLORS.WHITE,
    fontFamily: theme.FONT_FAMILY.BOLD,
    fontSize: 16,
  },
})
