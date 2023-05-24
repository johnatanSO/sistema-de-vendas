import { Pressable, Text } from 'react-native'
import { styles } from './ButtonCreateNew.styles'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

interface ButtonCreateNewProps {
  textButton: string
  onPressFunction: () => void
}

export function ButtonCreateNew({
  textButton,
  onPressFunction,
}: ButtonCreateNewProps) {
  return (
    <Pressable onPress={onPressFunction} style={styles.button}>
      <FontAwesomeIcon color="white" icon={faPlus} />
      <Text style={styles.buttonText}>{textButton || 'Cadastrar'}</Text>
    </Pressable>
  )
}
