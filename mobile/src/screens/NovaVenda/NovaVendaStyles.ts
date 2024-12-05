import { StyleSheet } from 'react-native'
import theme from '../../styles/theme'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
  },
  fields: {
    marginTop: 20,
    width: '85%',
    alignItems: 'center',
    gap: 10,
  },
  input: {
    backgroundColor: theme.COLORS.GRAY_600,
    color: theme.COLORS.GRAY_100,
    width: '100%',
    borderRadius: 10,
    padding: 15,
  },
  selectPaymentInput: {
    backgroundColor: theme.COLORS.GRAY_600,
    color: theme.COLORS.GRAY_100,
    width: '100%',
    borderRadius: 10,
    padding: 7,
    paddingLeft: 16,
    paddingRight: 16,
  },
  selectProductsInput: {
    backgroundColor: theme.COLORS.GRAY_600,
    color: theme.COLORS.GRAY_100,
    flex: 1,
    borderRadius: 10,
    padding: 7,
    paddingLeft: 16,
    paddingRight: 16,
  },
  containerButton: {
    padding: 10,
    backgroundColor: theme.COLORS.GRAY_600,
    borderBottomColor: theme.COLORS.GRAY_300,
    borderBottomWidth: 1,
    width: '100%',
    alignItems: 'center',
    marginTop: 'auto',
  },
  newSaleButton: {
    padding: 15,
    borderRadius: 10,
    width: '60%',
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
  inputSelectProductContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clearProductsButton: {
    backgroundColor: theme.COLORS.RED,
    padding: 15,
    borderRadius: 10,
    lineHeight: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    marginLeft: 20,
  },
  selectedProductsContainer: {
    width: '85%',
    marginTop: 10,
    flex: 1,
  },
  selectedProductsTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    alignItems: 'center',
    width: '100%',
    gap: 10,
    marginBottom: 10,
  },
  selectedProductFieldsContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  productInput: {
    backgroundColor: theme.COLORS.GRAY_600,
    width: '30%',
    padding: 15,
    borderRadius: 10,
    color: theme.COLORS.GRAY_200,
  },
  removeProductButton: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: theme.COLORS.RED,
    padding: 10,
    borderRadius: 10,
  },
})
