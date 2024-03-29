import { AuthenticateUserService } from './AuthenticateUserService.service'
import { MockUsersRepository } from '../../../repositories/Users/MockUsersRepository'
import { CreateNewUserService } from '../../User/CreateNewUser/CreateNewUserService.service'
import { AppError } from '../../../errors/AppError'

let mockUsersRepository: MockUsersRepository

let createNewUserService: CreateNewUserService
let authenticateUserService: AuthenticateUserService

describe('Authenticate user', () => {
  beforeEach(() => {
    mockUsersRepository = new MockUsersRepository()

    createNewUserService = new CreateNewUserService(mockUsersRepository)
    authenticateUserService = new AuthenticateUserService(mockUsersRepository)
  })

  it('should be able authenticate user', async () => {
    const newUser = await createNewUserService.execute({
      name: 'New user test',
      email: 'teste@teste.com',
      password: '123456',
    })

    const authInfos = await authenticateUserService.execute({
      email: newUser.email,
      password: '123456',
    })

    expect(authInfos).toHaveProperty('token')
  })

  it('should not be able authenticate if e-mail not sent', async () => {
    await expect(async () => {
      await createNewUserService.execute({
        name: 'New user test',
        email: 'teste@teste.com',
        password: '123456',
      })

      await authenticateUserService.execute({
        email: undefined,
        password: '123456',
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able authenticate if password not sent', async () => {
    await expect(async () => {
      const newUser = await createNewUserService.execute({
        name: 'New user test',
        email: 'teste@teste.com',
        password: '123456',
      })

      await authenticateUserService.execute({
        email: newUser.email,
        password: undefined,
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able authenticate if password incorrect', async () => {
    await expect(async () => {
      const newUser = await createNewUserService.execute({
        name: 'New user test',
        email: 'teste@teste.com',
        password: '123456',
      })

      await authenticateUserService.execute({
        email: newUser.email,
        password: 'incorrect',
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able authenticate if e-mail incorrect', async () => {
    await expect(async () => {
      await createNewUserService.execute({
        name: 'New user test',
        email: 'teste@teste.com',
        password: '123456',
      })

      await authenticateUserService.execute({
        email: 'incorrect@incorrect.com',
        password: '123456',
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
