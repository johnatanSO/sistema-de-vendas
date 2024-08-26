export interface GetAllProductsDTO {
  filters: any
}

export interface CreateProductDTO {
  name: string
  value: number
  stock: number
  isDefault: boolean
}

export interface UpdateProductDTO {
  _id: string
  name: string
  value: number
  stock: number
  isDefault: boolean
}

export interface DeleteProductDTO {
  idProduct: string
}
