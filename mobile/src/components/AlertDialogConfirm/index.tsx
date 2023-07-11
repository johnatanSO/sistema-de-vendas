import { useContext } from 'react'
import { AlertContext } from '../../contexts/alertContext'
import { Modal, View, Text, Pressable } from 'react-native'
import { styles } from './AlertDialogConfirm.styles'

export function AlertDialogConfirm() {
  const { alertDialogConfirmConfigs } = useContext(AlertContext)

  if (!alertDialogConfirmConfigs.open) return <></>

  return (
    <Modal
      visible={alertDialogConfirmConfigs?.open}
      onRequestClose={() => {}}
      transparent={true}
      animationType="fade"
      statusBarTranslucent={true}
      id="modalOverlay"
    >
      <View style={styles.alertOverlay}>
        <View style={styles.alertContainer}>
          <Text style={styles.title}>
            {alertDialogConfirmConfigs?.title || '--'}
          </Text>
          <Text style={styles.text}>
            {alertDialogConfirmConfigs?.text || '--'}
          </Text>

          <View style={styles.buttonsContainer}>
            <Pressable
              style={[styles.button, styles.cancelButton]}
              onPress={alertDialogConfirmConfigs.handleClose}
            >
              <Text style={styles.textButton}>Cancelar</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.confirmButton]}
              onPress={async () => {
                await alertDialogConfirmConfigs.onClickAgree()
                alertDialogConfirmConfigs.handleClose()
              }}
            >
              <Text style={styles.textButton}>Confirmar</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  )
}
