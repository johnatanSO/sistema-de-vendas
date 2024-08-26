import {
  IColumn,
  CellFunctionParams,
} from '../../../../models/interfaces/IColumn'
import style from '../Suppliers.module.scss'
import { ISupplier } from '../../../../models/interfaces/ISupplier'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface UseColumnsParams {
  handleEditSupplier: (supplier: ISupplier) => void
  handleDeleteSupplier: (supplier: ISupplier) => void
}

export function useColumns({
  handleEditSupplier,
  handleDeleteSupplier,
}: UseColumnsParams): IColumn[] {
  const actions = [
    {
      icon: <FontAwesomeIcon className={style.icon} icon={faPen} />,
      title: 'Editar',
      className: style.editButton,
      onClickFunction: handleEditSupplier,
    },
    {
      icon: <FontAwesomeIcon className={style.icon} icon={faTrash} />,
      title: 'Excluir',
      className: style.deleteButton,
      onClickFunction: handleDeleteSupplier,
    },
  ]

  return [
    {
      headerName: 'Nome',
      field: 'name',
      valueFormatter: (params: CellFunctionParams<ISupplier>) =>
        params.value || '--',
    },
    {
      headerName: 'Telefone',
      field: 'phone',
      valueFormatter: (params: CellFunctionParams<ISupplier>) =>
        params.value || '--',
    },
    {
      headerName: 'E-mail',
      field: 'email',
      valueFormatter: (params: CellFunctionParams<ISupplier>) =>
        params.value || '--',
    },
    {
      headerName: 'cnpj',
      field: 'cnpj',
      valueFormatter: (params: CellFunctionParams<ISupplier>) =>
        params.value || '--',
    },
    {
      headerName: '',
      field: 'acoes',
      type: 'actions',
      cellRenderer: (params: CellFunctionParams<ISupplier>) => {
        return (
          <div className={style.actionsContainer}>
            {actions.map((action) => {
              return (
                <button
                  className={action.className}
                  key={action.title}
                  type="button"
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
