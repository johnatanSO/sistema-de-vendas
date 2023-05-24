import { Pressable, Text, View } from 'react-native'
import { styles } from './Submenu.styles'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUsers, faWineBottle } from '@fortawesome/free-solid-svg-icons'

interface SubmenuProps {
  activeReport: string
  setActiveReport: (activeReport: string) => void
}

export function Submenu({ activeReport, setActiveReport }: SubmenuProps) {
  return (
    <View style={styles.subHeader}>
      <Pressable
        onPress={() => {
          setActiveReport('products')
        }}
        style={
          activeReport === 'products'
            ? styles.activeMenuButton
            : styles.menuButton
        }
      >
        <FontAwesomeIcon
          style={
            activeReport === 'products'
              ? styles.activeButtonIcon
              : styles.buttonIcon
          }
          icon={faWineBottle}
        />
        <Text
          style={
            activeReport === 'products'
              ? styles.activeButtonText
              : styles.buttonText
          }
        >
          Produtos
        </Text>
      </Pressable>

      <Pressable
        onPress={() => {
          setActiveReport('clients')
        }}
        style={
          activeReport === 'clients'
            ? styles.activeMenuButton
            : styles.menuButton
        }
      >
        <FontAwesomeIcon
          style={
            activeReport === 'clients'
              ? styles.activeButtonIcon
              : styles.buttonIcon
          }
          icon={faUsers}
        />
        <Text
          style={
            activeReport === 'clients'
              ? styles.activeButtonText
              : styles.buttonText
          }
        >
          Clientes
        </Text>
      </Pressable>
    </View>
  )
}
