import { Product } from '..'
import { View, Text, Pressable } from 'react-native'
import { formatting } from '../../../../utils/formatting'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import theme from '../../../../styles/theme'
import { styles } from './ListItem.styles'

interface ListItemProps {
  item: Product
  handleEditProduct: (productData: Product) => void
  handleDeleteProduct: (idProduct: string) => void
}

export function ListItem({
  item,
  handleDeleteProduct,
  handleEditProduct,
}: ListItemProps) {
  return (
    <View style={styles.productItem}>
      <View style={styles.infosContainer}>
        <Text numberOfLines={1} style={styles.textName}>
          {item?.name || '--'}
        </Text>
        <Text style={item?.stock === 0 ? styles.textAlert : styles.text}>
          Quantidade {item?.stock}
        </Text>
        <Text style={styles.text}>
          Valor {formatting.formatarReal(item?.value || 0)}
        </Text>
      </View>

      <View style={styles.actionsContainer}>
        <Pressable
          onPress={() => {
            handleEditProduct(item)
          }}
          style={styles.editButton}
        >
          <FontAwesomeIcon
            style={{ color: theme.COLORS.BLUE_400 }}
            icon={faPen}
          />
          <Text
            style={{
              color: theme.COLORS.BLUE_400,
              fontWeight: '500',
            }}
          >
            Editar
          </Text>
        </Pressable>

        <Pressable
          onPress={() => {
            handleDeleteProduct(item._id)
          }}
          style={styles.deleteButton}
        >
          <FontAwesomeIcon style={{ color: theme.COLORS.RED }} icon={faTrash} />
          <Text
            style={{
              color: theme.COLORS.RED,
              fontWeight: '500',
            }}
          >
            Excluir
          </Text>
        </Pressable>
      </View>
    </View>
  )
}
