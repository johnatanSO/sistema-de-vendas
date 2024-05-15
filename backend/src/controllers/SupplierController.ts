import { DeleteSupplierService } from './../useCases/Supplier/DeleteSupplier/DeleteSupplieService.service'
import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { CreateNewSupplierService } from '../useCases/Supplier/CreateNewSupplier/CreateNewSupplierService.service'
import { ListSuppliersService } from '../useCases/Supplier/ListSuppliers/ListSuppliersService.service'

export class SupplierController {
  async create(req: Request, res: Response): Promise<Response> {
    const { name, phone, cnpj, email } = req.body
    const { userId } = req.user

    const createNewSupplierService = container.resolve(CreateNewSupplierService)
    const newSupplier = await createNewSupplierService.execute({
      name,
      phone,
      cnpj,
      email,
      userId,
    })

    return res.status(201).json({
      success: true,
      item: newSupplier,
      message: 'Fornecedor cadastrado com sucesso',
    })
  }

  async list(req: Request, res: Response): Promise<Response> {
    const { userId } = req.user
    const listSuppliersService = container.resolve(ListSuppliersService)
    const suppliers = await listSuppliersService.execute({ userId })

    return res.status(200).json({
      success: true,
      items: suppliers,
      message: 'Busca de fornecedores realizada com sucesso',
    })
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { supplierId } = req.params

    const deleteSupplierService = container.resolve(DeleteSupplierService)
    await deleteSupplierService.execute(supplierId)

    return res.status(200).json({
      success: true,
      message: 'Fornecedor excluído com sucesso',
    })
  }
}
