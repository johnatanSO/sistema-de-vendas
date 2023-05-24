import { View, Text } from 'react-native'
import { styles } from './EmptyItemsStyles'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'

interface EmptyItemsProps {
  text: string
}

export function EmptyItems({ text }: EmptyItemsProps) {
  return (
    <View style={styles.container}>
      <FontAwesomeIcon
        size={40}
        style={styles.emptyIcon}
        icon={faExclamationCircle}
      />
      <Text style={styles.emptyText}>{text}</Text>
    </View>
  )
}
