import { StyleSheet } from 'react-native'
import theme from '../../../../../styles/theme'

export const styles = StyleSheet.create({
  productItem: {
    backgroundColor: theme.COLORS.GRAY_400,
    maxWidth: '100%',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1rem',
    paddingRight: '1.1rem',
    paddingLeft: '1.1rem',
    boxShadow: '1px 3px 7px rgba(0,0,0)',
  },
  infosContainer: {
    width: '50%',
  },
  text: {
    color: theme.COLORS.GRAY_200,
    fontWeight: '500',
  },
  textAlert: {
    color: theme.COLORS.RED,
    fontWeight: '600',
  },
  textName: {
    marginBottom: 10,
    color: theme.COLORS.GRAY_100,
    fontFamily: theme.FONT_FAMILY.BOLD,
    fontSize: 20,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '50%',
    gap: 20,
  },
  editButton: {
    alignItems: 'center',
    gap: 5,
    backgroundColor: theme.COLORS.GRAY_500,
    padding: 10,
    borderRadius: 7,
  },
  deleteButton: {
    alignItems: 'center',
    gap: 5,
    backgroundColor: theme.COLORS.GRAY_500,
    padding: 10,
    borderRadius: 7,
  },
})
