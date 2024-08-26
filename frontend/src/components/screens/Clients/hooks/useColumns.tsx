import {
  IColumn,
  CellFunctionParams,
} from '../../../../models/interfaces/IColumn'
import style from '../Clients.module.scss'
import { IClient } from '../../../../models/interfaces/IClient'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'

interface UseColumnsParams {
  handleEditClient: (client: IClient) => void
  handleDeleteClient: (client: IClient) => void
}

export function useColumns({
  handleEditClient,
  handleDeleteClient,
}: UseColumnsParams): IColumn[] {
  const actions = [
    {
      icon: <FontAwesomeIcon icon={faPen} className={style.icon} />,
      title: 'Editar',
      className: style.editButton,
      onClickFunction: handleEditClient,
    },
    {
      icon: <FontAwesomeIcon icon={faTrash} className={style.icon} />,
      title: 'Excluir',
      className: style.deleteButton,
      onClickFunction: handleDeleteClient,
    },
  ]

  return [
    {
      headerName: 'Nome',
      field: 'name',
      valueFormatter: (params: CellFunctionParams<IClient>) =>
        params.value || '--',
    },
    {
      headerName: 'Telefone',
      field: 'phone',
      valueFormatter: (params: CellFunctionParams<IClient>) =>
        params.value || '--',
    },
    {
      headerName: 'E-mail',
      field: 'email',
      valueFormatter: (params: CellFunctionParams<IClient>) =>
        params.value || '--',
    },
    {
      headerName: 'CPF',
      field: 'cpf',
      valueFormatter: (params: CellFunctionParams<IClient>) =>
        params.value || '--',
    },
    {
      headerName: '',
      field: 'acoes',
      type: 'actions',
      cellRenderer: (params: CellFunctionParams<IClient>) => {
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
