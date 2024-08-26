import { Types } from 'mongoose'
import { MockAccountsRepository } from '../../../repositories/Accounts/MockAccountsRepository'
import { CreateNewAccountService } from '../CreateNewAccount/CreateNewAccountService.service'
import { ListAccountsService } from './ListAccountsService.service'
import { AppError } from '../../../errors/AppError'

let mockAccountsRepository: MockAccountsRepository

let listAccountsService: ListAccountsService
let createNewAccountService: CreateNewAccountService

describe('List accounts', () => {
  beforeEach(() => {
    mockAccountsRepository = new MockAccountsRepository()

    listAccountsService = new ListAccountsService(mockAccountsRepository)
    createNewAccountService = new CreateNewAccountService(
      mockAccountsRepository,
    )
  })

  it('should be able list accounts', async () => {
    const fakeUserId = new Types.ObjectId()

    const newAccount = await createNewAccountService.execute({
      category: 'Despesas da loja',
      type: 'out',
      description: 'Conta de luz',
      value: 100,
      userId: fakeUserId.toString(),
    })

    const accounts = await listAccountsService.execute({
      userId: fakeUserId.toString(),
      accountType: newAccount.type,
      startDate: undefined,
      endDate: undefined,
      status: undefined
    })

    expect(accounts).toContainEqual(newAccount)
  })

  it('should not be able list accounts if idUser not sent', async () => {
    await expect(async () => {
      await listAccountsService.execute({
        userId: undefined,
        accountType: 'in',
        startDate: undefined,
        endDate: undefined,
        status: undefined
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
