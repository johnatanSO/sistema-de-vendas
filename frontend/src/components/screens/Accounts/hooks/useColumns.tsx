import { Column, CellFunctionParams } from '../../../../models/columns'
import { format } from '../../../../utils/format'
import style from '../Accounts.module.scss'
import { Account } from '..'
import dayjs from 'dayjs'
import { ChangeStatusAccount } from '../ChangeStatusAccount'
import { Pen, Trash } from '@phosphor-icons/react'

interface UseColumnsParams {
  handleEditAccount: (account: Account) => void
  handleDeleteAccount: (account: Account) => void
}

export function useColumns({
  handleEditAccount,
  handleDeleteAccount,
}: UseColumnsParams): Column[] {
  const actions = [
    {
      icon: <Pen size={32} />,
      title: 'Editar',
      color: '#31a2ff',
      className: style.editButton,
      onClickFunction: handleEditAccount,
    },
    {
      icon: <Trash size={32} />,
      title: 'Excluir',
      className: style.deleteButton,
      onClickFunction: handleDeleteAccount,
    },
  ]

  return [
    {
      headerName: 'Tipo',
      field: 'type',
      valueFormatter: (params: CellFunctionParams) =>
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
      valueFormatter: (params: CellFunctionParams) => params.value || '--',
    },
    {
      headerName: 'Categoria',
      field: 'category',
      valueFormatter: (params: CellFunctionParams) => params.value || '--',
    },
    {
      headerName: 'Status',
      field: 'status',
      cellRenderer: (params: CellFunctionParams) => {
        return <ChangeStatusAccount params={params} />
      },
    },
    {
      headerName: 'Data',
      field: 'date',
      valueFormatter: (params: CellFunctionParams) =>
        dayjs(params.value).format('DD/MM/YYYY - HH:mm'),
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
