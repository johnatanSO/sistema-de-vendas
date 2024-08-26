import { useState } from 'react'
import { IClient } from '../../../../models/interfaces/IClient'

export function useEditClient() {
  const [formModalOpened, setFormModalOpened] = useState<boolean>(false)
  const [clientDataToEdit, setClientDataToEdit] = useState<IClient | null>(null)

  function handleEditClient(client: IClient) {
    setClientDataToEdit(client)
    setFormModalOpened(true)
  }

  return {
    handleEditClient,
    formModalOpened,
    clientDataToEdit,
    setClientDataToEdit,
    setFormModalOpened,
  }
}
