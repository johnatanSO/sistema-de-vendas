import { Column, CellFunctionParams } from '../../../../models/columns'
import style from '../Suppliers.module.scss'
import { Supplier } from '..'
import { Pen, Trash } from '@phosphor-icons/react'

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
      icon: <Pen size={32} />,
      title: 'Editar',
      color: '#31a2ff',
      className: style.editButton,
      onClickFunction: handleEditSupplier,
    },
    {
      icon: <Trash size={32} />,
      title: 'Excluir',
      className: style.deleteButton,
      onClickFunction: handleDeleteSupplier,
    },
  ]

  return [
    {
      headerName: 'Nome',
      field: 'name',
      valueFormatter: (params: CellFunctionParams<Supplier>) =>
        params.value || '--',
    },
    {
      headerName: 'Telefone',
      field: 'phone',
      valueFormatter: (params: CellFunctionParams<Supplier>) =>
        params.value || '--',
    },
    {
      headerName: 'E-mail',
      field: 'email',
      valueFormatter: (params: CellFunctionParams<Supplier>) =>
        params.value || '--',
    },
    {
      headerName: 'cnpj',
      field: 'cnpj',
      valueFormatter: (params: CellFunctionParams<Supplier>) =>
        params.value || '--',
    },
    {
      headerName: '',
      field: 'acoes',
      type: 'actions',
      cellRenderer: (params: CellFunctionParams<Supplier>) => {
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
