import {
  IColumn,
  CellFunctionParams,
} from '../../../../models/interfaces/IColumn'
import { format } from '../../../../utils/format'
import style from '../Accounts.module.scss'
import dayjs from 'dayjs'
import { ChangeStatusAccount } from '../ChangeStatusAccount'
import { IAccount } from '../../../../models/interfaces/IAccount'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { ACCOUNT_TYPE } from '../../../../models/enums/AccountType'

interface UseColumnsParams {
  handleEditAccount: (account: IAccount) => void
  handleDeleteAccount: (account: IAccount) => void
}

export function useColumns({
  handleEditAccount,
  handleDeleteAccount,
}: UseColumnsParams): IColumn[] {
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
      valueFormatter: (params: CellFunctionParams<IAccount>) =>
        params.value === ACCOUNT_TYPE.IN ? 'Entrada' : 'Saída' || '--',
      cellClass: (params) => {
        if (params?.data?.type === ACCOUNT_TYPE.IN) return style.positiveText

        return style.negativeText
      },
    },
    {
      headerName: 'Descrição',
      field: 'description',
      valueFormatter: (params: CellFunctionParams<IAccount>) =>
        params.value || '--',
    },
    {
      headerName: 'Categoria',
      field: 'category',
      valueFormatter: (params: CellFunctionParams<IAccount>) =>
        params.value || '--',
    },
    {
      headerName: 'Status',
      field: 'status',
      cellRenderer: (params: CellFunctionParams<IAccount>) => {
        return <ChangeStatusAccount params={params} />
      },
    },
    {
      headerName: 'Data',
      field: 'date',
      valueFormatter: (params: CellFunctionParams<IAccount>) =>
        dayjs(params.value).format('DD/MM/YYYY - HH:mm'),
    },
    {
      headerName: 'Valor',
      field: 'value',
      valueFormatter: (params: CellFunctionParams<IAccount>) =>
        format.formatarReal(params.value || 0),
    },
    {
      headerName: '',
      field: 'acoes',
      type: 'actions',
      cellRenderer: (params: CellFunctionParams<IAccount>) => {
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
