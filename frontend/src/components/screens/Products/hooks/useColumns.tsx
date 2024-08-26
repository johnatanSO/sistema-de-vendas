import {
  IColumn,
  CellFunctionParams,
} from '../../../../models/interfaces/IColumn'
import { format } from '../../../../utils/format'
import style from '../Products.module.scss'
import { IProduct } from '../../../../models/interfaces/IProduct'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface UseColumnsParams {
  handleEditProduct: (product: IProduct) => void
  handleDeleteProduct: (product: IProduct) => void
}

export function useColumns({
  handleEditProduct,
  handleDeleteProduct,
}: UseColumnsParams): IColumn[] {
  const actions = [
    {
      icon: <FontAwesomeIcon className={style.icon} icon={faPen} />,
      title: 'Editar',
      onClickFunction: handleEditProduct,
      className: style.editButton,
    },
    {
      icon: <FontAwesomeIcon className={style.icon} icon={faTrash} />,
      title: 'Excluir',
      onClickFunction: handleDeleteProduct,
      className: style.deleteButton,
    },
  ]

  return [
    {
      headerName: 'Código',
      field: 'code',
      valueFormatter: (params: CellFunctionParams<IProduct>) =>
        params.value || '--',
    },
    {
      headerName: 'Nome do produto',
      field: 'name',
      valueFormatter: (params: CellFunctionParams<IProduct>) =>
        params.value || '--',
    },
    {
      headerName: 'Quantidade',
      field: 'stock',
      valueFormatter: (params: CellFunctionParams<IProduct>) =>
        params.value || 0,
    },
    {
      headerName: 'Valor',
      field: 'value',
      valueFormatter: (params: CellFunctionParams<IProduct>) =>
        format.formatarReal(params.value || 0),
    },
    {
      headerName: '',
      field: 'acoes',
      type: 'actions',
      cellRenderer: (params: CellFunctionParams<IProduct>) => {
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
                  {action.icon && action.icon}
                </button>
              )
            })}
          </div>
        )
      },
    },
  ]
}
