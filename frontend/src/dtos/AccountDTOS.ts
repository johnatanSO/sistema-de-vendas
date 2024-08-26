export interface GetAllAccountsDTO {
  filters: any
}

export interface CreateAccountDTO {
  newAccountData: {
    value: number | string
  }
}

export interface UpdateAccountDTO {
  description: string
  type: string
  category: string
  value: number
  _id: string
}

export interface UpdateStatusAccountDTO {
  idAccount: string
  status: string
}

export interface DeleteAccountDTO {
  idAccount: string
}
