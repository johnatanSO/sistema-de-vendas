import { Column, CellFunctionParams } from '../../../../models/columns'
import { format } from '../../../../utils/format'
import style from '../Products.module.scss'
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
      onClickFunction: handleEditProduct,
      className: style.editButton,
    },
    {
      icon: faTrash,
      title: 'Excluir',
      onClickFunction: handleDeleteProduct,
      className: style.deleteButton,
    },
  ]

  return [
    {
      headerName: 'Código',
      field: 'code',
      valueFormatter: (params: CellFunctionParams<Product>) =>
        params.value || '--',
    },
    {
      headerName: 'Nome do produto',
      field: 'name',
      valueFormatter: (params: CellFunctionParams<Product>) =>
        params.value || '--',
    },
    {
      headerName: 'Quantidade',
      field: 'stock',
      valueFormatter: (params: CellFunctionParams<Product>) =>
        params.value || 0,
    },
    {
      headerName: 'Valor',
      field: 'value',
      valueFormatter: (params: CellFunctionParams<Product>) =>
        format.formatarReal(params.value || 0),
    },
    {
      headerName: '',
      field: 'acoes',
      type: 'actions',
      cellRenderer: (params: CellFunctionParams<Product>) => {
        return (
          <div className={style.actionsContainer}>
            {actions.map((action) => {
              return (
                <button
                  key={action.title}
                  type="button"
                  className={action.className}
                  onClick={() => {
                    action?.onClickFunction?.(params.data)
                  }}
                >
                  <FontAwesomeIcon className={style.icon} icon={action.icon} />
                </button>
              )
            })}
          </div>
        )
      },
    },
  ]
}
