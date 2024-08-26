import { useState } from 'react'
import { IAccount } from '../../../../models/interfaces/IAccount'

export function useEditAccount() {
  const [accountDataToEdit, setAccountDataToEdit] = useState<IAccount | null>(
    null,
  )
  const [formModalOpened, setFormModalOpened] = useState<boolean>(false)

  function handleEditAccount(account: IAccount) {
    if (!account) return

    setAccountDataToEdit(account)
    setFormModalOpened(true)
  }

  return {
    handleEditAccount,
    accountDataToEdit,
    formModalOpened,
    setFormModalOpened,
    setAccountDataToEdit,
  }
}
