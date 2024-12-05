import { useState, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPen, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons'
import {
  ActivityIndicator,
  Modal,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native'
import { styles } from './ModalSalesStyles'
import { formatting } from '../../../utils/formatting'
import dayjs from 'dayjs'
import { Sale } from '..'
import { salesService } from '../../../services/sales.service'
import theme from '../../../styles/theme'
import { AlertContext } from '../../../contexts/alertContext'

interface ModalSaleProps {
  saleDetailsData: Sale
  getSales: () => void
  handleClose: () => void
  open: boolean
}

export function ModalSale({
  saleDetailsData,
  getSales,
  handleClose,
  open,
}: ModalSaleProps) {
  const {
    alertDialogConfirmConfigs,
    setAlertDialogConfirmConfigs,
    alertNotifyConfigs,
    setAlertNotifyConfigs,
  } = useContext(AlertContext)
  const [loadingCancel, setLoadingCancel] = useState<boolean>(false)

  function handleCancelOrder() {
    setAlertDialogConfirmConfigs({
      ...alertDialogConfirmConfigs,
      open: true,
      title: 'Alerta de confirmação',
      text: 'Deseja realmente cancelar este pedido?',
      onClickAgree: () => {
        setLoadingCancel(true)
        salesService
          .cancel(saleDetailsData)
          .then(() => {
            handleClose()
            getSales()
            setAlertNotifyConfigs({
              ...alertNotifyConfigs,
              open: true,
              text: 'Pedido cancelado com sucesso',
              type: 'success',
            })
          })
          .catch((err) => {
            console.log('ERRO', err.response.data.message)
            setAlertNotifyConfigs({
              ...alertNotifyConfigs,
              open: true,
              type: 'error',
              text: 'Alerta de erro' + err.response.data.message,
            })
          })
          .finally(() => {
            setLoadingCancel(false)
          })
      },
    })
  }

  function handleEditOrder() {}

  return (
    <Modal
      visible={open}
      onRequestClose={handleClose}
      transparent={true}
      animationType="fade"
      statusBarTranslucent={true}
      id="modalOverlay"
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.headerModal}>
            <Text style={styles.titleModal}>Informações da venda</Text>
            <Pressable onPress={handleClose}>
              <FontAwesomeIcon
                size={25}
                style={styles.closeModalIcon}
                icon={faXmark}
              />
            </Pressable>
          </View>

          <ScrollView
            contentContainerStyle={{
              alignItems: 'center',
              flexGrow: 1,
            }}
            style={styles.infosContainer}
          >
            <View style={styles.fieldContainer}>
              <Text style={styles.titleField}>Cliente</Text>
              <Text style={styles.text}>{saleDetailsData?.client || '--'}</Text>
            </View>
            <View style={styles.fieldContainer}>
              <Text style={styles.titleField}>Data</Text>
              <Text style={styles.text}>
                {dayjs(saleDetailsData?.date).format('DD/MM/YYYY - HH:mm') ||
                  '--'}
              </Text>
            </View>
            <View style={styles.fieldContainer}>
              <Text style={styles.titleField}>Produtos</Text>
              {saleDetailsData?.products.map((product) => (
                <View style={styles.productItem} key={product?._id}>
                  <Text style={styles.text}>
                    {product.name || '--'} - {product.amount}x
                  </Text>
                  <Text style={styles.text}>
                    {formatting.formatarReal(product?.value || 0) || '--'}
                  </Text>
                </View>
              ))}
            </View>
            <View style={styles.fieldContainer}>
              <Text style={styles.titleField}>Valor</Text>
              <Text style={styles.text}>
                {formatting.formatarReal(saleDetailsData?.totalValue || 0)}
              </Text>
            </View>
            <View style={[styles.fieldContainer, { marginBottom: 20 }]}>
              <Text style={styles.titleField}>Forma de pagamento</Text>
              <Text style={styles.text}>
                {formatting.formatarFormaDePagamento(
                  saleDetailsData?.paymentType,
                ) || '--'}
              </Text>
            </View>
          </ScrollView>

          {saleDetailsData?.status !== 'canceled' ? (
            <>
              <Pressable
                onPress={handleCancelOrder}
                style={styles.cancelButton}
              >
                {loadingCancel ? (
                  <ActivityIndicator color={theme.COLORS.WHITE} />
                ) : (
                  <>
                    <FontAwesomeIcon color={'white'} icon={faTrash} />
                    <Text style={styles.textButton}>Cancelar</Text>
                  </>
                )}
              </Pressable>
              <Pressable onPress={handleEditOrder} style={styles.editButton}>
                <FontAwesomeIcon color={'white'} icon={faPen} />
                <Text style={styles.textButton}>Editar venda</Text>
              </Pressable>
            </>
          ) : (
            <Text style={{ ...styles.canceledText, marginTop: 20 }}>
              Venda cancelada
            </Text>
          )}
        </View>
      </View>
    </Modal>
  )
}
