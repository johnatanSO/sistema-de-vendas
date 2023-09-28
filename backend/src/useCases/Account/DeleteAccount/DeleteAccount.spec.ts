import { Types } from 'mongoose'
import { MockAccountsRepository } from '../../../repositories/Accounts/MockAccountsRepository'
import { CreateNewAccountService } from '../CreateNewAccount/CreateNewAccountService.service'
import { DeleteAccountService } from './DeleteAccountService.service'
import { AppError } from '../../../errors/AppError'

let mockAccountsRepository: MockAccountsRepository

let deleteAccountService: DeleteAccountService
let createNewAccountService: CreateNewAccountService

describe('Delete account', () => {
  beforeEach(() => {
    mockAccountsRepository = new MockAccountsRepository()

    deleteAccountService = new DeleteAccountService(mockAccountsRepository)
    createNewAccountService = new CreateNewAccountService(
      mockAccountsRepository,
    )
  })

  it('should be able delete account', async () => {
    const newAccount = await createNewAccountService.execute({
      type: 'in',
      description: 'Conta de luz',
      category: 'Despesas do estabelecimento',
      userId: new Types.ObjectId().toString(),
      value: 99,
    })

    await deleteAccountService.execute(newAccount._id.toString())

    const undefinedAccount = await mockAccountsRepository.findById(
      newAccount._id.toString(),
    )

    expect(undefinedAccount).toBeUndefined()
  })

  it('should not be able delete account if idAccount not sent', async () => {
    await expect(async () => {
      await deleteAccountService.execute(undefined)
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able delete account if the _id is from an invalid account', async () => {
    await expect(async () => {
      const idAccount = new Types.ObjectId()
      await deleteAccountService.execute(idAccount.toString())
    }).rejects.toBeInstanceOf(AppError)
  })
})
