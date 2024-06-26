import { Column, CellFunctionParams } from '../../../../models/columns'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import style from '../Suppliers.module.scss'
import { Supplier } from '..'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface UseColumnsParams {
  handleEditSupplier: (supplier: Supplier) => void
  handleDeleteSupplier: (supplier: Supplier) => void
}

export function useColumns({
  handleEditSupplier,
  handleDeleteSupplier,
}: UseColumnsParams): Column[] {
  const actions = [
    {
      icon: faPen,
      title: 'Editar',
      color: '#31a2ff',
      className: style.editButton,
      onClickFunction: handleEditSupplier,
    },
    {
      icon: faTrash,
      title: 'Excluir',
      className: style.deleteButton,
      onClickFunction: handleDeleteSupplier,
    },
  ]

  return [
    {
      headerName: 'Nome',
      field: 'name',
      valueFormatter: (params: CellFunctionParams) => params.value || '--',
    },
    {
      headerName: 'Telefone',
      field: 'phone',
      valueFormatter: (params: CellFunctionParams) => params.value || '--',
    },
    {
      headerName: 'E-mail',
      field: 'email',
      valueFormatter: (params: CellFunctionParams) => params.value || '--',
    },
    {
      headerName: 'cnpj',
      field: 'cnpj',
      valueFormatter: (params: CellFunctionParams) => params.value || '--',
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
                  className={action.className}
                  key={action.title}
                  type="button"
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
