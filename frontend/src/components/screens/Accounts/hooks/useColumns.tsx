import {
  Column,
  CellFunctionParams,
} from '../../../../models/interfaces/Column.js'
import { format } from '../../../../utils/format'
import style from '../Accounts.module.scss'
import dayjs from 'dayjs'
import { ChangeStatusAccount } from '../ChangeStatusAccount'
import { INewAccount } from '../interfaces/INewAccount.js'
import { Account } from '../interfaces/IAccount.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'

interface UseColumnsParams {
  handleEditAccount: (account: INewAccount) => void
  handleDeleteAccount: (account: Account) => void
}

export function useColumns({
  handleEditAccount,
  handleDeleteAccount,
}: UseColumnsParams): Column[] {
  const actions = [
    {
      icon: <FontAwesomeIcon icon={faPen} className={style.icon} />,
      title: 'Editar',
      className: style.editButton,
      onClickFunction: handleEditAccount,
    },
    {
      icon: <FontAwesomeIcon icon={faTrash} className={style.icon} />,
      title: 'Excluir',
      className: style.deleteButton,
      onClickFunction: handleDeleteAccount,
    },
  ]

  return [
    {
      headerName: 'Tipo',
      field: 'type',
      valueFormatter: (params: CellFunctionParams<Account>) =>
        params.value === 'in' ? 'Entrada' : 'Saída' || '--',
      cellClass: (params) => {
        if (params?.data?.type === 'in') {
          return style.positiveText
        }
        return style.negativeText
      },
    },
    {
      headerName: 'Descrição',
      field: 'description',
      valueFormatter: (params: CellFunctionParams<Account>) =>
        params.value || '--',
    },
    {
      headerName: 'Categoria',
      field: 'category',
      valueFormatter: (params: CellFunctionParams<Account>) =>
        params.value || '--',
    },
    {
      headerName: 'Status',
      field: 'status',
      cellRenderer: (params: CellFunctionParams<Account>) => {
        return <ChangeStatusAccount params={params} />
      },
    },
    {
      headerName: 'Data',
      field: 'date',
      valueFormatter: (params: CellFunctionParams<Account>) =>
        dayjs(params.value).format('DD/MM/YYYY - HH:mm'),
    },
    {
      headerName: 'Valor',
      field: 'value',
      valueFormatter: (params: CellFunctionParams<Account>) =>
        format.formatarReal(params.value || 0),
    },
    {
      headerName: '',
      field: 'acoes',
      type: 'actions',
      cellRenderer: (params: CellFunctionParams<Account>) => {
        return (
          <div className={style.actionsContainer}>
            {actions.map(({ icon, ...action }) => {
              return (
                <button
                  className={action.className}
                  key={action.title}
                  type="button"
                  disabled={params?.data?.status === 'canceled'}
                  onClick={() => {
                    action?.onClickFunction?.(params.data)
                  }}
                >
                  {icon && icon}
                </button>
              )
            })}
          </div>
        )
      },
    },
  ]
}
