import { useContext, useEffect } from 'react'
import { AlertContext } from '../../contexts/alertContext'
import { Modal, View, Text, Pressable } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import {
  faCheck,
  faCircleExclamation,
  faXmark,
} from '@fortawesome/free-solid-svg-icons'
import { styles } from './AlertNotify.styles'

export function AlertNotify() {
  const { alertNotifyConfigs } = useContext(AlertContext)
  useEffect(() => {
    if (alertNotifyConfigs?.open) {
      setTimeout(() => {
        alertNotifyConfigs.handleClose()
      }, 7000)
    }
  }, [alertNotifyConfigs])

  if (!alertNotifyConfigs.open) return <></>
  return (
    <Modal
      visible={alertNotifyConfigs?.open}
      onRequestClose={() => {}}
      transparent={true}
      animationType="fade"
      statusBarTranslucent={true}
      id="modalOverlay"
    >
      <View
        style={{
          ...styles.alertContainer,
          ...(alertNotifyConfigs?.type === 'success'
            ? styles.success
            : styles.error),
        }}
      >
        <FontAwesomeIcon
          color="white"
          icon={
            alertNotifyConfigs?.type === 'success'
              ? faCheck
              : faCircleExclamation
          }
        />
        <Text style={styles.text}>{alertNotifyConfigs?.text || '--'}</Text>
        <Pressable onPress={alertNotifyConfigs.handleClose}>
          <FontAwesomeIcon icon={faXmark} size={15} color="white" />
        </Pressable>
      </View>
    </Modal>
  )
}
