import { Pressable, Text, View } from 'react-native'
import { styles } from './HeaderNewSaleStyles'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'

interface HeaderNewSaleProps {
  navigation: any
}

export default function HeaderNewSale({ navigation }: HeaderNewSaleProps) {
  return (
    <View style={styles.container}>
      <Pressable
        style={styles.backArrow}
        onPress={() => {
          navigation.navigate('Vendas')
        }}
      >
        <FontAwesomeIcon size={25} color="white" icon={faAngleLeft} />
      </Pressable>
      <Text style={styles.title}>Nova venda</Text>
    </View>
  )
}
