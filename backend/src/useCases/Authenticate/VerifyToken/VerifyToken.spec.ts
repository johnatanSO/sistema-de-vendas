import { MockUsersRepository } from '../../../repositories/Users/MockUsersRepository'
import { CreateNewUserService } from '../../User/CreateNewUser/CreateNewUserService.service'
import { AuthenticateUserService } from '../AuthenticateUser/AuthenticateUserService.service'
import { AppError } from '../../../errors/AppError'
import { VerifyTokenService } from './VerifyTokenService.service'
import { sign } from 'jsonwebtoken'
import * as dotenv from 'dotenv'
dotenv.config()

let mockUsersRepository: MockUsersRepository

let createNewUserService: CreateNewUserService
let authenticateUserService: AuthenticateUserService
let verifyTokenService: VerifyTokenService

describe('Verify token', () => {
  beforeEach(() => {
    mockUsersRepository = new MockUsersRepository()

    createNewUserService = new CreateNewUserService(mockUsersRepository)
    authenticateUserService = new AuthenticateUserService(mockUsersRepository)
    verifyTokenService = new VerifyTokenService(mockUsersRepository)
  })

  it('should be able verify token', async () => {
    const newUser = await createNewUserService.execute({
      name: 'New user test',
      email: 'teste@teste.com',
      password: '123456',
      confirmPassword: '123456'
    })

    const authInfos = await authenticateUserService.execute({
      email: newUser.email,
      password: '123456',
    })

    const hasSession = await verifyTokenService.execute(authInfos.token)

    expect(hasSession).toEqual(true)
  })

  it('should not be able verify token if token not sent', async () => {
    await expect(async () => {
      await verifyTokenService.execute(undefined)
    }).rejects.toBeInstanceOf(AppError)
  })

  it('user not have session ', async () => {
    const token = sign({}, process.env.SECRET, {
      subject: 'invalid_user_id',
      expiresIn: '1d',
    })

    const hasSession = await verifyTokenService.execute(token)
    expect(hasSession).toEqual(false)
  })
})
