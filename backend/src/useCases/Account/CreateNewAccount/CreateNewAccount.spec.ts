import 'reflect-metadata'
import { Types } from 'mongoose'
import { MockAccountsRepository } from '../../../repositories/Accounts/MockAccountsRepository'
import { CreateNewAccountService } from './CreateNewAccountService.service'
import { AppError } from '../../../errors/AppError'

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
      category: 'Despesas do estabelecimento',
      userId: new Types.ObjectId().toString(),
      value: 99,
    })

    expect(newAccount).toHaveProperty('_id')
  })

  it('should not be able create a new account if type not sent', async () => {
    await expect(async () => {
      await createNewAccountService.execute({
        type: undefined,
        description: 'Conta de luz',
        category: 'Despesas do estabelecimento',
        userId: new Types.ObjectId().toString(),
        value: 99,
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able create a new account if description not sent', async () => {
    await expect(async () => {
      await createNewAccountService.execute({
        type: 'in',
        description: undefined,
        category: 'Despesas de estabelecimento',
        userId: new Types.ObjectId().toString(),
        value: 99,
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able create a new account if userId not sent', async () => {
    await expect(async () => {
      await createNewAccountService.execute({
        type: 'in',
        description: 'Conta de luz',
        category: 'Despesas do estabelecimento',
        userId: undefined,
        value: 99,
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
