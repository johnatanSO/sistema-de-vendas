import { StyleSheet } from 'react-native'
import theme from '../../../styles/theme'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    alignItems: 'center',
  },
  fields: {
    marginTop: '25px',
    width: '85%',
    alignItems: 'center',
    gap: 10,
  },
  input: {
    backgroundColor: theme.COLORS.GRAY_600,
    color: theme.COLORS.GRAY_200,
    width: '100%',
    borderRadius: 10,
    padding: 15,
  },
  newSaleButton: {
    padding: 15,
    borderRadius: 10,
    width: '85%',
    marginTop: 'auto',
    marginBottom: 20,
    alignItems: 'center',
    backgroundColor: theme.COLORS.PRIMARY_COLOR,
  },
  textNewSaleButton: {
    color: theme.COLORS.WHITE,
    fontFamily: theme.FONT_FAMILY.BOLD,
  },

  selectProductContainer: {
    width: '100%',
  },
  labelSelectProduct: {
    color: theme.COLORS.GRAY_300,
    margin: 5,
  },

  selectedProductsContainer: {
    width: '85%',
  },
  selectedProductsTitle: {
    color: theme.COLORS.GRAY_300,
    fontSize: 20,
    marginLeft: 10,
    marginTop: 15,
    marginBottom: 5,
  },
  selectedProductCard: {
    backgroundColor: theme.COLORS.GRAY_500,
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    flex: 1,
    gap: 10,
  },
  productInput: {
    backgroundColor: theme.COLORS.GRAY_600,
    width: '30%',
    padding: 15,
    borderRadius: 10,
    color: theme.COLORS.GRAY_200,
  },
})
