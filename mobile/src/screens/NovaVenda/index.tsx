import {
  View,
  Pressable,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native'
import { useState, useContext } from 'react'
import { styles } from './NovaVendaStyles'
import HeaderNewSale from '../../layout/HeaderNewSale'
import http from '../../http'
import { formasDePagamento, formatting } from '../../utils/formatting'
import { salesService } from '../../services/sales.service'
import { Dropdown } from 'react-native-element-dropdown'
import theme from '../../styles/theme'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBroom, faTrash } from '@fortawesome/free-solid-svg-icons'
import CurrencyInput from 'react-native-currency-input'
import { AlertContext } from '../../contexts/alertContext'
import { INewSale } from './interfaces/INovaVenda'
import { IProduct } from '../../models/IProduct'
import { ISaleProduct } from './interfaces/ISaleProduct'

type Props = {
  navigation: any
}

export function NovaVenda({ navigation }: Props) {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)

  const defaultValuesNewSale = {
    client: '',
    paymentType: '',
    products: [],
  }
  const [newSale, setNewSale] = useState<INewSale>(defaultValuesNewSale)
  const [productsList, setProductsList] = useState<IProduct[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  function createNewSale() {
    if (!newSale.paymentType) {
      setAlertNotifyConfigs({
        ...alertNotifyConfigs,
        type: 'error',
        open: true,
        text: 'Forma de pagamento não informada',
      })

      return
    }
    if (newSale.products.length === 0) {
      setAlertNotifyConfigs({
        ...alertNotifyConfigs,
        type: 'error',
        open: true,
        text: 'Nenhum produto selecionado',
      })

      return
    }

    setLoading(true)
    salesService
      .create(newSale, totalValue)
      .then(() => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          type: 'success',
          open: true,
          text: 'Venda realizada com sucesso',
        })
        setNewSale(defaultValuesNewSale)
        navigation.navigate('Vendas')
      })
      .catch((err) => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          type: 'error',
          open: true,
          text: 'Erro ao tentar realizar venda' + err.response.data.message,
        })
        console.log('[ERROR]: ', err.response.data.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const totalValue = newSale?.products?.reduce((acc, prod) => {
    acc += prod.value * prod.amount
    return acc
  }, 0)

  function getProducts() {
    http
      .get('/produtos')
      .then(({ data }) => {
        setProductsList(data.items)
      })
      .catch((err) => {
        console.log('[ERRO]: ', err)
      })
  }

  function onChangeProductField({ value, inputField, index }: any) {
    const sale: any = { ...newSale }
    sale.products[index][inputField] = value

    setNewSale(sale)
  }

  function handleAddNewProduct({
    value,
  }: {
    value: ISaleProduct
    text: string
  }) {
    const alreadExistProductInList = !!newSale.products.find(
      (product) => product._id === value._id,
    )
    if (alreadExistProductInList) return
    value.amount = 1

    setNewSale({
      ...newSale,
      products: [...newSale.products, value],
    })
  }

  function handleRemoveProduct(productId: string) {
    const newProducts = newSale.products.filter(
      (prod) => prod._id !== productId,
    )
    setNewSale({
      ...newSale,
      products: newProducts,
    })
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <HeaderNewSale navigation={navigation} />
        <ScrollView
          style={{
            width: '100%',
            flex: 1,
          }}
          contentContainerStyle={{ alignItems: 'center', flexGrow: 1 }}
        >
          <View style={styles.fields}>
            <TextInput
              placeholderTextColor={theme.COLORS.GRAY_300}
              style={styles.input}
              onChangeText={(text) => {
                setNewSale({
                  ...newSale,
                  client: text,
                })
              }}
              value={newSale.client}
              placeholder="Nome do cliente"
            />

            <Dropdown
              valueField="value"
              labelField="text"
              placeholder="Selecione a forma de pagamento"
              value={newSale?.paymentType}
              activeColor={theme.COLORS.GRAY_300}
              containerStyle={{
                backgroundColor: theme.COLORS.GRAY_500,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
              }}
              itemTextStyle={{
                color: theme.COLORS.GRAY_100,
              }}
              placeholderStyle={{ color: theme.COLORS.GRAY_200 }}
              selectedTextStyle={{ color: theme.COLORS.GRAY_100 }}
              style={styles.selectPaymentInput}
              onChange={({ value }) => {
                setNewSale({
                  ...newSale,
                  paymentType: value,
                })
              }}
              data={formasDePagamento}
            />

            <View style={styles.selectProductContainer}>
              <Text style={styles.labelSelectProduct}>
                Selecione um produto
              </Text>
              <View style={{ flexDirection: 'row' }}>
                <Dropdown
                  valueField="value"
                  labelField="text"
                  placeholder="Produtos"
                  value={undefined}
                  activeColor={theme.COLORS.GRAY_300}
                  containerStyle={{
                    backgroundColor: theme.COLORS.GRAY_500,
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                  }}
                  itemTextStyle={{
                    color: theme.COLORS.GRAY_100,
                  }}
                  placeholderStyle={{ color: theme.COLORS.GRAY_200 }}
                  selectedTextStyle={{ color: theme.COLORS.GRAY_100 }}
                  style={styles.selectProductsInput}
                  onChange={handleAddNewProduct}
                  data={productsList.map((product: any) => ({
                    value: product,
                    text: product.name,
                  }))}
                  onFocus={() => {
                    getProducts()
                  }}
                />
                <Pressable
                  style={styles.clearProductsButton}
                  onPress={() => {
                    setNewSale({
                      ...newSale,
                      products: [],
                    })
                  }}
                >
                  <FontAwesomeIcon color="white" icon={faBroom} />
                  <Text style={styles.textNewSaleButton}>Limpar</Text>
                </Pressable>
              </View>
            </View>
          </View>

          <View style={styles.selectedProductsContainer}>
            {newSale?.products?.length > 0 && (
              <View style={styles.selectedProductsTitleContainer}>
                <Text style={styles.selectedProductsTitle}>Produtos</Text>
                <Text style={styles.selectedProductsTitle}>
                  Total {formatting.formatarReal(totalValue || 0)}
                </Text>
              </View>
            )}
            {newSale?.products?.map((item, index) => (
              <View key={item._id} style={styles.selectedProductCard}>
                <View style={styles.selectedProductFieldsContainer}>
                  <Text
                    style={{
                      color: 'white',
                      fontWeight: '500',
                      marginRight: 'auto',
                    }}
                  >
                    {item?.name}
                  </Text>
                  <TextInput
                    style={styles.productInput}
                    value={item.amount.toString()}
                    onChangeText={(text) => {
                      const value = Number(text)
                      onChangeProductField({
                        value,
                        inputField: 'amount',
                        index,
                      })
                    }}
                    placeholder="Qtd."
                    keyboardType="number-pad"
                  />
                  <CurrencyInput
                    value={item.value}
                    onChangeValue={(value) => {
                      onChangeProductField({
                        value,
                        inputField: 'value',
                        index,
                      })
                    }}
                    prefix="R$"
                    delimiter="."
                    separator=","
                    precision={2}
                    minValue={0}
                    style={styles.productInput}
                    placeholder="Valor"
                    keyboardType="numeric"
                  />
                </View>
                <Pressable
                  onPress={() => {
                    handleRemoveProduct(item._id)
                  }}
                  style={styles.removeProductButton}
                >
                  <FontAwesomeIcon color="white" icon={faTrash} />
                  <Text style={styles.textNewSaleButton}>Remover</Text>
                </Pressable>
              </View>
            ))}
          </View>
        </ScrollView>
        <View style={styles.containerButton}>
          <Pressable style={styles.newSaleButton} onPress={createNewSale}>
            {loading ? (
              <ActivityIndicator color={theme.COLORS.WHITE} />
            ) : (
              <Text style={styles.textNewSaleButton}>Finalizar</Text>
            )}
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}
