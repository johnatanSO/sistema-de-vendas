import { useEffect, useState, useContext } from 'react'
import { Pressable, Text, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { EmptyItems } from '../../components/EmptyItems'
import HeaderSales from '../../layout/HeaderSales'
import { formatting } from '../../utils/formatting'
import { styles } from './VendasStyles'
import dayjs from 'dayjs'
import { ModalSale } from './ModalSale'
import { Product } from '../Relatorios/ProductsList'
import { salesService } from '../../services/sales.service'
import { Loading } from '../../components/Loading'
import { AlertContext } from '../../contexts/alertContext'

export interface Sale {
  _id: string
  client: string
  date: Date
  products: Product[]
  totalValue: number
  paymentType: string
  status: string
}

interface VendasProps {
  navigation: any
}

export function Vendas({ navigation }: VendasProps) {
  const { alertNotifyConfigs, setAlertNotifyConfigs } = useContext(AlertContext)
  const [sales, setSales] = useState<Sale[]>([])
  const [saleDetailsModalOpened, setSaleDetailsModalOpened] =
    useState<boolean>(false)
  const [loadingSales, setLoadingSales] = useState<boolean>(true)
  const [saleDetailsData, setSaleDetailsData] = useState<Sale>(undefined as any)

  function handleGoToNewSale() {
    navigation.navigate('NovaVenda')
  }

  function getSales() {
    setLoadingSales(true)
    salesService
      .getAll()
      .then((res) => {
        setSales(res.data.items)
      })
      .catch(() => {
        setAlertNotifyConfigs({
          ...alertNotifyConfigs,
          type: 'error',
          open: true,
          text: 'Erro ao buscar vendas',
        })
      })
      .finally(() => {
        setLoadingSales(false)
      })
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getSales()
    })

    return unsubscribe
  }, [navigation])

  function handleOpenSaleDetailsModal(sale: Sale) {
    setSaleDetailsData(sale)
    setSaleDetailsModalOpened(true)
  }

  return (
    <View style={styles.container}>
      <HeaderSales />
      <Pressable style={styles.newSaleButton} onPress={handleGoToNewSale}>
        <Text style={styles.newSaleButtonText}>Nova venda</Text>
      </Pressable>
      {loadingSales ? (
        <Loading />
      ) : (
        <FlatList
          data={sales}
          ListEmptyComponent={() => (
            <EmptyItems text="Nenhuma venda encontrada" />
          )}
          ItemSeparatorComponent={() => <View style={{ height: 13 }} />}
          style={styles.listContainer}
          keyExtractor={(sale) => sale?._id}
          renderItem={({ item }) => {
            return (
              <Pressable
                onPress={() => {
                  handleOpenSaleDetailsModal(item)
                }}
                style={styles.listItem}
              >
                <Text
                  style={
                    item?.status === 'canceled'
                      ? styles.canceledText
                      : styles.text
                  }
                >
                  {dayjs(item?.date).format('DD/MM/YYYY - HH:mm')}
                </Text>
                <Text
                  style={
                    item?.status === 'canceled'
                      ? styles.canceledText
                      : styles.text
                  }
                >
                  {formatting.formatarReal(item?.totalValue)}
                </Text>
              </Pressable>
            )
          }}
        />
      )}
      <ModalSale
        handleClose={() => {
          setSaleDetailsModalOpened(false)
        }}
        open={saleDetailsModalOpened}
        saleDetailsData={saleDetailsData}
        getSales={getSales}
      />
    </View>
  )
}
