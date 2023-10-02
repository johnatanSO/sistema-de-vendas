import { MockAccountsRepository } from './../../../repositories/Accounts/MockAccountsRepository'
import { Types } from 'mongoose'
import { UpdateStatusAccountService } from './UpdateStatusAccountService.service'
import { CreateNewAccountService } from '../CreateNewAccount/CreateNewAccountService.service'
import { AppError } from '../../../errors/AppError'

let mockAccountsRepository: MockAccountsRepository

let updateStatusAccountService: UpdateStatusAccountService
let createNewAccountService: CreateNewAccountService

describe('Update status account', () => {
  beforeEach(() => {
    mockAccountsRepository = new MockAccountsRepository()

    updateStatusAccountService = new UpdateStatusAccountService(
      mockAccountsRepository,
    )
    createNewAccountService = new CreateNewAccountService(
      mockAccountsRepository,
    )
  })

  it('should be able update status account', async () => {
    const newAccount = await createNewAccountService.execute({
      type: 'in',
      userId: new Types.ObjectId().toString(),
      category: 'Despesas do estabelecimento',
      value: 99,
      description: 'Conta de luz',
    })

    await updateStatusAccountService.execute({
      idAccount: newAccount._id.toString(),
      status: 'pending',
    })

    const updatedAccount = await mockAccountsRepository.findById(
      newAccount._id.toString(),
    )

    expect(updatedAccount.status).toEqual('pending')
  })

  it('should not be able update status account if idAccount not sent', async () => {
    await expect(async () => {
      await createNewAccountService.execute({
        type: 'in',
        userId: new Types.ObjectId().toString(),
        category: 'Despesas do estabelecimento',
        value: 99,
        description: 'Conta de luz',
      })

      await updateStatusAccountService.execute({
        idAccount: undefined,
        status: 'pending',
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able update status account if "status" not sent', async () => {
    await expect(async () => {
      const newAccount = await createNewAccountService.execute({
        type: 'in',
        userId: new Types.ObjectId().toString(),
        category: 'Despesas do estabelecimento',
        value: 99,
        description: 'Conta de luz',
      })

      await updateStatusAccountService.execute({
        idAccount: newAccount._id.toString(),
        status: undefined,
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
