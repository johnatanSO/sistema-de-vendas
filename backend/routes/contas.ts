import express, { Request, Response } from 'express'
import { CreateNewAccountService } from './../services/CreateNewAccountService.service'
import { AccountsRepository } from './../repositories/Accounts/AccountsRepository'
import { UpdateNewAccountService } from '../services/UpdateAccountService.service'
import { DeleteAccountService } from '../services/DeleteAccountService.service'

const contasRoutes = express.Router()
const accountsRepository = new AccountsRepository()

contasRoutes.get('/', async (req: Request, res: Response) => {
  try {
    const { startDate, endDate, accountType, userId } = req.query as any
    const accounts = await accountsRepository.list({
      accountType,
      userId,
      startDate,
      endDate,
    })

    res.status(200).json({
      items: accounts,
      message: 'Busca concluída com sucesso!',
    })
  } catch ({ message }) {
    res.status(500).json({ message })
  }
})

contasRoutes.post('/', async (req: Request, res: Response) => {
  const { description, type, category, value, userInfo } = req.body
  try {
    const createNewAccountService = new CreateNewAccountService(
      accountsRepository,
    )

    const newAccount = await createNewAccountService.execute({
      description,
      type,
      category,
      value,
      userId: userInfo?._id,
    })

    res.status(201).json({
      item: newAccount,
      message: 'Conta cadastrada com sucesso!',
    })
  } catch ({ message }) {
    res.status(400).json({
      message,
    })
  }
})

contasRoutes.put('/', async (req: Request, res: Response) => {
  const { description, category, type, _id, value, userId } = req.body

  try {
    const updateNewAccountService = new UpdateNewAccountService(
      accountsRepository,
    )

    const updatedAccount = await updateNewAccountService.execute({
      description,
      category,
      type,
      _id,
      value,
      userId,
    })

    res.status(202).json({
      updatedAccount,
      message: 'Conta atualizada com sucesso',
    })
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
})

contasRoutes.delete('/', async (req: Request, res: Response) => {
  const { idAccount } = req.query

  try {
    const deleteAccountService = new DeleteAccountService(accountsRepository)
    await deleteAccountService.execute(idAccount)

    res.status(202).json({ message: 'Conta excluída com sucesso' })
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
})

export { contasRoutes }
