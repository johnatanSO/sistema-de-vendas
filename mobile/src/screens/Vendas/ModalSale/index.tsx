import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faTrash, faXmark } from '@fortawesome/free-solid-svg-icons'
import { Modal, Pressable, Text, View } from 'react-native'
import { styles } from './ModalSalesStyles'
import { formatting } from '../../../utils/formatting'
import dayjs from 'dayjs'
import { Sale } from '..'

interface ModalSaleProps {
  saleDetailsData: Sale | undefined
  setSaleDetailsModalOpened: (open: boolean) => void
}

export function ModalSale({
  saleDetailsData,
  setSaleDetailsModalOpened,
}: ModalSaleProps) {
  return (
    <Modal transparent={true} animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.headerModal}>
            <Text style={styles.titleModal}>Informações da venda</Text>
            <Pressable
              onPress={() => {
                setSaleDetailsModalOpened(false)
              }}
            >
              <FontAwesomeIcon
                size={25}
                style={styles.closeModalIcon}
                icon={faXmark}
              />
            </Pressable>
          </View>

          <View style={styles.infosContainer}>
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
                <View key={product?._id}>
                  <Text style={styles.text}>{product.name || '--'}</Text>
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
            <View style={styles.fieldContainer}>
              <Text style={styles.titleField}>Forma de pagamento</Text>
              <Text style={styles.text}>
                {saleDetailsData?.paymentType || '--'}
              </Text>
            </View>
          </View>

          {!saleDetailsData?.canceled ? (
            <Pressable style={styles.cancelButton}>
              <FontAwesomeIcon color={'white'} icon={faTrash} />
              <Text style={styles.textButton}>Cancelar</Text>
            </Pressable>
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
