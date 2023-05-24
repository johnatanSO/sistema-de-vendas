import { View, Pressable, Text, TextInput, FlatList } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { useState } from 'react'
import { styles } from './NovaVendaStyles'
import HeaderNewSale from '../../layout/HeaderNewSale'
import http from '../../http'
import { Product } from '../Relatorios/ProductsList'
import { formasDePagamento } from '../../utils/formatting'
import { salesService } from '../../services/salesService.service'

interface SaleProduct extends Product {
  amount: string
}

interface NovaVendaProps {
  navigation: any
}
export interface NewSale {
  client: string
  products: SaleProduct[]
  paymentType: string
  totalValue: number
}

export function NovaVenda({ navigation }: NovaVendaProps) {
  const defaultValuesNewSale = {
    client: '',
    paymentType: '',
    products: [],
    totalValue: 0,
  }
  const [newSale, setNewSale] = useState<NewSale>(defaultValuesNewSale)
  const [productsList, setProductsList] = useState<SaleProduct[]>([])

  function createNewSale() {
    salesService
      .create(newSale)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log('[ERROR]: ', err)
      })
  }

  function getProducts() {
    http
      .get('/produtos')
      .then((res) => {
        setProductsList(res.data.items)
      })
      .catch((err) => {
        console.log('[ERRO]: ', err)
      })
  }

  return (
    <View style={styles.container}>
      <HeaderNewSale navigation={navigation} />

      <View style={styles.fields}>
        <TextInput
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

        <Picker
          style={styles.input}
          onValueChange={(formaDePagamento: string) => {
            if (formaDePagamento) {
              setNewSale({
                ...newSale,
                paymentType: formaDePagamento,
              })
            }
          }}
        >
          {formasDePagamento?.map((formaDePagamento) => {
            return (
              <Picker.Item
                key={formaDePagamento.value}
                label={formaDePagamento?.text}
                value={null}
              />
            )
          })}
        </Picker>

        <View style={styles.selectProductContainer}>
          <Text style={styles.labelSelectProduct}>Selecione um produto</Text>
          <Picker
            selectedValue={undefined}
            style={styles.input}
            onFocus={() => {
              getProducts()
            }}
            onValueChange={(index: any) => {
              if (index) {
                setNewSale({
                  ...newSale,
                  products: [...newSale.products, productsList[index]],
                })
              }
            }}
          >
            {productsList?.map((product, index) => {
              return (
                <Picker.Item
                  key={product._id}
                  label={product?.name}
                  value={index}
                />
              )
            })}
          </Picker>
        </View>
      </View>

      <View style={styles.selectedProductsContainer}>
        {newSale?.products?.length > 0 && (
          <Text style={styles.selectedProductsTitle}>
            Produtos selecionados
          </Text>
        )}
        <FlatList
          data={newSale?.products}
          style={{ width: '100%' }}
          ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
          keyExtractor={(product) => product._id}
          renderItem={({ item }) => {
            return (
              <View style={styles.selectedProductCard} key={item._id}>
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
                  value={item.amount}
                  onChangeText={(text) => {}}
                  placeholder="Qtd."
                />
                <TextInput
                  style={styles.productInput}
                  onChangeText={(text) => {}}
                  value={item.value.toString()}
                  placeholder="Valor"
                />
              </View>
            )
          }}
        />
      </View>

      <Pressable style={styles.newSaleButton} onPress={createNewSale}>
        <Text style={styles.textNewSaleButton}>Finalizar</Text>
      </Pressable>
    </View>
  )
}
