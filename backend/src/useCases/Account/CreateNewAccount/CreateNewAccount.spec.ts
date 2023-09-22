import 'reflect-metadata'
import { Types } from 'mongoose'
import { MockAccountsRepository } from '../../../repositories/Accounts/MockAccountsRepository'
import { CreateNewAccountService } from './CreateNewAccountService.service'

let mockAccountsRepository: MockAccountsRepository

let createNewAccountService: CreateNewAccountService

describe('Create a new account', () => {
  beforeEach(() => {
    mockAccountsRepository = new MockAccountsRepository()

    createNewAccountService = new CreateNewAccountService(
      mockAccountsRepository,
    )
  })

  it('should be able create a new account', async () => {
    const newAccount = await createNewAccountService.execute({
      type: 'in',
      description: 'Conta de luz',
      category: 'Despesas de casa',
      userId: new Types.ObjectId().toString(),
      value: 99,
    })

    expect(newAccount).toHaveProperty('_id')
  })
})
