import {
  Column,
  CellFunctionParams,
} from '../../../../models/interfaces/Column.js'
import style from '../Clients.module.scss'
import { Client } from '..'
import { Pen, Trash } from '@phosphor-icons/react'

interface UseColumnsParams {
  handleEditClient: (client: Client) => void
  handleDeleteClient: (client: Client) => void
}

export function useColumns({
  handleEditClient,
  handleDeleteClient,
}: UseColumnsParams): Column[] {
  const actions = [
    {
      icon: <Pen size={21} weight="bold" />,
      title: 'Editar',
      className: style.editButton,
      onClickFunction: handleEditClient,
    },
    {
      icon: <Trash size={21} weight="bold" />,
      title: 'Excluir',
      className: style.deleteButton,
      onClickFunction: handleDeleteClient,
    },
  ]

  return [
    {
      headerName: 'Nome',
      field: 'name',
      valueFormatter: (params: CellFunctionParams<Client>) =>
        params.value || '--',
    },
    {
      headerName: 'Telefone',
      field: 'phone',
      valueFormatter: (params: CellFunctionParams<Client>) =>
        params.value || '--',
    },
    {
      headerName: 'E-mail',
      field: 'email',
      valueFormatter: (params: CellFunctionParams<Client>) =>
        params.value || '--',
    },
    {
      headerName: 'CPF',
      field: 'cpf',
      valueFormatter: (params: CellFunctionParams<Client>) =>
        params.value || '--',
    },
    {
      headerName: '',
      field: 'acoes',
      type: 'actions',
      cellRenderer: (params: CellFunctionParams<Client>) => {
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
