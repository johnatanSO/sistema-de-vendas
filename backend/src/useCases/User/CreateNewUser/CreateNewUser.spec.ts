import { MockUsersRepository } from '../../../repositories/Users/MockUsersRepository'
import { CreateNewUserService } from './CreateNewUserService.service'

let mockUsersRepository: MockUsersRepository

let createNewUserService: CreateNewUserService

describe('Create new user', () => {
  beforeEach(() => {
    mockUsersRepository = new MockUsersRepository()

    createNewUserService = new CreateNewUserService(mockUsersRepository)
  })

  it('should be able create new user', async () => {

  })
})
