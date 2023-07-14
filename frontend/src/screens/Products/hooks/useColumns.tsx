import { Column, CellFunctionParams } from '../../../../src/models/columns'
import { format } from '../../../../src/utils/format'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { ActionButtons } from '../../../../src/components/ActionButtons'
import { Product } from '..'

interface UseColumnsParams {
  handleEditProduct: (product: Product) => void
  handleDeleteProduct: (product: Product) => void
}

export function useColumns({
  handleEditProduct,
  handleDeleteProduct,
}: UseColumnsParams): Column[] {
  const actions = [
    {
      icon: faPen,
      title: 'Editar',
      color: '#31a2ff',
      onClickFunction: handleEditProduct,
    },
    {
      icon: faTrash,
      title: 'Excluir',
      color: '#ed4252',
      onClickFunction: handleDeleteProduct,
    },
  ]

  return [
    {
      headerName: 'Código',
      field: 'code',
      valueFormatter: (params: CellFunctionParams) => params.value || '--',
    },
    {
      headerName: 'Nome do produto',
      field: 'name',
      valueFormatter: (params: CellFunctionParams) => params.value || '--',
    },
    {
      headerName: 'Quantidade',
      field: 'stock',
      valueFormatter: (params: CellFunctionParams) => params.value || 0,
    },
    {
      headerName: 'Valor',
      field: 'value',
      valueFormatter: (params: CellFunctionParams) =>
        format.formatarReal(params.value || 0),
    },
    {
      headerName: '',
      field: 'acoes',
      cellRenderer: (params: CellFunctionParams) => {
        return <ActionButtons actions={actions} params={params} />
      },
    },
  ]
}
