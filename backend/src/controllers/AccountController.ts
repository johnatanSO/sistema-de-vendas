import { Request, Response } from 'express'
import { ListAccountsService } from '../useCases/Account/ListAccounts/ListAccountsService.service'
import { container } from 'tsyringe'
import { CreateNewAccountService } from '../useCases/Account/CreateNewAccount/CreateNewAccountService.service'
import { UpdateAccountService } from '../useCases/Account/UpdateAccount/UpdateAccountService.service'
import { DeleteAccountService } from '../useCases/Account/DeleteAccount/DeleteAccountService.service'
import { UpdateStatusAccountService } from '../useCases/Account/UpdateStatusAccount/UpdateStatusAccountService.service'

export class AccountController {
  async listAccounts(req: Request, res: Response): Promise<Response> {
    const { startDate, endDate, accountType, status } = req.query as any
    const { userId } = req.user

    const listAccountsService = container.resolve(ListAccountsService)
    const accounts = await listAccountsService.execute({
      startDate,
      endDate,
      accountType,
      userId,
      status,
    })

    return res.status(200).json({
      success: true,
      items: accounts,
      message: 'Busca concluída com sucesso',
    })
  }

  async createNewAccount(req: Request, res: Response): Promise<Response> {
    const { description, type, category, value } = req.body
    const { userId } = req.user

    const createNewAccountService = container.resolve(CreateNewAccountService)
    const newAccount = await createNewAccountService.execute({
      type,
      description,
      category,
      value,
      userId,
    })

    return res.status(201).json({
      success: true,
      item: newAccount,
      message: 'Conta cadastrada com sucesso',
    })
  }

  async updateAccount(req: Request, res: Response): Promise<Response> {
    const { description, category, type, _id, value, status } = req.body

    const updateNewAccountService = container.resolve(UpdateAccountService)
    const updatedAccount = await updateNewAccountService.execute({
      description,
      category,
      type,
      idAccount: _id,
      value,
      status,
    })

    return res.status(202).json({
      success: true,
      updatedAccount,
      message: 'Conta atualizada com sucesso',
    })
  }

  async updateStatusAccount(req: Request, res: Response): Promise<Response> {
    const { idAccount } = req.params
    const { status } = req.body

    const updateStatusAccountService = container.resolve(
      UpdateStatusAccountService,
    )

    await updateStatusAccountService.execute({
      idAccount,
      status,
    })

    return res.status(202).json({
      success: true,
      message: 'Status da conta atualizado com sucesso',
    })
  }

  async deleteAccount(req: Request, res: Response): Promise<Response> {
    const { idAccount } = req.query

    const deleteAccountService = container.resolve(DeleteAccountService)
    await deleteAccountService.execute(idAccount)

    return res.status(200).json({
      success: true,
      message: 'Conta excluída com sucesso',
    })
  }
}
