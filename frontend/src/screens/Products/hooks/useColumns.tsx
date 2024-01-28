import { Column, CellFunctionParams } from '../../../../src/models/columns'
import { format } from '../../../../src/utils/format'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import style from '../Products.module.scss'
import { Product } from '..'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
      type: 'actions',
      cellRenderer: (params: CellFunctionParams) => {
        return (
          <div className={style.actionsContainer}>
            {actions.map((action) => {
              return (
                <button
                  key={action.title}
                  type="button"
                  className={action.className}
                  disabled={params?.data?.status === 'canceled'}
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
