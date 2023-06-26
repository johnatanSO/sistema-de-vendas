import { ISalesRepository } from "../repositories/Sales/ISalesRepository";

export class CancelSaleService {
  constructor(private salesRepository: ISalesRepository){}

  execute(idSale:string){
    this.salesRepository.cancel(idSale)
  }
}