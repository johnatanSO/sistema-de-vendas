import { Column, CellFunctionParams } from '../../../../models/columns'
import style from '../Clients.module.scss'
import { Client } from '..'

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
      icon: faPen,
      title: 'Editar',
      color: '#31a2ff',
      className: style.editButton,
      onClickFunction: handleEditClient,
    },
    {
      icon: faTrash,
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
